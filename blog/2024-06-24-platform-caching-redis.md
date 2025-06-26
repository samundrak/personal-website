---
title: Optimizing Platform Performance with Redis & TTL-Based Caching
slug: platform-caching-redis
date: 2024-06-24
tags: [performance, redis, caching, backend, ttl, nestjs]
draft: false
truncate: true
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

As election and political data expanded, performance bottlenecks became visible—especially on pages rendering historical trends and analytics. I adopted **Redis-based caching** with time-based expiry to ensure:

* Faster load times
* Reduced DB load
* Controlled freshness of data

This post details my approach using NestJS, Redis, and TTL strategies.

---
<!-- truncate    -->

## Problem Areas

Pages that triggered expensive queries:

* Party trends over decades
* Leader performance timelines
* Comparative election analytics

Each required multiple joins, aggregations, and normalization logic.

---

## Redis Caching Layer

I introduced Redis with a helper service:

```ts
async getOrSetCache<T>(key: string, ttl: number, cb: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const fresh = await cb();
  redis.setex(key, ttl, JSON.stringify(fresh));
  return fresh;
}
```

---

## Key Strategy

Keys are designed per entity, per variant:

* `party:25:trends`
* `leader:102:performance`
* `election:1991:comparisons`

This ensures data is scoped tightly and easy to purge.

---

## TTL Expiry

Each dataset has a tailored TTL (time-to-live):

* Static historical data: 24h
* Popular charts: 6h
* Admin dashboards: 2m

This avoids staleness while reducing query load.

---

## Invalidation Strategy

For dynamic data (e.g. poll responses, comments), I use:

```ts
redis.del('poll:approval:25')
```

Upon any write, specific keys are flushed so the next read triggers a fresh load.

---

## NestJS Service Integration

All public services inject the caching helper. Example:

```ts
@Get('/party/:id/trends')
getTrends(@Param('id') id: string) {
  return this.cacheService.getOrSetCache(`party:${id}:trends`, 86400, () => this.service.getPartyTrends(id));
}
```

---

## Monitoring

I used Redis CLI and a small logging middleware to monitor hit/miss ratio. Future plans include Prometheus integration.

---

## Summary

By caching computed analytics with Redis + TTL:

* Pages load faster
* Data stays fresh enough
* Infrastructure handles scale better

Next, I’ll show how I built a flexible, tag-driven metadata system for mapping ministries, party types, cabinet roles, and election categories.
