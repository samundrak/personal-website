---
id: generic-type-aliases-in-type-script
title: Generic Type Aliases in TypeScript
tags: [typescript, generic]
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
---

- You can set generic in function by doing `Function <T> trigger(event: Event<T>){ return event.target; }` and here type of Event is type `Event<T> = { target: T }`
<!-- truncate -->
- Normally when we call this function we will invoke the function and provide the type it expects instead of T as it doesn’t have a default type which we can do by `<T extends {}>` or `<T = {}>` or both.
- Instead of passing it while invoking, we can call the function like this `trigger({ target: ‘blank’ })` and TypeScript will evaluate the value passed to target as it was expected to be T type. So, now TypeScript will go through all `T` and change it with `string` data type or anything you provide.
