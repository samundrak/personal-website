---

title: Designing the Leader Index: Election History, Party Switching & Biographical Insights
slug: leader-index-biography-tracker
date: 2024-07-06
tags: \[leaders, biography, elections, party-switching, civic-platform]
draft: false
truncate: true
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

Political leaders carry the identity of electoral shifts. I designed the **Leader Index Page** to give a comprehensive view of every major leader’s journey—through elections, parties, positions, and scandals.

This article explains how I structured leader data, visualized career movements, and surfaced meaningful insights.

---

## Leader Profile Fields

Each leader includes:

* Name + Local name
* Birthdate, gender, bio, education
* Party affiliation history
* Election records (vote counts, wins/losses)
* Cabinet roles and government positions
* Associated scandals and ratings

---

## Election History Tracking

Each leader has a timeline of contests:

```ts
{
  year: 2074,
  district: 'Kathmandu-4',
  party: 'NC',
  votes: 36500,
  rank: 1
}
```

Visualized using a line + bar chart hybrid with annotations for debut, loss, comeback, etc.

---

## Party Switch Insight

Switches are detected by comparing `partyId` across elections and government roles. I annotate leader cards with indicators like:

* Switched from UML to RSP in 2079
* Left party after scandal

---

## Biography Display

Bios are shown with support for multiple languages, tags (e.g. “Lawyer”, “Journalist”), and dynamic quote sections. Photos are embedded if available.

---

## Related Modules

Each leader’s page links to:

* Elections contested
* Governments served
* Ratings and polls
* Scandal timelines (if any)

This creates a centralized profile that’s context-aware.

---

## Summary

The Leader Index is not just a list—it’s a political memory map. With structured biographical fields, electoral history, and dynamic insights, it forms a powerful resource for researchers, voters, and students.

Next: I’ll cover how I handled constituency-level election results and map overlays to show spatial trends.
