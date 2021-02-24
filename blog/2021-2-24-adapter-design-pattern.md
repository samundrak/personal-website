---
id: adapter-design-pattern
title: Adapter Design Pattern
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [design-pattern, adapter-design-pattern]
---

The adapter pattern helps us to connect or communicate with two or more than two interfaces that are not compatible with each other.
In a simple word if we have to consume data from a source which our current implementation doesn't support then we can use this
pattern to communicate with incompatible sources.

<!-- truncate -->

## When to use

- Accessing data from incompatible sources or interfaces.
- Don't want to modify legacy code because of its dependency but need to use it anyhow.
- Scenario where you have to follow open/closed principle
- You could extend each subclass and put the missing function-
  ality into new child classes. However, you’ll need to duplicate the code across all of these new classes, which smells bad.
