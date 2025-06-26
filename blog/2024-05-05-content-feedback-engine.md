---

title: Structuring a Resource-Aware Content & Feedback Engine
slug: content-feedback-engine
date: 2024-05-05
tags: \[content, feedback, rating-system, polymorphism, nestjs, prisma]
draft: false
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

Once data is live, platforms become conversations. In this post, I’ll explain how I created a **resource-aware content and feedback engine** where users can:

* Read and write multilingual content
* Rate political entities (parties, leaders, governments)
* Comment on historical events and scandals
* Attach feedback directly to any model in the system

The system is powered by polymorphic content linking, a unified comment engine, and approval metrics.

---

## Design Goals
<!-- truncate    -->
* ✅ Support **comments**, **ratings**, **reactions**, and **editorial content**
* ✅ Link all feedback and content to **any resource** (party, leader, election, etc.)
* ✅ Make everything **bilingual**
* ✅ Avoid duplicating logic across models

This meant creating a generalized system that could scale both horizontally (new content types) and vertically (across domain models).

---

## Core Schema (Prisma)

Here’s the core structure I used:

```prisma
model Content {
  id           Int      @id @default(autoincrement())
  resourceType String   // e.g., 'LEADER', 'PARTY', 'ELECTION'
  resourceId   Int
  contentType  String   // COMMENT, SCANDAL, RATING, EDITORIAL
  contentStatus String  // APPROVED, FLAGGED, DELETED
  title        String?
  titleLocal   String?
  content      String
  contentLocal String?
  eventDate    DateTime?
  parentContentId Int?
  createdAt    DateTime @default(now())
}
```

This lets a single table support:

* Comments and replies (via `parentContentId`)
* Ratings and feedback
* Multi-level editorial content

---

## Ratings & Approval Metrics

Ratings are a special type of content with structure:

```ts
{
  resourceType: 'PARTY',
  resourceId: 25,
  contentType: 'RATING',
  content: '4',
  contentLocal: '४',
}
```

Aggregations are done on the backend to compute:

* Average rating per resource
* Most-rated items by category
* Rating trends over time (coming soon)

---

## User Experience

On the frontend, I use a shared component:

```tsx
<ResourceFeedback resourceType="LEADER" resourceId={id} />
```

This internally loads and renders:

* Ratings bar
* Add comment box
* Comment thread with moderation tools

---

## Content Moderation

Admins can flag content with statuses (`APPROVED`, `FLAGGED`, `DELETED`) and hide inappropriate or spam entries. These statuses also allow:

* Public visibility filtering
* Analytics around abuse patterns

Future: Add moderation dashboards and approval workflows.

---

## Bilingual Content Support

Every content entry supports both English and Nepali. UI falls back gracefully, and users can toggle languages in their preferences or URL path.

---

## Conclusion

Creating a polymorphic content engine let me scale feedback and editorial contributions across every part of the civic dataset.

The same structure powers:

* Scandal logs
* User comments
* Leader approval tracking
* Party ratings
* Threaded debates

Next up: I’ll dive into how I modeled political scandal timelines and encoded hierarchy, sources, and localization into structured records.
