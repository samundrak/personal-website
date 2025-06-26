---
id: use-effect-and-use-layout-effect
title: useEffect and useLayoutEffect
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [useeffect]
---

# useEffect and useLayoutEffect

## useEffect

- Runs on every update if no dependency array provided
  <!-- truncate -->
  ```
    // Will run on every update
    // basically afer render + paint(DOM mutation) is done
    React.useEffect(() => {})
  ```
- Runs once if empty array provided
  ```
    // Will run once after render + paint(DOM mutation) is done
    React.useEffect(() => {},[]);
  ```
- Runs every time dependency gets changed
  ```
  // Dependency will change
  // Render + paint is done
  // effect below will be called
   React.useEffect(() => {
       console.log(dependencyState + 1)
   },[dependencyState])
  ```

## useLayoutEffect

Runs synchronously after render is done but
before any paint(DOM mutation) is done

- Runs on every update if no dependency array provided
  ```
    // Will run on every update
    // basically afer render but before paint(DOM mutation) is done
    React.useLayoutEffect(() => {})
  ```
- Runs once if empty array provided
  ```
    // Will run once after render but before paint(DOM mutation) is done
    React.useEffect(() => {},[]);
  ```
- Runs every time dependency gets changed
  ```
  // when dependency gets changed
  //  it gets run after
  // render but before paint is done
   React.useEffect(() => {
       console.log(dependencyState + 1)
   },[dependencyState])
  ```

# Render is not Paint(DOM mutation)

Many time we get confuse with render and DOM mutation. We think when render is called some DOM mutation occurs, which is not true everytime. React calls render function every time when some props or internal states changes but react will only mutate DOM when it thinks the tree it got from
render and vdom is different.
