---
title: Structuring Government Timeline and Prime Ministerial History
slug: government-timeline-pm-history
date: 2024-06-30
tags: [government, prime-minister, timeline, coalition, political-history]
draft: false
truncate: true
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

Nepal’s modern political history has seen rapid changes in governments, coalitions, and Prime Ministers. I created a structured timeline that chronicles each government—with clarity on its head, party breakdown, duration, and legacy.

This article outlines the structure and visualization of the government timeline system.
<!-- truncate    -->

---

## Government Model

Each government entry includes:

```ts
{
  id: 54,
  name: 'KP Oli Second Cabinet',
  headId: 1429, // PM leader
  startedAt: '2018-02-15',
  endAt: '2021-07-12',
  parliamentId: 4,
  government_type: 'MAJORITY'
}
```

This links to a `head` (PM), a `parliament`, and optionally a `municipality` or `state`.

---

## Cabinet Breakdown

Using `cabinet_members` and `partyId`, I calculated:

* Number of ministers per party
* Dominant party
* Coalitions (2+ parties)

This supports rendering coalition pies, alliance tags, and seat bars.

---

## Timeline View

Governments are plotted chronologically with consistent formatting:

* PM photo and party
* Duration (days, term length)
* Parliament association
* Transition link (next/previous)

---

## Coalition Detection

Coalition logic:

```ts
const distinctParties = new Set(cabinetMembers.map(c => c.partyId));
const isCoalition = distinctParties.size > 1;
```

Displayed as:

> Coalition: UML + Maoist Centre + Others

---

## Prime Minister Listing

From the government data, I extracted:

* PMs by frequency (e.g., Deuba 5 times)
* Term durations
* Firsts (e.g., first female PM if any)
* Head overlap with parliaments

---

## Summary

The government timeline view allows users to:

* Trace power shifts over decades
* Understand coalition dynamics
* Study PM performance and tenures

In the next post, I’ll detail how I modeled cabinet members and ministry roles with dynamic party/leader associations.
