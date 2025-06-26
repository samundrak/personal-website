---

title: Architecting a Fullstack Platform: My Initial Design Principles
slug: architecting-a-fullstack-platform
date: 2023-11-15
tags: \[architecture, fullstack, nestjs, nextjs, prisma]
draft: false
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

This post outlines the architectural foundation I laid for building a real-world fullstack platform from scratch. The goal was to support a growing, data-rich application while keeping development modular, testable, and extensible.

I chose a stack centered around NestJS and Next.js with Prisma ORM and MySQL, aiming for type safety across the stack and a clean separation between backend services and the frontend UI.

---

## Why I Built This

The platform was designed to serve as a public data explorer for civic and political datasets. It needed to:

* Display complex relationships (leaders, parties, elections, content)
* Scale across time (historical data, future updates)
* Be multilingual (English and Nepali)
* Allow feature layering (polls, ratings, approval metrics)
* Expose secure APIs for multiple clients

Rather than using off-the-shelf CMS tools, I opted to build a bespoke platform tailored to domain logic and long-term extensibility.

---

## Key Concepts and Challenges

### 1. **Modular Backend Design (NestJS)**

NestJS made it easy to separate services by domain: `elections`, `leaders`, `parties`, `polls`, `contents`, and so on. I used feature modules, each with its own DTOs, services, and controller layer. This enabled:

* Independent testing and caching
* Cleaner route control
* Ability to extend domains (e.g. attach content to any resource)

### 2. **Type-Safe Data Layer (Prisma + MySQL)**

The Prisma schema models were written to reflect real-world civic and political relationships:

* Polymorphic fields via `resourceType` + `resourceId`
* Soft deletes and timestamps
* Dual-language fields: `name`, `nameLocal`, `titleLocal`, etc.

### 3. **Frontend and API Contracts**

The UI is powered by Next.js with Mantine + TailwindCSS. I ensured strong alignment between frontend and backend through shared types and predictable endpoints, like:

* `/api/v1/parties/:id`
* `/api/v1/elections/:id`
* `/api/v1/polls/:id`

### 4. **Multi-Channel Architecture**

The platform is designed to serve:

* Static SSR frontend (Next.js)
* Admin dashboard (coming soon)
* Public API consumers (researchers, journalists)

---

## Real Implementation Examples

### Prisma Example (Polymorphic Content)

```prisma
model Content {
  id           Int      @id @default(autoincrement())
  resourceType String   // LEADER, PARTY, ELECTION, etc.
  resourceId   Int
  title        String
  content      String
  titleLocal   String?
  contentLocal String?
  createdAt    DateTime @default(now())
}
```

### NestJS Module Structure

```
src/
  └── elections/
        ├── elections.service.ts
        ├── elections.controller.ts
        ├── dto/
        ├── elections.module.ts
```

### Next.js + Mantine UI

```tsx
<Card>
  <Title>{party.name}</Title>
  <Text>{party.descriptionLocal}</Text>
</Card>
```

---

## Lessons / Takeaways

* Build around your data, not your UI. Data modeling upfront saved major refactoring.
* Invest in multilingual support early — it's harder to retrofit.
* NestJS with Prisma and Next.js offers a highly productive fullstack foundation.
* Use polymorphic content linking sparingly and deliberately.

This architecture has held up well as I’ve expanded the platform to include polls, ratings, scandal timelines, and trend visualizations.

More details on how I structured the Prisma models and handled localization coming in the next article.
