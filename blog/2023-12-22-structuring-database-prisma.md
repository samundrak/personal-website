---

title: How I Structured My Database for Real-World Relationships
slug: structuring-database-prisma
date: 2023-12-08
tags: \[database, prisma, schema-design, modeling, backend]
draft: false
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

Designing a database schema that reflects real-world complexity is one of the most important architectural decisions in any data platform. In this post, I share how I modeled complex relationships using Prisma ORM with a focus on extensibility, multilingual support, and practical backend integration.

The system supports elections, leaders, parties, governments, scandals, polls, and more—each with overlapping relationships, dynamic behavior, and historical timelines.

---
<!-- truncate    -->
## Why Structure Matters

I knew from the beginning that data would be the heart of this platform—not just data storage, but how **relationships between data** were modeled:

* Leaders could belong to multiple parties over time
* Governments were time-boxed and connected to cabinets
* Polls and content had to be attachable to *any* resource (leaders, parties, elections)
* Every name, title, and description needed multilingual support

This called for a relational model that wasn’t just normalized, but also semantic.

---

## Key Patterns and Structures

### 1. **Dual-Language Field Design**

To support both English and Nepali without separate localization tables, I use localized field pairs:

```prisma
model Party {
  id         Int    @id @default(autoincrement())
  name       String
  nameLocal  String?
  description       String?
  descriptionLocal  String?
  ...
}
```

This makes it easy to render either language on the frontend and avoids nested joins.

---

### 2. **Polymorphic Resource Linking**

Content (polls, articles, ratings) can be attached to multiple types:

```prisma
model Content {
  id           Int
  resourceType String   // e.g. LEADER, PARTY, ELECTION
  resourceId   Int
  title        String
  titleLocal   String?
}
```

This makes the system flexible enough to attach narratives and interactions to any part of the data model.

---

### 3. **Historical Timelines via Junction Tables**

Leaders can switch parties. Cabinets change. We needed temporal tracking:

```prisma
model PartyLeader {
  id        Int    @id @default(autoincrement())
  leaderId Int
  partyId  Int
  position String
  startDate DateTime
  endDate   DateTime?
}
```

This allows querying a leader’s affiliation at any point in time and simplifies timeline visualizations.

---

### 4. **Nested Relationships with Soft Deletion**

We needed to support nested relationships with optional deletes. Every model uses:

```prisma
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
```

This gives full control over data visibility while preserving auditability.

---

## Real-World Scenarios Enabled

* Attach a poll to any leader, party, or election
* Get all parties a leader was part of during a date range
* Show which leaders served in a given cabinet
* Display a party’s rise and fall using linked election outcomes
* Fetch content in the correct language without additional joins

---

## Takeaways

* A good data model lets your UI and logic evolve without refactoring the foundation.
* Don’t over-normalize when you're dealing with public data—favor readability and query simplicity.
* Polymorphic fields and localized pairs go a long way in keeping the schema both flexible and performant.

Next up, I’ll cover how I integrated this schema into a monorepo using shared types and modular services across the API and frontend.
