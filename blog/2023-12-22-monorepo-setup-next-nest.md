---

title: Creating a Modular Monorepo, Frontend Meets Backend
slug: monorepo-setup-next-nest
date: 2023-12-22
tags: \[monorepo, fullstack, pnpm, shared-types, architecture]
draft: false
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

Once the schema and core features were taking shape, I needed a scalable way to manage both frontend and backend in a single codebase. My goals were:

* Reduce context switching
* Share types between API and UI
* Optimize for developer speed and clarity

I chose a monorepo setup using PNPM workspaces. This let me keep backend (NestJS), frontend (Next.js), and shared types/utilities in separate packages—but in one unified repository.

---

## Monorepo Structure

Here's the high-level layout I landed on:

```
apps/
  ├── frontend/     # Next.js app (SSR, client, UI logic)
  └── backend/      # NestJS API with Prisma
packages/
  ├── shared/       # Common interfaces, enums, helper functions
  └── config/       # Shared tsconfig, eslint, env loaders
prisma/             # Central schema, migrations
scripts/            # Utility scripts for seeds, exports
```
<!-- truncate    -->
The real power came from treating `packages/shared` as a dependency for both the backend and frontend apps. Types stayed in sync, and data shape mismatches were caught early.

---

## Why PNPM Workspaces

I chose PNPM over alternatives (like Lerna, Turborepo) because:

* It’s fast and simple to configure
* Native support for symlinked local packages
* Great dev experience when rebuilding or linking shared logic

I configured `package.json` like this:

```json
{
  "name": "rajnitireport",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

And set up relative imports in each package via `tsconfig.json`.

---

## Sharing Types Between Frontend and Backend

The biggest benefit came from using the `shared` package to define:

* Prisma model-derived interfaces
* Common DTOs used in API + UI
* Constants like `ResourceType`, `PollType`, etc.

This pattern drastically reduced duplication and bugs.

```ts
// shared/types.ts
export type ResourceType = 'LEADER' | 'PARTY' | 'ELECTION';
export interface PollOption {
  id: number;
  label: string;
  labelLocal?: string;
}
```

```ts
// backend: polls.service.ts
import { PollOption } from '@shared/types';

// frontend: PollCard.tsx
import { PollOption } from '@shared/types';
```

---

## Practical Dev Benefits

* Fast refactors: update types once, propagate everywhere
* Cleaner imports and test coverage
* Less mental load from jumping between folders or repos
* Scoped builds and deployments (coming soon)

---

## Takeaways

If you're building a fullstack product where both frontend and backend evolve together, a monorepo is worth the setup time. Sharing types and logic saved me hours of guesswork, especially during schema changes.

Up next: how I handled dynamic chart rendering using Recharts with party logos and election performance trends.
