---
id: create-blob-and-file-from-data-uri
title: Create blob and file from data uri
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: []
---

Creating a file in client side (browser) is something we may have to do frequently. Every time I have to work with it I try to google
and always end up with the long solution. After digging and doing some research I found this clean way to create file and blob from data uri.

<!-- truncate  -->

```js
const url =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

// Will create a blob from data uri
const blob = await fetch(url).then((r) => r.blob());

// Now we create a file using that blob where we can give name to that blob.
// File extends blob internally.
const file = new File([blob], "example.png");
```
