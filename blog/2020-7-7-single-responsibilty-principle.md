---
id: Single Responsibilty Principle
title: Single Responsibilty Principle
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [solid, srp, single, responsibility]
---

# SOLID Principle

What is a SOLID principle? It was a common question asked in an interview when I applied
for a PHP developer. This term is seen a lot in the PHP universe and JAVA too. If we search
it on youtube then we will find that most of those videos are hosted by uncle Bob martin. The SOLID principle is a set of principles. As our codebase grows in size it can be messy, unorganized, fragile, etc. There is no proven method to make our project stable because software development is an iterative process. Things today we write can be changed tomorrow, the module we create today can no longer be fit in our codebase. That doesn’t mean we should not care about our codebase. We can apply some principle which can help us to do less refactor, fewer code changes, less dependency or organized dependency, etc.
SOLID is made up of 5 principles which are mentioned below:

S - Single Responsibility principle
O - Open/Closed principle
L - Liskov substitution principle
I - Interface segregation principle
D - Dependency inversion principle

# Single Responsibility Principle

SRP or Single Responsibility principle is part of the SOLID principle which guides us not to add unnecessary things in a single module or class. To understand it better we can say a class/module should have only one reason to change. We should avoid adding unnecessary methods in a class/module which can result in necessary changes.

We follow this principle mostly to avoid adding unnecessary or unrelated methods in a class. For example, there is a `class A {}` whose primary purpose is to download a file from the provided URL but a developer adds a method that sends emails to the user in the same class. This can be a problem because now we need to maintain this class for multiple purposes and if some developers do some changes in this class then it can break other things which normally
will be ignored if there is no test and can break production.

# Symptoms of violation of SRP

- Duplication
  If we don't follow SRP well then you will now write methods everywhere without thinking about if it existed somewhere. There can be multiple implementations of database interaction in a single project because none of you bothered to check if it existed nor you thought about having a dedicated module to do this particular thing. This will lead to duplication in our codebase and if you are working in frontend application then this can actually have some impact of file size too.

* Merges
  This can be a big headache when we use some version control and one of my colleagues do some changes in a method of the same class that I am working on. Now, we both are in confusion about what to commit in source control because we are unknown about the changes that we did. This can be a serious problem when a team will have many developers.

# Solution and alternatives

- Create a dedicated class which will have only responsibility and one reason to change
- Try to avoid adding methods which don't fit with the domain of class
- Extract those unfit methods to other class/module or create one which suits its domain
- If there are too many classes to create instance then we can go with `Facade` pattern which
  normally hides the complex things and provides a simple interface to the user.
