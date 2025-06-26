---
title: Building a Tag-Driven Metadata System for Political Domain Classification
slug: tag-driven-metadata-system
date: 2024-06-26
tags: [metadata, tags, classification, schema-design, taxonomy]
draft: false
truncate: true
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

As my civic-tech platform evolved, the complexity of classification increased: I needed to track ministry types, cabinet roles, party types (left, regional, royalist), election kinds, and more. Rather than hardcoding categories, I built a **tag-driven metadata system**.

This post explains the design and use cases for tag-based classification across multiple resources.

---
<!-- truncate    -->

## Use Cases for Tags

Tags allowed flexible classification of:

* Ministries (e.g., “Infrastructure”, “Defense”, “Education”)
* Parties (e.g., “Leftist”, “Royalist”, “Regional”, “New”)
* Governments (e.g., “Caretaker”, “Interim”)
* Scandals (e.g., “Corruption”, “Misuse of Funds”)
* Leaders (e.g., “Military Background”, “Convicted”)

---

## Schema Design

Tags are defined in a central table:

```prisma
model Tag {
  id    Int    @id @default(autoincrement())
  name String
  nameLocal String?
  type String // e.g. 'MINISTRY_TYPE', 'PARTY_TYPE', 'LEADER_FLAG'
}

model TagLink {
  id           Int     @id @default(autoincrement())
  tagId        Int
  resourceType String  // 'PARTY', 'LEADER', 'GOVERNMENT', etc.
  resourceId   Int
}
```

This design supports many-to-many relations across arbitrary resource types.

---

## Frontend Usage

Tags are used in listings and detail pages. Example use:

```tsx
{tags.map(tag => (
  <Badge key={tag.id}>{i18n.language === 'np' ? tag.nameLocal : tag.name}</Badge>
))}
```

They’re filterable in search and used to group similar entries across the app.

---

## Dynamic Filtering

Tags also drive dynamic filters in dashboards. For example:

```ts
filters: [
  { label: 'Leftist Parties', value: 'LEFTIST' },
  { label: 'Royalist', value: 'ROYALIST' }
]
```

---

## Tag Suggestions + Admin Tools

Admins can:

* Suggest tags while editing a resource
* View and manage global tag lists
* Localize tag names from admin panel

---

## Benefits

This system allowed:

* Dynamic taxonomy management
* Reusable logic across many models
* Easy localization
* Classification at scale

---

## Summary

Tags replaced hardcoded booleans and enums with flexible metadata. They power filtering, grouping, labeling, and classification across the civic data ecosystem.

In the next article, I’ll break down how I used full-text search for discovering parties, leaders, elections, and more in both English and Nepali.
