---
title: Building RajnitiReport – A Political Intelligence Platform for Nepal
slug: building-rajnitireport
date: 2025-06-26
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [fullstack, nestjs, react, data-visualization, nepal, politics, elections, prisma, docusaurus]
sidebar_position: 1
---

> _“Democracy thrives on information. RajnitiReport makes political history, performance, and accountability visible to all.”_

## 🇳🇵 Introduction

Nepal’s political history is complex, vibrant, and evolving. However, access to structured, contextual, and historically enriched political data is limited. Media reports are fragmented, and the Election Commission data lacks interactivity or deep analytics.

That’s where **RajnitiReport** (live at [NepalTracks.com](https://nepaltracks.com)) comes in.

We built RajnitiReport to be **Nepal’s first comprehensive political intelligence and analytics platform**, designed to empower citizens, researchers, and journalists through structured data, AI-enhanced insights, and interactive storytelling.
<!-- truncate -->
---

## 🔥 Vision

The goal of RajnitiReport is simple:

- **Contextualize** every election, leader, party, and government
- **Archive** political scandals transparently and responsibly
- **Enable** data-driven discussions and voting behavior analysis
- **Visualize** trends with simplicity and clarity

It’s not just a dataset — it's a civic tool for **political awareness**, **accountability**, and **data transparency**.

---

## 🧱 Architecture Overview

RajnitiReport is a fullstack application built on modern technologies, designed with scalability and data richness in mind.

### 🧩 Tech Stack

| Layer       | Tech Used                                  |
|-------------|---------------------------------------------|
| Frontend    | React.js, Next.js, TailwindCSS, Mantine     |
| Backend     | NestJS, Prisma ORM, MySQL                   |
| API Docs    | Swagger + OpenAPI                           |
| Charts      | Recharts, custom tooltips, logo markers     |
| Auth        | JWT + Role-based Access Control             |
| Infra       | Docker, GitHub Actions, Redis, Firebase     |
| Monitoring  | Zabbix, Prometheus, ELK Stack               |

---

## 🧠 Core Features

### 📊 Election Analytics

We map every general and constituent assembly election since 2046 B.S. with:

- Vote vs Seat trends over time
- Turnout, swing vote, and contest closeness
- Top winners, debutants, fall-from-glory tracking
- Visuals: trend arrows, logos, Recharts overlays

Example:

> _How did Rastriya Prajatantra Party fade after 2048 B.S.? What caused the rise of the Maoists in the early 2060s?_

### 🏛️ Government Explorer

A timeline of governments with detailed cabinet structures:

- Prime Minister, term durations, reshuffles
- Gender diversity and ministry distribution
- Tenure-based analytics for each leader
- Localized (Nepali + English)

### 🧑‍💼 Leader & Party Profiles

Every leader and party comes with:

- Multilingual biography
- Linked elections, governments, scandals, and poll ratings
- Switch history (party switching across time)
- Recurring ministers and consistent winners detection

### 📚 Political Scandals Archive

We created a bilingual archive of every major political scandal since 2040 B.S., tagged by:

- Party, Leader, Government
- Type (corruption, murder, fund misuse, abuse of power)
- Chronological hierarchy and nested relations
- Source verification and citation

### 🗳️ Polls with Integrity

Users can vote on:

- Leader and party approval
- Specific election outcomes
- Government ratings

Each poll is localized, has fraud prevention (via IP, user hash, and deadlines), and is linked to contextual resources.

---

## 🧪 Data Modeling with Prisma

We used **Prisma ORM** to build an optimized, normalized schema:

- `leaders`, `parties`, `elections`, `governments`, `cabinet_members`
- Polymorphic content and poll systems
- Localized fields for `titleLocal`, `contentLocal`, etc.
- Full-text indexes for search and filter performance

Example table: `contents` allows attaching multilingual articles, scandals, and descriptions to any resource (`LEADER`, `PARTY`, etc.) via `resourceType`, `resourceId`.

---

## 📈 Interactive Visuals

We use **Recharts** to make stats visually digestible:

- Party logos as dot markers
- Hoverable tooltips with vote counts and rank
- Trend arrows for vote/seat growth
- Independent groups are normalized as one party for accurate comparison

### 🎨 UI Details

- Responsive design via Tailwind and Mantine v7
- Animate.css transitions for interactivity
- Chart responsiveness for mobile and desktop

---

## 🌍 Localization

Every public string is available in **Nepali and English**, including:

- Candidate names
- Content and scandal summaries
- Party names
- Poll questions and options

We use `i18next` for frontend localization and dual-field storage (`titleLocal`, `descriptionLocal`) in the backend.

---

## 📦 API Overview

The NestJS backend exposes routes like:

- `/elections/list`
- `/leaders/:id`
- `/parties/:id`
- `/governments/:id`
- `/polls/:id`
- `/scandals/:id`

Auth-protected routes exist for creating/modifying data. Swagger docs are available at `/docs`.

---

## 🧭 Future Plans

Here’s what’s next on the roadmap:

- ✅ Mobile-first optimization
- ✅ GraphQL support
- 🔲 AI-driven Q&A about politicians, events, parties
- 🔲 Leader/party approval tracking over time
- 🔲 NLP-powered scandal summarization
- 🔲 Regional political loyalty maps

---

## 💬 Closing Thoughts

We built RajnitiReport out of a desire to bring **clarity to confusion**, **facts to debates**, and **structure to political chaos**. With every new election, leader, or controversy, our system grows more powerful.

And this is just the beginning.

If you’re interested in contributing, collaborating, or using our API — reach out!

---

_Developed with 🇳🇵 by [Samundra Khatri](https://github.com/samundrak) in Tokyo, Japan._

