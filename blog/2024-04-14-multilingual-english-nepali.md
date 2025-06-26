---

title: Building a Fully Multilingual Platform (English + Nepali)
slug: multilingual-english-nepali
date: 2024-04-14
tags: \[i18n, localization, multilingual, frontend, schema-design]
draft: false
author: samundrak
author\_title: JavaScript Dev
author\_url: [https://github.com/samundrak](https://github.com/samundrak)
author\_image\_url: [https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4](https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Overview

Supporting multiple languages isn’t just about translating strings—it’s about designing your **entire platform** to speak more than one language from day one. For a civic-tech system targeting Nepali audiences as well as English-speaking researchers and diaspora users, bilingual support was non-negotiable.

In this article, I’ll explain how I implemented multilingual support across:

* Database models and schema
* API structure
* React frontend rendering
* SEO and routing strategy
* Dynamic content like polls, charts, and tooltips

---
## The Challenge: Making Multilingual the Default
<!-- truncate    -->

While many platforms bolt on i18n as an afterthought, I wanted my system to:

* Display all **dynamic** data in both languages (not just UI strings)
* Handle incomplete translations gracefully
* Support localized URLs and metadata
* Let users switch language seamlessly

---

## Schema-Level Support: Dual Fields vs Translation Tables

After weighing options, I rejected translation tables and opted for **inline dual fields**. For example:

```prisma
model Leader {
  name       String
  nameLocal String?
  description       String?
  descriptionLocal  String?
}
```

This approach simplifies querying, reduces joins, and lets me load both translations with one request. It also scales well across dozens of models like Party, Election, Poll, Content, and more.

Whenever a field is shown on screen, the logic is simple:

```ts
const title = i18n.language === 'np' ? leader.nameLocal : leader.name;
```

---

## API Design with Localization in Mind

All APIs return both language fields by default. That means the frontend always has access to both versions and can choose dynamically.

Example JSON response for a Party:

```json
{
  "id": 25,
  "name": "Nepali Congress",
  "nameLocal": "नेपाली काँग्रेस",
  "description": "One of Nepal’s oldest democratic parties...",
  "descriptionLocal": "नेपालको पुरानो प्रजातान्त्रिक पार्टी..."
}
```

This approach avoids back-and-forth requests and simplifies client rendering.

---

## Frontend Integration: `i18next` + Manual Switching

I integrated `react-i18next` with global language toggling. Localized labels (like buttons, tabs, and meta) are stored in `locales/en` and `locales/np` JSON files. But the real magic happens with **dynamic content**:

```tsx
const { i18n } = useTranslation();
<Text>{i18n.language === 'np' ? leader.descriptionLocal : leader.description}</Text>
```

Even tooltips and charts respect the current locale:

```tsx
tooltipFormatter={(value, name) => i18n.language === 'np' ? nameLocal : name}
```

---

## Routing + SEO: Language-Aware URLs

I used localized paths like `/np/party/25` and `/en/party/25`, powered by Next.js’ routing system. These URLs are pre-rendered for SSR and optimized for search.

Meta tags are generated dynamically per page using `next-seo`:

```tsx
<NextSeo
  title={localizedTitle}
  description={localizedDescription}
  languageAlternates={[
    { hrefLang: 'np', href: fullNepaliUrl },
    { hrefLang: 'en', href: fullEnglishUrl },
  ]}
/>
```

---

## Partial Translations: Handling Missing Fields

Often, content is created in English first. If the Nepali version isn’t ready, I render the English fallback with a subtle indicator:

```tsx
<Text className={nameLocal ? '' : 'text-muted'}>
  {nameLocal || name}
</Text>
```

Admins are also prompted via dashboard UI to provide missing translations.

---

## Dynamic Modules: Polls, Charts, Content

Polls have both `question` and `questionLocal`. Options too. I made sure the UI respects this across both languages:

```ts
<Text>{i18n.language === 'np' ? poll.questionLocal : poll.question}</Text>
```

Same for timeline content, scandals, cabinet reshuffles, party trends—everything that matters is stored and served in two languages.

---

## Summary: Build With Bilingual In Mind

Multilingual platforms require:

* Schema-level field planning
* Language-sensitive API design
* Frontend rendering with fallback logic
* Consistent routing and SEO integration

Start early. It’s hard to retrofit later. The extra structure pays off fast in reach, credibility, and usability.

In the next post, I’ll show how I created a flexible content and feedback engine with ratings, comments, approvals, and deep resource linking.
