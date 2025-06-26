---
title: "Attaching Polls to Any Resource: A Flexible, Polymorphic System"
slug: poll-system-polymorphic
date: 2024-06-22
tags: [polls, voting, polymorphism, feedback, civic-tech]
draft: false
truncate: true
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

Civic platforms are incomplete without community voice. I designed a system to attach **polls** to any resource—leaders, parties, elections, or governments—and record structured public responses.

This post covers how I built a polymorphic poll engine that is:

* Type-safe
* Localized
* Flexible in format (radio/checkbox)
* Easily integrated across the frontend

---

## Schema Structure
<!-- truncate    -->

Polls use a classic polymorphic pattern:

```prisma
model Poll {
  id            Int      @id @default(autoincrement())
  resourceType  String   // PARTY, LEADER, ELECTION, GOVERNMENT
  resourceId    Int
  code          String   @unique
  title         String
  titleLocal    String
  question      String
  questionLocal String
  type          String   // RADIO or CHECKBOX
  expiresAt     DateTime?
  createdAt     DateTime @default(now())
}
```

Each poll has `options` and stores `responses` separately.

---

## Poll Options

```prisma
model PollOption {
  id        Int
  pollId    Int
  value     String
  valueLocal String
  linkedResourceType String?
  linkedResourceId Int?
}
```

This allows options to optionally represent a real political entity (e.g. vote on a leader’s performance).

---

## Poll Responses

```prisma
model PollResponse {
  id      Int @id @default(autoincrement())
  pollId  Int
  optionId Int
  userHash String
  createdAt DateTime @default(now())
}
```

`userHash` prevents multiple voting without full auth.

---

## UI Rendering

I created a reusable frontend component:

```tsx
<SystemPoll poll={poll} onVoteSubmitted={refetch} />
```

It supports both `RADIO` and `CHECKBOX` formats and displays results immediately after voting.

---

## Language-Aware Rendering

Every question, title, and option has an English + Nepali version. The UI auto-detects language preference:

```ts
const label = i18n.language === 'np' ? option.valueLocal : option.value;
```

---

## Example Poll

```ts
{
  code: 'PARTY_APPROVAL',
  question: 'Do you like this party?',
  questionLocal: 'के तपाईंलाई यो पार्टी मनपर्छ?',
  type: 'RADIO',
  options: [
    { value: 'Yes', valueLocal: 'हो' },
    { value: 'No', valueLocal: 'होइन' }
  ]
}
```

---

## Poll Expiry and Visibility

Polls can have `expiresAt` for time-limited campaigns. Inactive or expired polls are hidden automatically. Admins can view all stats and raw submissions.

---

## Summary

This flexible polling engine now powers real-time approval ratings, debates, and issue-based questions across the entire political dataset. It supports deep linking, multilingual responses, and reuse across all modules.

Next: I’ll cover how I optimized backend performance with Redis-powered caching and TTL-based purging for high-traffic endpoints.
