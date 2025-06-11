---
title: Handling Affiliate Cookies and Internationalized Routing in Next.js Middleware
slug: nextjs-affiliate-cookie-i18n-routing
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [nextjs, middleware, i18n, cookies, affiliate]
sidebar_position: 1
---

When building complex Next.js applications, middleware becomes an essential place to handle cross-cutting concerns such as authentication, localization, and tracking. One common challenge is setting cookies conditionally while ensuring that the middleware returns the correct routing response—especially when dealing with internationalized routing (i18n).

In this article, I’ll walk you through a practical example where we:

- Set an affiliate tracking cookie based on the request referer
- Use `next-i18n-router` middleware to route users based on locale
- Avoid common pitfalls that cause 404s or missing cookies
<!-- truncate -->
---

## The Scenario

Suppose you want to:

1. Track incoming users from affiliate URLs by setting an `affiliate` cookie based on the referer header.
2. Serve localized content by detecting the user's locale and routing them accordingly.
3. Ensure the middleware works correctly in both development and production, including optional Basic Authentication in dev.

---

## The Common Mistake

A naïve implementation might try to set the cookie by returning a new `NextResponse` immediately when the cookie is not present:

```ts
function handleAffiliate(request: NextRequest, url: URL): NextResponse | null {
  const referer = request.headers.get("referer");
  if (!referer) return null;

  const existing = request.cookies.get("affiliate")?.value;

  if (!existing) {
    const response = NextResponse.next();
    response.cookies.set("affiliate", referer, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response; // Returns a new response immediately
  }

  return null;
}
````

Then in your middleware:

```ts
const affiliateResponse = handleAffiliate(request, url);
if (affiliateResponse) return affiliateResponse; // early return!
```

This causes a problem: **the response that sets the cookie is returned early, skipping the routing logic** (`i18nRouter`). As a result, users may get a 404 or no locale-aware response, and the app behaves inconsistently.

---

## The Correct Approach

Instead of returning a new response early, you want to:

* Run the router first and obtain the routing response
* Mutate the routing response to add the cookie if needed
* Return the modified response

Here's a fixed implementation:

```ts
function handleAffiliate(request: NextRequest, url: URL, response: NextResponse): void {
  const referer = request.headers.get("referer");
  if (!referer) return;

  const existing = request.cookies.get("affiliate")?.value;

  if (!existing) {
    response.cookies.set("affiliate", referer, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }
}
```

And in the middleware:

```ts
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl.clone();

  // Other middleware logic here...

  // Call the i18n router first
  const response = i18nRouter(request, {
    locales,
    defaultLocale: fallbackLng,
  }) as NextResponse;

  // Then set affiliate cookie on the same response
  handleAffiliate(request, url, response);

  return response;
}
```

---

## Why This Works

* **Single response flow:** The router decides the actual route and response status.
* **Cookie mutation after routing:** Cookies are added to the same response that will be returned, so no routing or rendering steps are skipped.
* **Avoids premature return:** Middleware only returns once, after all processing is done.

---

## Additional Tips

* Use `NextResponse.next()` when you want to continue the middleware chain or mutate the response.
* Be careful with early returns in middleware—they can prevent important logic from running.
* Always test cookies in development with tools like `curl` using `--cookie-jar` and `--cookie` flags to confirm cookies are set and sent properly.
* Use `event.waitUntil` to flush logs or run async side effects without blocking the response.

---

## Conclusion

Next.js middleware is powerful but requires careful response management when mixing tasks like cookie handling and i18n routing. By ensuring you modify the routing response rather than returning a separate one, you maintain seamless user experience with correct locale routing and affiliate tracking cookies set reliably.

 

 
