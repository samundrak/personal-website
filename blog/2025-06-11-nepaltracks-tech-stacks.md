---
title: Building RajnitiReport – A Political Intelligence Platform for Nepal
slug: building-rajnitireport
date: 2025-06-26
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [fullstack, nestjs, react, data-visualization, nepal, politics, elections, prisma, docusaurus]
sidebar_position: 1
---

> _“Democracy thrives on information. RajnitiReport makes political history, performance, and accountability visible to all.”_

# RajnitiReport: A Deep Dive into the Architecture of a Political Analytics Platform

## 1. Project Overview

RajnitiReport (publicly known as NepalTracks.com) is a comprehensive political analytics and civic transparency platform designed to empower citizens, journalists, and policy analysts in Nepal. In a landscape often characterized by opaque political processes, the platform aims to be a definitive source of truth, providing data-driven insights into the activities of elected officials, governments, and political parties.

**Value Proposition:**

*   **For Citizens:** Offers an accessible way to track the performance of their representatives, understand government actions, and participate in public discourse through features like polls and ratings.
*   **For Journalists & Analysts:** Provides a rich, queryable database of political information, from historical election data to real-time cabinet reshuffles, facilitating in-depth research and reporting.
*   **For Policy-Tech Enthusiasts:** Serves as a case study in building a complex, data-centric application with a modern technology stack.

The platform's core mission is to foster accountability and transparency in Nepali politics by making political data easily accessible and understandable.
<!-- truncate -->
## 2. Technical Stack Explanation

RajnitiReport is built on a robust, modern monorepo architecture using `pnpm` workspaces, which separates the frontend, backend, and shared packages for better organization and maintainability.

### Frontend (Next.js)

The frontend is a Next.js application, chosen for its powerful features like server-side rendering (SSR) and static site generation (SSG), which are crucial for performance and SEO.

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **UI Components:** A combination of [Mantine](https://mantine.dev/) and [Tailwind CSS](https://tailwindcss.com/) is used for building the user interface. Mantine provides a rich set of pre-built components, while Tailwind CSS offers utility-first styling for rapid and custom UI development.
*   **Data Visualization:** [Recharts](httpss://recharts.org) is the primary library for creating the various charts and graphs that are central to the platform's data analytics features.
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand) is used for lightweight global state management.
*   **Internationalization:** `next-i18next` is used to provide localization in both English and Nepali, making the platform accessible to a wider audience.

### Backend (NestJS)

The backend is a [NestJS](https://nestjs.com/) application, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

*   **Framework:** NestJS (TypeScript)
*   **API:** A combination of a RESTful API and a GraphQL API is exposed. The RESTful API is documented using Swagger (`@nestjs/swagger`), providing a clear and interactive way to explore the API endpoints. The GraphQL API is built using `@nestjs/graphql` and Apollo Server.
*   **Database ORM:** [Prisma](https://www.prisma.io/) is used as the Object-Relational Mapper (ORM) for interacting with the MySQL database. It provides a type-safe way to query the database and a powerful migration system.
*   **Authentication:** The API uses a combination of JWT-based authentication (`@nestjs/jwt`, `passport-jwt`) for stateless user sessions and social logins (Google, Facebook) via Passport.js.
*   **Background Jobs:** [BullMQ](https://bullmq.io/) is used for managing background jobs and queues, such as sending emails, processing AI summaries, and fetching images. A Bull Board UI is also integrated for monitoring the queues.
*   **Caching:** A caching layer is implemented using `@nestjs/cache-manager` with a Redis backend to improve performance by caching frequently accessed data.

## 3. Business Logic and Domain Modeling

The `prisma.schema` file is the heart of the application's domain model. It defines the entities, their relationships, and the data types that power the platform.

### Core Entities

*   **`leaders`:** Represents individual politicians. It stores their personal details, political history, and relationships with parties and governments.
*   **`parties`:** Represents political parties. It includes information about the party's history, leadership, and ideology.
*   **`governments`:** Represents governments at the federal, provincial, and local levels. It tracks their tenure, cabinet members, and key events.
*   **`elections`:** Stores data about various types of elections, including general elections, by-elections, and local elections.
*   **`parliaments`:** Represents the different houses of parliament, their members, and their sessions.
*   **`contents`:** A polymorphic table used to store various types of content, such as scandals, news articles, and achievements. This is a key part of the platform's content management system.
*   **`polls`:** Powers the public polling feature, allowing users to vote on various issues.

### Key Relationships and Concepts

*   **Polymorphic Content (`contents` table):** The `contents` table uses a `resourceType` (enum) and `resourceId` (integer) to associate content with different entities (e.g., a scandal can be linked to a `Leader`, `Party`, or `Government`). This is a powerful and flexible way to manage content across the platform.
*   **Localization:** The platform supports both English and Nepali. This is implemented by having `localName` and `name` fields in many of the core tables (e.g., `leaders`, `parties`, `governments`). The frontend then uses `next-i18next` to display the appropriate language based on the user's preference.
*   **Party Switching (`party_leaders` table):** The `party_leaders` table tracks the history of a leader's affiliation with different parties, including start and end dates. This allows the platform to analyze party switching trends.
*   **Cabinet Reshuffles (`cabinet_members` table):** The `cabinet_members` table stores the history of cabinet appointments, including start and end dates, roles, and departments. This enables the platform to track cabinet reshuffles and analyze the composition of governments over time.

Here's a snippet from the `prisma.schema` that illustrates the relationship between leaders, parties, and governments:

```prisma
model leaders {
  id              Int             @id @default(autoincrement())
  name            String
  localName       String?
  // ... other fields
  governments     governments[]
  party_leaders   party_leaders[]
  // ... other relations
}

model parties {
  id            Int           @id @default(autoincrement())
  name          String
  localName     String?
  // ... other fields
  party_leaders party_leaders[]
  // ... other relations
}

model party_leaders {
  id        Int       @id @default(autoincrement())
  leaderId  Int?
  partyId   Int?
  startDate DateTime
  endDate   DateTime?
  position  String
  leader    leaders?  @relation(fields: [leaderId], references: [id])
  party     parties?  @relation(fields: [partyId], references: [id])
  // ... other fields
}
```

## 4. Core Features: Bridging Data and Public Understanding

RajnitiReport's power lies in its features, which transform raw data into meaningful narratives. Each feature is designed to be intuitive for the average user while providing the depth required by researchers.

### Election Analytics

**For the User:** This is the cornerstone of the platform. Users can explore historical election results with incredible detail. They can see not just who won a particular seat in 2022, but also how voting patterns have shifted in that constituency over decades. The platform visualizes trends, highlights "consistent winners" who have held a seat for multiple terms, and showcases "debutants" who are new to the political scene. This turns abstract election data into compelling stories about political careers and voter behavior.

**Technical Implementation:**
The backend powers this with a sophisticated data model.

*   **Database:** The `elections`, `election_results`, `leaders`, `parties`, and geographic tables (`states`, `districts`, `municipals`) are all interconnected. A query for a specific election result can join across these tables to pull the winner's name, party affiliation, vote count, and the specific location.
*   **API:** The NestJS API exposes endpoints like `/api/v1/elections/:year/:constituency` that aggregate this data. The logic for identifying "consistent winners" or "debutants" is handled in the service layer (e.g., `ElectionsService`). This service would query the `election_results` table, group by `leaderId`, and count the wins over time.
*   **Frontend:** The Next.js frontend consumes this structured JSON data. It uses the **Recharts** library to create interactive bar charts for vote share, line charts for trends over time, and data tables to display the detailed results. React components are designed to be reusable for different election types (federal, provincial, local).

### Government and Cabinet Tracking

**For the User:** Governments and their cabinets can feel like a black box. This feature shines a light inside. Users can see a timeline of every government, view its complete list of cabinet members (past and present), and understand its composition (e.g., which parties form the coalition). When a minister is appointed or resigns, the platform tracks it. This provides a clear, chronological record of who is in power and who is responsible for which ministry.

**Technical Implementation:**

*   **Database:** The `governments` table is central, linked to `cabinet_members`. The `cabinet_members` table is a historical log, with `startedAt` and `endAt` fields to track the tenure of each minister in a specific role. The `isResigned` flag and `remarks` field add crucial context.
*   **Logic for Reshuffles:** A cabinet "reshuffle" isn't a single database entry. It's a series of updates: setting the `endAt` date for outgoing ministers and creating new records for incoming ones. This logic is encapsulated within a `GovernmentsService` on the backend, ensuring changes are transactional and data remains consistent.
*   **API & Frontend:** The API provides endpoints to fetch a government's history, such as `/api/v1/governments/:id/cabinet`. The frontend displays this as a timeline or a nested list, allowing users to see the cabinet's structure at any given point in time.

```typescript
// Simplified NestJS Service Logic for fetching a cabinet
async function getCabinetForGovernment(governmentId: number) {
  // Prisma query to get all current and past members of a government
  return this.prisma.cabinet_members.findMany({
    where: { governmentId },
    include: {
      leader: true, // Include the leader's details
      party: true,  // Include the party's details
      department: true, // Include the ministry details
    },
    orderBy: {
      rank: 'asc', // Order by seniority
    },
  });
}
```

### Scandal Archiving & Content Linkage

**For the User:** Political scandals and controversies are often reported in the news and then forgotten. This feature creates a permanent, accessible archive. It documents scandals, news, and achievements and, crucially, links them directly to the profiles of the leaders, parties, or governments involved. This ensures that a politician's or party's record includes not just their victories, but also their controversies.

**Technical Implementation:**
This is where the polymorphic design shines.

*   **Database:** The `contents` table has `resourceType` (an enum: `LEADER`, `PARTY`, `GOVERNMENT`) and `resourceId` fields. This allows a single `contents` record to be associated with any other entity in the database without needing separate join tables for each.
*   **API:** When you view a leader's profile, the API makes a parallel request to `/api/v1/contents?resourceType=LEADER&resourceId=:leaderId`. This fetches all associated content—scandals, news, etc.
*   **Content Creation:** An admin panel (built with **AdminJS**) provides the interface for editors to create and link this content, ensuring data quality and proper association.

### Public Polls with Fraud Prevention

**For the User:** This feature gives users a voice. They can participate in polls on current events and political issues. The system supports both single-choice (Radio) and multiple-choice (Checkbox) polls. The results are displayed in real-time, showing what a segment of the public thinks about a given topic.

**Technical Implementation:**

*   **Database:** The `polls`, `poll_options`, and `poll_responses` tables manage this feature. To prevent a single user from voting multiple times in the same poll, there is a unique constraint on the `poll_responses` table.
    ```prisma
    // In the poll_responses model
    @@unique([pollId, userId, optionId])
    ```
*   **Fraud Prevention:** Beyond the unique constraint for logged-in users, the backend employs several layers of security.
    *   **Rate Limiting:** The `ThrottlerModule` in NestJS (`main.ts`) limits how many requests a single IP address can make in a given time, preventing simple bot spam.
    *   **CAPTCHA:** The `nest-cloudflare-turnstile` module is used to integrate Cloudflare's Turnstile, a user-friendly CAPTCHA alternative, to ensure that poll submissions are coming from humans.
*   **Real-time Updates:** When a user votes, the frontend can either refetch the poll results or, for a more advanced implementation, use WebSockets (the `EventsModule` suggests this capability) to push live updates to all connected clients.

## 5. Database Architecture: The Blueprint of RajnitiReport

If the features are the rooms of the house, the database is the foundation and blueprint. For a layman, think of it as a highly organized digital filing cabinet. There's a drawer for "Leaders," one for "Parties," and another for "Elections." Every file (or record) has a unique ID, and we use these IDs to cross-reference information. For example, a leader's file contains a list of IDs for every election they've participated in.

**For the Technical User:** The architecture is a relational model defined in `schema.prisma` and implemented in MySQL. Prisma acts as a powerful and type-safe intermediary.

*   **Relations:** The schema makes extensive use of one-to-many (e.g., one `parties` has many `party_leaders`) and many-to-many relations. The `party_leaders` table is a classic example of an explicit many-to-many relation, linking `leaders` and `parties` while also storing historical data about the relationship (like `startDate`, `endDate`, and `position`).
*   **Enums:** The use of enums (`enum`) for fields like `ElectionType`, `CONTENT_TYPE`, or `CABINET_ROLE` is a key strength. It enforces data consistency, ensuring that a role is always "MINISTER" and not "Minister" or "minister". This prevents bugs and simplifies queries.
*   **Indexes:** The schema is carefully optimized for performance with database indexes (`@@index`). For example, the `election_results` table is indexed on `leaderId`, `partyId`, `electionId`, and all geographic IDs. This makes filtering results by any of these criteria extremely fast, which is critical for the analytics features.
*   **Full-Text Search:** The `@@fulltext` attribute on the `contents` table enables powerful and efficient text search capabilities directly within the database, allowing users to easily find relevant articles or scandals.

```prisma
// Example of a well-defined model in schema.prisma
model election_results {
  id              Int              @id @default(autoincrement())
  electionId      Int
  elections       elections        @relation(fields: [electionId], references: [id])
  leaderId        Int
  leaders         leaders          @relation(fields: [leaderId], references: [id])
  partyId         Int?
  parties         parties?         @relation(fields: [partyId], references: [id])
  voteCount       Int
  isElected       Boolean?
  // ... other fields

  // Indexes for fast lookups
  @@index([electionId])
  @@index([leaderId])
  @@index([partyId])
}
```

## 6. API Design: The Waiter of RajnitiReport

**For the User:** Think of the API (Application Programming Interface) as a very efficient waiter in a restaurant. Your browser (the customer) needs something, like "a list of all prime ministers since 2008." It gives this order to the API. The API goes to the "kitchen" (the database), gathers the correct information, organizes it neatly on a platter (as structured JSON data), and delivers it back to your browser to be displayed. A well-designed API ensures this process is fast, reliable, and secure.

The platform also has a "menu," powered by Swagger, which shows developers exactly what they can ask for and how to ask for it, making it easy to interact with the data.

**Technical Implementation:**
The backend exposes a robust and secure API that is actually a hybrid of two popular approaches: REST and GraphQL.

*   **RESTful Architecture:** The primary API follows REST principles, with resource-oriented URLs. For example, to interact with leaders, you use endpoints like:
    *   `GET /api/v1/leaders` (to list all leaders)
    *   `GET /api/v1/leaders/:id` (to get a specific leader)
    *   `POST /api/v1/leaders` (to create a new leader, likely an admin-only function)
    This structure is implemented in NestJS using Controllers, which handle incoming requests, and Services, which contain the business logic.

*   **GraphQL for Flexibility:** Recognizing that some data views are complex, the project also includes a GraphQL API, evident from the `@nestjs/graphql`, `@apollo/server`, and `graphql` dependencies. This allows the frontend to request exactly the data it needs in a single query, avoiding the over-fetching or under-fetching of data that can happen with REST. This is particularly useful for complex dashboards that might need to pull data from leaders, their election results, and their party affiliations all at once.

*   **API Documentation with Swagger:** The `@nestjs/swagger` package is used to automatically generate interactive API documentation. By decorating the controllers and DTOs (Data Transfer Objects) with annotations, the API becomes self-documenting. This is configured in `main.ts` and is an invaluable tool for both frontend developers consuming the API and external partners.

*   **Security as a Priority:** The API is hardened with multiple layers of security, as seen in `main.ts` and the project's dependencies:
    *   **Authentication:** `passport` with `passport-jwt` is used for securing endpoints, ensuring only authenticated users can perform certain actions. Social logins (`passport-google-oauth20`, `passport-facebook`) provide easy onboarding for users.
    *   **Rate Limiting:** `@nestjs/throttler` is configured to prevent abuse by limiting the number of requests from a single IP address.
    *   **Bot Prevention:** `nest-cloudflare-turnstile` integrates a CAPTCHA-like challenge on sensitive endpoints like poll voting or user registration.
    *   **General Security:** `helmet` is used to set various HTTP headers to protect against common web vulnerabilities like XSS and clickjacking, while `hpp` protects against HTTP Parameter Pollution attacks.

## 7. Data Visualization: Making Numbers Tell a Story

**For the User:** A page full of numbers is intimidating. Data visualization is the art of turning that spreadsheet into a story. We use charts and graphs to reveal patterns instantly. Instead of just telling you a party won 40% of the vote, we show you a bar chart where their color takes up almost half the space. We use special markers, like a party's actual logo on the chart, or trend arrows (↑ or ↓) to show if a politician's popularity is rising or falling. This makes complex data intuitive and engaging.

**Technical Implementation:**
This is primarily a frontend challenge, handled within the Next.js application.

*   **Core Library:** **Recharts** is the chosen charting library, as seen in `apps/web/package.json`. It's favored for its declarative, component-based approach that integrates seamlessly with React.
*   **Custom Chart Components:** The codebase likely contains custom wrapper components around Recharts' primitives. For instance, there might be a component like `<ElectionResultChart data={...} />`. This component would contain the logic for rendering the axes, tooltips, and bars, but also for adding the custom elements.
*   **Party Logo Markers:** To display a party's logo on a bar or in a legend, the API response for election results would be enriched to include the `logo` URL alongside the party's name and vote count. The React component would then render an `<image>` SVG element at the correct coordinates within the chart.
*   **Handling "Independents":** A common challenge in political charting is avoiding a messy legend with dozens of one-off independent candidates. The frontend logic likely includes a data transformation step that groups all candidates without a major party affiliation under a single "Independent" or "Other" category, assigning them a consistent grey color.
*   **Trend Arrows:** For time-series data (e.g., a leader's approval rating over time), the data object passed to the chart component would contain a calculated `trend` field (e.g., `'up'`, `'down'`, `'stable'`). The component would then use this to conditionally render an icon next to the data point.

```javascript
// Simplified React/Recharts component logic
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

// Data from API would look like this:
const chartData = [
  { name: 'Party A', votes: 1200, color: '#FF0000', trend: 'up' },
  { name: 'Party B', votes: 950, color: '#0000FF', trend: 'down' },
  // ...
];

const CustomBarChart = ({ data }) => (
  <BarChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="votes">
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Bar>
  </BarChart>
);

// The component would then be used with logic to render the trend icon
// next to the relevant part of the UI.
```

## 8. Caching and Performance Optimizations

**For the User:** You expect a website to be fast. Caching is a key technique we use to make that happen. When you visit a page, we save a temporary copy of the data. The next time someone (or you) visits that same page, we can show them the saved copy instantly instead of rebuilding it from scratch. This makes navigating the site feel snappy and responsive, especially during high-traffic events like an election night.

**Technical Implementation:**
Performance is a multi-layered strategy involving the frontend, backend, and infrastructure.

*   **Backend Caching (Redis):** The API uses a sophisticated caching strategy. The `CacheModule` is registered globally in `app.module.ts`, and the `cache-manager-redis-store` dependency indicates that Redis is the caching backend. This is a powerful choice for a distributed cache. Specific, data-intensive endpoints (like fetching a government's full cabinet or complex election analytics) are likely decorated with `@CacheKey` and `@CacheTTL` (Time To Live), which automatically cache their results in Redis for a set duration.
*   **Frontend Caching (React Query):** The `react-query` library in the web app provides a client-side cache. It automatically caches data from API requests, so if you navigate away from a page and then back to it, the data is loaded instantly from memory instead of making another network request. It also handles background refetching to keep the data fresh.
*   **Load Shedding:** The `toobusy-js` package is a crucial safeguard. If the server's event loop becomes too busy (a sign of being overloaded), it will start shedding new requests with a "503 Service Unavailable" message. This is a graceful way to handle massive traffic spikes, ensuring the server remains stable for existing users rather than crashing entirely.
*   **Next.js Optimizations:** The choice of Next.js itself is a performance win. It allows for:
    *   **Static Site Generation (SSG):** For pages that don't change often (e.g., an "About Us" page or the results of a past election), full HTML pages can be generated at build time and served instantly from a CDN.
    *   **Server-Side Rendering (SSR):** For dynamic pages (e.g., a leader's profile), the page is rendered on the server, sending fully-formed HTML to the browser for a fast initial paint.

## 9. Future Roadmap

Based on the existing architecture and dependencies, the logical next steps for RajnitiReport are clear:

*   **Deeper AI Integration:** The `openai` and `ollama` packages are already present. This foundation can be used to move beyond simple summaries to more advanced features like:
    *   **Sentiment Analysis:** Automatically analyzing news articles and social media to gauge public sentiment towards politicians or policies.
    *   **Predictive Analytics:** Building models to forecast election outcomes based on historical data and current trends.
    *   **Semantic Search:** Allowing users to ask natural language questions like "Which ministers have been involved in corruption scandals?"
*   **Enhanced Real-Time Features:** Leveraging `BullMQ` and potentially WebSockets (`EventsModule`) to provide:
    *   **Live Election Night Dashboard:** A page that updates vote counts in real-time as results come in.
    *   **Bill Tracking:** Notifying users when a legislative bill they are following moves to a new stage in parliament.
*   **User-Generated Content and Community:** Expanding the `Polls` feature to allow users to create their own polls, or introducing a verified "analyst" role where trusted community members can contribute their own analysis and articles.

## 10. Challenges and Solutions

Building and maintaining a platform of this complexity is not without its hurdles. The codebase reveals several challenges and the clever solutions implemented to overcome them.

*   **Challenge: Data Acquisition and Integrity**
    *   **Problem:** Political data in Nepal, as in many places, is often scattered, inconsistent, and available in non-standard formats (PDFs, unstructured websites, Excel files).
    *   **Solution:** A multi-faceted data ingestion pipeline. The `/apps/api/data` directory shows a pragmatic approach:
        1.  **Automated Scrapers:** Custom scripts (`fetch-parliament.js`, `transli.py`) are written to pull data from specific online sources.
        2.  **Semi-Manual Processing:** The presence of `.xlsx` files and the `node-xlsx` package shows that some data is first collected or cleaned in spreadsheets before being programmatically imported.
        3.  **Human-in-the-Loop:** The **AdminJS** panel serves as the final and most critical step. It provides a UI for human editors to review, verify, clean, and cross-reference the ingested data before it is published, ensuring a high level of accuracy.

*   **Challenge: Architectural Complexity**
    *   **Problem:** A large application with a frontend, backend, shared libraries, and multiple developers can quickly become a tangled mess.
    *   **Solution:** A disciplined monorepo architecture.
        1.  **`pnpm` Workspaces:** Manages the entire project, making it easy to handle dependencies and run scripts across the different packages.
        2.  **Clear Separation:** The `apps` (web, api) and `packages` (ui, auth, config) directories enforce a logical separation of concerns.
        3.  **TypeScript Everywhere:** Using TypeScript across the entire stack provides strong type-safety, which catches bugs early and makes the codebase easier to refactor and maintain.

*   **Challenge: Performance at Scale**
    *   **Problem:** A data-heavy website can easily become slow under heavy user load.
    *   **Solution:** A holistic performance strategy. As detailed above, this is a combination of intelligent backend caching with Redis, client-side caching with React Query, load-shedding with `toobusy-js`, and leveraging the built-in performance features of Next.js. This proactive approach ensures the platform remains fast and reliable for its users.
