---
id: Monorepo experience
title: Monorepo experience
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [monorepo, package]
---

Monorepo is a repository pattern where we manage multiple packages in a single repository. Normally what we do is create a separate repository for each package and maintain all those packages by tracking their version and release. In Monorepo we put all of our packages in a single repository.

<!--truncate-->

## Why Monorepo

As mentioned above, as our project and packages grow we will be in a situation where it will be very hard to maintain every package manually. For example, we have 2 packages named `pkgA` and `pkgB` and pckgA depends on pkgB and it can be vice versa. Here if we need some modification to pkgB then we need to switch to a different repository and do some `npm link` to create dependency and link it. After we are done with changes now we have to release both packages, maintain version, maintain release, generate changelogs, and whatnot. So, to mitigate this we just add all the packages in a single repository and let the tool handle it which I will write below.

## Tool for Monorepo

As of now the perfect tool for working with Monorepo pattern is `lerna` which is used by many open-source projects like `babel`, `react` etc.

## Lerna

Lerna is a tool that helps us to manage multiple packages in a single repository. `lerna` provides us some helpful commands to bootstrap project which links, installs dependencies, maintains version, and helps to generate changelog and release/publish it in npm or any package registry of your choice.

## Getting started with Lerna

- We can install Lerna by using the following command
  `npm i -g lerna` (Assuming npm/node are already installed).

- create a Lerna managed mono repository by entering `lerna init` and answer questions asked.

- Create new lerna managed package `lerna create pkgA`. It will create a new package and install inside `packages/` folder. This command will ask you some questions which are normally asked when you do `npm init`. You can create multiple packages.
- If your `pkgA` depends on `pkgB` then you can enter `lerna add pkgA --scope='pkgB'`. Here scope option helps us to execute our Lerna command on a defined package. So, in package `pkgB`, `pkgA` will be added as a dependency and to link them enter `lerna bootstrap`.
- `lerna bootstrap` will install other defined packages in `package.json` of the respective package and if the package is locally available then it will just link them.
- `lerna clean` will remove dependency(node_modules) from all packages. Remember we can use `--scope` option to execute that command only in a scoped package.
- `lerna run [npm script]` will run script defined in `package.json's` scripts on every package and `---scope` is also available.
- `lerna exec 'rm -rf ./` will run an arbitrary command on every package.
- `lerna version` will bump version from the last release,
  if you follow `conventional-commit` then it will read the commit and determine release type.
  for example: if my commit contains `fix: remove typo` then it will do minor version bump, It follows semantic release pattern.
- If we have multiple packages and if we are doing changes only in a single package then Lerna is smart enough to make version bump for that only changed package.
- Finally, We are ready to release our package by `lerna publish` to do a normal release and it also supports dist tags like `next`, `experimental`, and `latest`. By support I mean it is normally handled by the developer. Do enter `lerna publish --help` to know the things it can do.
