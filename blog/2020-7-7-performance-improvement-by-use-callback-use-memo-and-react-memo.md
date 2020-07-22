---
id: performance-improvement-by-use-callback-use-memo-and-react-memo
title: Performance Improvement by useCallback, useMemo and React.memo
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [react, performance, usecallback, usememo, memo]
---

React is fast on its own, It does a lot of work to make our web app more fast and smooth
and on top of that today's browser engine is doing a perfect job to optimize the code we throw
to them. v8 has TurboFan which does some next level of optimization. These are the things that are done for us by someone else but there is still a lot of things that we can do to improve our application. I will not write about web application performance and optimization process here because this note was specially written for optimizing React apps which uses hooks and I mentioned
other things because sometimes we do overengineer in the name of performance, which I think I do sometimes (Premature Optimization).

I use React hooks a lot and many times I get stuck thinking about how I can make it work faster, which hook can be useful here to store data, memoize data, etc.

<!-- truncate -->

## React.useCallback

When we have to pass a callback to some component then we can use `useCallback` hook. React will store function and will always return the same referenced function. If we pass dependency then React will update the function.

Callback without dependency

```
  const handleClick = React.useCallback(() => {
  }, []);
```

Sending empty array as the second argument means that it doesn't have any dependency and there is no need to create a new reference of function on every render. React will just store it and on every render if asked it will provide previously created function instead of creating new on every render.

Callback with dependency

```
const handleClick = React.useCallback((name:string) => {
    return `Welcome ${name}`
},[name]);
```

When we provide dependency to `useCallback` React will notice it and whenever there will be changes in dependency then React will create a new function and return it and will cache it again. Passing a variable in dependency array doesn't mean you will get that as an argument in the callback, It just hints React to remove old function which referenced to old dependency and create new function declaration.
`useCallback` caches function and not return value of the function. It is memoization to React but not for us.

## React.useMemo

`useMemo` can be confused with `React.memo` because of both having memo in common but they have their own feature and properties. Normally in the class-based component, we create many methods and those methods are invoked only when they are called
but if we use functional components and create a function inside it then they are created on every render which can cause performance issues. Most of the time React handles issues if remounting and rerendering but it still had to do invoke methods or
any calculation that are done inside a function like finding value in the array, calculating or aggregating data from an array.
We can avoid those calculations to be done again and again by using `useMemo` hook. This hook takes a function as the first parameter and dependency as the second parameter and whenever the value of dependency is changed then `useMemo` will recalculate or invoke its first parameter and return it. For string, number, and other primitive data it will be a value check but for the object it will be a reference check. If the object passed as a dependency has the same body schema but is from some other reference than passed before then `useMemo` will think that the value has been changed and will recalculate or reinvoke memoized stuff.

```
const allSum = React.useMemo((data) => {
  return data.reduce((acc, current) => acc += current,0)
},[data])
```

In the example given above, useMemo will invoke its first parameter only when referring to data is changed.

## React.Memo

`React.memo` is a helper function that React provides to the memoize component. Normally when we create a class-based component
we see `React.PureComponent` used in many places. What `React.PureComponent` does is, it just does a shallow comparison.
This means if props have a prop whose value is an object then `PureComponent` will not compare it and will do just reference check. If props are the same as props passed before then React will avoid doing rerendering. This is a class-based component and to achieve the same thing in the functional component we can use `React.memo`.
