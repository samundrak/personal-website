---
id: NaNfusion
title: Number([undefined]) -> 0, Number([undefined,undefined]) -> NaN
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [javascript, undefined, NaN]
---

`Number([undefined])` is `0` because JS engine will coerce it which means
there will be some abstract operations inside engine and what it does is , it will call `toPrimitive(hint)`, here argument `hint` means what will be the expected type or what the value should be coerced to.
In JS if we try to stringify empty array then it will return empty array removing the brackets and if an array has value undefined/null then it will still return an empty string and if we try to convert empty string to number then we will get `0` as output.

<!-- truncate -->

so here what goes in underhood

```js
const arr = [undefined];
// will be now '' and empty string will go to Number('') and we will get 0
```

when we call `toPrimitive` and if the hint is `number` then first it will call `valueOf` and then `toString` and if the hint is `string` then first `toString` will be called and then `valueOf`.

`Number([undefined,undefined])` is `0` because `[undefined, undefined]` will be `','` when we coerce it to string and it is not an empty string so we will see `NaN` and we will see NaN whenever we try to do any mathmetical operation with non string thing.

`NaN` is an invalid number which will return `number` when we do `typeof` because it is a number but invalid.
