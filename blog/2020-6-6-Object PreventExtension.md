---
id: Object PreventExtension
title: Object PreventExtension
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: []
---

This methods helps us to prevent adding new properties
to the object. Though it will not throw error in normal
case but will throw error if it is used in 'use strict'.
Changing value of already added property is fine and it won't
throw any error.

<!-- truncate -->

```js
const object = {
  a: 1,
};
Object.preventExtensions(object);

console.log(object); // {a:1}
object.a = 2; // valid
object.b = 2; // invalid as it doesn't allow to add new properties
object.method = function () {}; // still invalid
console.log(object); // {a:2}
```

Using `preventExtension` for the object instansiated from class will still prevent the object from having new properties but new property can be added to the class and that can be access with
object which was used for `preventExtension`.

```js
class Test {
  constructor() {
    this.a = 2;
  }
}
const test1 = new Test();
console.log(test1); // { a: 2 }
Test.prototype.b = 3;
console.log(test1); // { a: 2 }, property b is added to proto
Object.preventExtensions(test1);

test1.c = 4; // invalid as it is locked for extension
console.log(test1.c); // undefined

Test.prototype.c = 4;
console.log(test1.c); // outputs 4, as it is accessed from proto
```
