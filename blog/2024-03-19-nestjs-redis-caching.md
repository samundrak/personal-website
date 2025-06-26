---
title: Caching & Performance Optimization with Redis in NestJS
slug: nestjs-redis-caching
date: 2024-03-19
tags: [nestjs, redis, caching, performance, backend]
draft: false
author: samundrak
author_title: JavaScript Dev
author_url: https://avatars1.githubusercontent.com/u/3079452?s=460\&u=e5bd48488cb71b665ea5403192c6b8a963644a08\&v=4
---

## Overview

When building a platform that relies on statistical analysis and deep comparisons, response time can quickly become a bottleneck. In this article, I’ll walk through how I integrated **Redis** with **NestJS** to reduce computation time and database load on performance-heavy endpoints.

I implemented caching on frequently accessed data like:

* Party trends across elections
* Leader performance history
* Poll summaries
* Government composition data

---
<!-- truncate    -->
## Why Redis?

Redis was a natural fit for this use case because:

* It’s fast (in-memory)
* Supports key-based access
* Handles TTL (time-to-live) logic elegantly
* Integrates easily with Node.js

I use it both for static data (cached responses) and temporary session data (vote hashes, poll locks).

---

## Integration with NestJS

NestJS doesn’t come with Redis out of the box, but integrating it is straightforward:

```ts
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
      }),
    }),
  ],
})
export class AppModule {}
```

Use `@CacheInterceptor` or `cacheManager` manually in services:

```ts
@Injectable()
export class PartyService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getPartyTrends(id: number) {
    const key = `party_trends_${id}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const trends = await this.queryTrends(id);
    await this.cacheManager.set(key, trends, { ttl: 300 });
    return trends;
  }
}
```

---

## When to Cache

I typically cache data that meets at least one of the following:

* Expensive to compute or join (multi-election trend analysis)
* Stable for a given timeframe (e.g. 5 minutes to 1 hour)
* Frequently requested (e.g. homepage charts, top leaders)

---

## TTL and Invalidation Strategy

* Each cached object gets a TTL depending on volatility:

  * Poll results: 30 seconds
  * Leader summaries: 5 minutes
  * Election trend comparisons: 1 hour

* For admin-triggered updates, I add manual cache busting logic:

```ts
await this.cacheManager.del(`party_trends_${partyId}`);
```

---

## Metrics Before & After

* Party trend endpoint: from 1.2s → 90ms
* Top winners summary: 800ms → 70ms
* Poll result rendering: 300ms → 50ms

Redis made the site feel instantly more responsive and scalable.

---

## Takeaways

* Don’t over-cache everything—start with high-impact queries
* TTLs should reflect content volatility and UX needs
* Redis + NestJS works cleanly and gives you full control

Next up, I’ll dive into multilingual integration and how I ensured the entire system—from schema to tooltips—could work in English and Nepali interchangeably.
