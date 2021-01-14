---
id: proxy-design-pattern-in-short
title: Proxy design pattern in short
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: []
---

import useBaseUrl from "@docusaurus/useBaseUrl";

We can use the Proxy pattern whenever we want to control access to any third-party library or service which
can be resource-heavy or expensive. For example, if we are integrating an SMS service in our application
and sending every SMS can cost us a cent and there can be many chances where SMS content can be duplicated.
In such a context we can create a proxy pattern that controls twillo access and help us to dedupe messages.

<!-- truncate -->

## When to use

- Control access to anything that resources heavy.
- Access to 3rd party service which can cost us.
- (caching proxy) Any time we need to cache expensive things.
- (Protection proxy) Control what the client can do with any provided services or library.
- Virtual Proxy(Lazy initialization) When we have to initialize any
  resource-heavy object that wastes system resources by being always up can be instantiated when needed instead of instancing it in bootstrap
- Local execution of a remote service (remote proxy). This is
  when the service object is located on a remote server.
  In this case, the proxy passes the client request over the net-
  work, handling all of the nasty details of working with the
  network.
- Logging access (Loggin Proxy). This can be done when we want to log access to service that is behind proxy.

## UML Class Diagram

<img
alt="System design of notification architecture"
src={useBaseUrl("images/dp-proxy.png")}
/>

_Source: Dive into design patterns_
