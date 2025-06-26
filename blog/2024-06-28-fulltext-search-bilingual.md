---
title: Implementing Full-Text Search for Bilingual Political Data
slug: fulltext-search-bilingual
date: 2024-06-28
tags: [search, fulltext, multilingual, postgres, prisma, civic-tech]
draft: false
truncate: true
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

Search is a critical part of political platforms—especially when users are trying to find leaders, elections, or scandals across decades of data. I implemented a full-text search engine that:

* Supports both English and Nepali
* Works across multiple models
* Handles fuzzy and partial input

This article details how I designed and deployed this system using PostgreSQL, Prisma, and language-aware search logic.
<!-- truncate    -->

---

## Models Supported

Search spans multiple resource types:

* Leaders
* Parties
* Elections
* Governments
* Content (scandals, comments, ratings)

Each model has fields like `name`, `localName`, `title`, `titleLocal`, and `description` indexed.

---

## PostgreSQL Full-Text Indexing

I used `to_tsvector` and `tsquery` over both English and Nepali fields.

Example SQL:

```sql
CREATE INDEX idx_leader_search ON leaders USING GIN (
  to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(localName, ''))
);
```

Prisma doesn’t natively support fulltext search across multiple fields, so I used raw queries:

```ts
await prisma.$queryRaw`SELECT * FROM leaders WHERE to_tsvector('simple', name || ' ' || localName) @@ plainto_tsquery(${term})`
```

---

## Language Detection

On the frontend, I check user input and dynamically route the query to the correct tsvector config:

```ts
const lang = /[\u0900-\u097F]/.test(query) ? 'nepali' : 'english';
```

---

## Synonyms + Transliterations

I created a synonym map and fuzzy transliteration helper to allow Hindi → Nepali → Romanized matching. For example, "Prachanda" maps to "Pushpa Kamal Dahal".

Future work includes weighted ranking and stemming improvements.

---

## Search API

All results are returned with type, ID, and snippet. The frontend displays contextual matches:

```json
{
  type: 'LEADER',
  id: 1023,
  name: 'Sher Bahadur Deuba',
  localName: 'शेर बहादुर देउवा',
  snippet: 'Nepali Congress | 5-time PM | Dadeldhura'
}
```

---

## Summary

Bilingual full-text search makes the platform usable across linguistic lines and political generations. With PostgreSQL GIN indexing, custom query handling, and fuzzy logic, users can now explore the archive effortlessly.

Next, I’ll cover how I structured the government timeline and prime ministerial records, including coalition breakdowns and ruling parties.
