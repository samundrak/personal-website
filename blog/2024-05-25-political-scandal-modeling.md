---
title: Modeling Political Scandals with Source Metadata and Timeline Hierarchy
slug: political-scandal-modeling
date: 2024-05-25
tags: [politics, schema, metadata, timeline, content-modeling]
draft: false
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

Scandals are not just stories—they’re structured data. I wanted to capture every major political controversy in Nepal since 2040 B.S. as structured content that can be sorted, filtered, visualized, and linked.

This post covers how I modeled scandals with:

* Timeline consistency
* Hierarchical parent-child links
* Multilingual titles and content
* Source citations and metadata
* Relation to multiple political entities (leaders, parties, governments)

---

## Schema Design
<!-- truncate    -->

I reused the polymorphic `Content` model but added specific support for:

* `contentType = 'SCANDAL'`
* `eventDate` for historical ordering
* `parentContentId` to group sub-events

Each scandal entry includes bilingual fields, like:

```ts
{
  contentType: 'SCANDAL',
  resourceType: 'LEADER',
  resourceId: 1429,
  title: 'KP Oli Accused of Policy Corruption in Giri Bandhu Tea Estate',
  titleLocal: 'केपी ओलीमाथि गिरि बन्धु चिया बगानको नीतिगत भ्रष्टाचारको आरोप',
  content: 'Allegations surfaced...',
  contentLocal: 'आरोप सार्वजनिक भए...',
  eventDate: '2016-02-10',
  sourceUrl: 'https://example.com/news/oli-scandal',
}
```

---

## Parent-Child Linking

Some scandals span years or involve multiple actors. I introduced `parentContentId` to group related entries:

* Parent: "Fake Bhutanese Refugee Scandal"
* Children: Entries per accused leader, stages, investigation updates

This lets me:

* Show a full timeline under one scandal
* Aggregate involved leaders and actions
* Track escalation patterns

---

## Multilingual Content Support

As with other modules, every scandal entry includes both English and Nepali fields. This ensures accessibility and reach, especially for politically engaged users inside Nepal.

Example rendering fallback:

```tsx
{language === 'np' ? titleLocal || title : title}
```

---

## Source Tracking

Each entry stores a `sourceUrl` and optionally `sourceTitle`. Users can trace claims to primary reports, news articles, or legal documents.

I plan to add source verification and approval levels in the future.

---

## Visualizing Scandals

Timeline components allow users to:

* Browse scandals by year or leader
* Filter by severity or party
* Navigate multi-layered events

I also plan to add heatmaps, bar charts, and scandal density indicators.

---

## Summary

Political scandals are rich data. With the right structure, they become:

* Insightful history
* Searchable patterns
* Publicly accountable narratives

In the next post, I’ll cover how I visualized elections over decades with normalized party data, interactive charts, and historical trends.
