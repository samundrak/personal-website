---
id: template-method-pattern
title: Template Method pattern
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [design-pattern, template-method]
---

import useBaseUrl from "@docusaurus/useBaseUrl";

In the Template method pattern, we break algorithms into small methods. There can be a scenario where data may need to be processed differently.

<!-- truncate -->

We may need to have some level of flexibility so that we can add new data processor in the future without any changes and in such
a scenario Template method pattern comes in handy. It helps us to abstract or default specific parts which can vary as per processor.
For example, Our app can read the file of any type like CSV, pdf, or doc but here data extract part can be different for each file, and after extraction of data, the remaining steps can be the same for the file because, in the end, it is just data. To abstract data extraction part
we can go with the Template method pattern.

Example

```
abstract class Main {

    mine() {
        // This method will go somewhere and find url
        const fileLink = this.resolveFile(url);

        // This method is abstract
        // and sub class must implement their own parsing logic
        const parsedData = this.parseData(fileLink);

        // After parsing of files we will extract birth information
        const extractedBorthday = this.extractBirthData(parsedData);
    }

    resolveUrl(url: string) {
     // ... implmentation
    }

    extractBirthData(data:string) {
     // ... implementation
    }
}

class MainA extends Main {
 pareData(link: string) {
    return link.split(' - ').join(',')
 }
}

const mainA = new MainA();
mainA.mine();
```

## UML Class Diagram

<img
alt="System design of notification architecture"
src={useBaseUrl("images/dp-template-method.png")}
/>

_Source: Dive into design patterns_
