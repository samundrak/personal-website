---
title: Building the Party Index with Ideologies, Manifestos, and Trendlines
slug: party-index-ideology-trends
date: 2024-07-04
tags: [parties, politics, trends, ideology, manifesto, frontend]
draft: false
truncate: true
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

Political parties form the backbone of democratic engagement. I designed the **Party Index Page** to give users a clear view of every major party—its history, manifesto, ideology, and performance.

This article outlines how I structured, visualized, and enriched the party page using multilingual data and analytical trends.
<!-- truncate    -->

---

## Core Features

Each party profile includes:

* Party name + localized title
* Party symbol and logo
* Date of formation and status (active/merged/defunct)
* Manifesto links (archived or external)
* Ideology tags (e.g. Socialist, Monarchist, Regionalist)

---

## Trend Visualizations

Using the same normalization engine as the elections index, I show:

* Vote percentage over elections
* Seat wins per cycle
* Change indicators (rise/fall arrows)
* Ranking among all parties per year

Each chart dot uses the party’s symbol/logo.

---

## Ideology Tags

Ideologies are stored as `TAGS` with type `PARTY_TYPE`, attached via polymorphic relation:

```ts
{
  resourceType: 'PARTY',
  resourceId: 12,
  tag: 'Leftist'
}
```

This makes filtering and categorization easy.

---

## Manifesto Support

Parties can upload or link manifestos (PDFs or pages). I built components to:

* Open inline modal preview
* Offer direct download links
* Display multilingual metadata

---

## Filtering and Listing

On the main index:

* Sort by popularity, creation date, or recent performance
* Filter by ideology or region
* Search by name (with fulltext support)

---

## Summary

The Party Index makes it easy to discover and compare political parties in Nepal. With rich metadata, multilingual support, and consistent visual analytics, it invites deeper civic engagement and research.

Next, I’ll walk through how I designed the Leader Index with election records, performance charts, party switch history, and biography cards.
