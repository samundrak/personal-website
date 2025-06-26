---

title: Designing a Flexible Polling System with Vote Integrity
slug: flexible-polling-system
date: 2024-02-06
tags: \[polls, system-design, backend, nestjs, ux]
draft: false
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

Polling seems simple on the surface—ask a question, tally responses—but in a public-facing, multilingual, political data platform, the requirements grow fast. I needed to build a polling system that was:

* Reusable and flexible (attach polls to leaders, parties, elections, etc.)
* Localized (bilingual support)
* Honest (no spam or duplicate votes)
* Insightful (results usable in trends and analytics)

This post covers how I approached it with NestJS, Prisma, and a clean frontend API.

---
<!-- truncate    -->
## Requirements I Designed Around

* Polls should be either single-select (radio) or multi-select (checkbox)
* Polls can be embedded in any context (e.g. Party page, Election summary)
* Questions and options should be bilingual
* Users should not vote more than once per poll (IP, hash, or user tracked)
* Results should be readable live or stored for reports

---

## Schema Design (Prisma)

I used a polymorphic model with flexible structure:

```prisma
model Poll {
  id           Int      @id @default(autoincrement())
  type         String   // RADIO or CHECKBOX
  question     String
  questionLocal String?
  resourceType String   // LEADER, PARTY, ELECTION, etc.
  resourceId   Int
  deadline     DateTime?
  options      PollOption[]
  responses    PollResponse[]
}

model PollOption {
  id           Int      @id @default(autoincrement())
  label        String
  labelLocal   String?
  pollId       Int
}

model PollResponse {
  id           Int      @id @default(autoincrement())
  pollId       Int
  optionIds    String   // Comma-separated for checkbox
  userHash     String
  createdAt    DateTime @default(now())
}
```

---

## Frontend Rendering

The poll component supports both types using shared logic:

```tsx
{poll.type === 'RADIO' ? (
  <Radio.Group>{options}</Radio.Group>
) : (
  <Checkbox.Group>{options}</Checkbox.Group>
)}
```

And results can be toggled depending on settings:

```tsx
{showResults ? <PollResults poll={poll} /> : <PollForm poll={poll} />}
```

---

## Integrity Layer

To prevent spam or repeated voting:

* Anonymous users get a browser fingerprint or hash
* Authenticated users are matched to their account
* IP + hash are used as fallback in server checks

NestJS middleware checks whether a vote was submitted before:

```ts
const alreadyVoted = await this.prisma.pollResponse.findFirst({
  where: {
    pollId,
    userHash,
  },
});
```

---

## Localization Support

Poll questions and options are stored in two languages and rendered based on the user's current locale (`i18next` context):

```tsx
<Text>{i18n.language === 'np' ? poll.questionLocal : poll.question}</Text>
```

---

## Takeaways

Building polling into your platform is more than just frontend forms—it’s about:

* Schema flexibility
* Vote protection and idempotence
* Language support
* Attaching results meaningfully to your analytics

In the next article, I’ll dive into backend performance and how Redis was used to cache expensive queries like election comparisons, party timelines, and leader trend data.
