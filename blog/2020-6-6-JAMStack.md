---
id: JAMStack
title: JAMStack
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [jamstack, reactjs, gatsby]
---

Recently I was learning and exploring more about JAMStack and I found it quite interesting at same time i also feel that it may not work as expected or as it is being endorsed.

#### J - JavaScript which we add for interactivity

#### A - API's which we use in our application that can be like comment section from Disqus, Search from algolia , Payment from stripe and mail from Mailchimp.

#### M- Markup, which means HTML, Markdown

<!--truncate-->

```
These things makes JAMStack.
```

JAMStack is a stack which consists of JavaScript, API and Markup which means we will make modern application using these three tools/techs or language.
Apart from JavaScript we don't have specific recommendation for API and Markup section. We can use any API services and Markup (markdown, xml, html) but the language that is fixed is JS.

In other common stacks we previously used like MERN, MEAN, XAMP we have a specific technology and language to use but in JAMStack the choice is ours.
That's quite good flexibility we can have when we adopt or implement JAMStack.

First of all JAMStack is not controlled by any one or organization. It is just a architectural pattern or practice which got a name. Developers from different community came up with an idea to give it a name like from SPA, Static site generator, build tools, and Faas.

Here we don't have an actual back-end server which will serve out HTML file or which will dynamically create HTML file as per request. We will be creating a plain HTML file which can be generated using static site generator like Hugo, Gatsby to name some. These type static site generator supports template, assets handling like images, fonts , css etc. Some static site generator supports assets handling on their own and some static site generator use other bundling tool like webpack, parcel etc. Static site generator are smart enough to build only necessary files. After generating static sites those file will be uploaded to CDN like netlify, cloudflare etc which will actually serve our html files.

A simple JAMStack implemented app will look like.
When we visit application the landing or user facing markup will be served us by CDN which also can be understood as pre baked markup because all the necessary data and details are already rendered while generating or building the site. As per requirement Javascript will do some client side hydration which means JS will fill some dynamic content which will be later fetched from API and finally comment section, mail subscription other API section will be integrated or loaded in website.

The benefit of JAMStack is mostly for frontend developer who don't want to do backend stuff or don't know backend stuff. Like if I have plan to make an application then i have to buy a VPS, setup a server by installing nginx(apache), install database like mysql,mongodb, install ruby/node/php and then i have to handle things like database connection, load balancing(when my app is big hit then our single app will be in difficult so we had to make multiple instance of our app so that it can server all users) and other many things. The cost of time, additional developer is not worth always so we will just leave those things to other and can focus solely only on our application.

For example if my application is of "car rental service" and my main business to allow user rent a car and here i have to create, maintain and fix subscription because there is some problem which can always affect my business and service so here i will just outsource that particular thing to other service like stripe, braintree who provides simple API for me to authorization and authentication. similarly for authentication i can auth0, for commenting feature i can use disqus and many other services.

we can also have massive performance improvement because we are serving our asset through CDN and CDNs normally have data center across the globe and it will be served from nearby center. All the asset caching, invalidation and updates will be done by our CDN and CDN have less downtime records which means less SPOF.
In legacy application a request goes through multiple layers like validation, database connection, some File I/O and imagine if application is getting 1million traffic then that application is fetching same records 1million per day which is quite redundant instead we fetch a records one time, build a static file and send it to CDN.

The benefit seems good but there is still some negative sides or some gaps when using JAMStack like

- Vendor lock in
- We can't control infrastructure
- 3rd party service we use can go down
- there can be many files to be built when generating static site which may cause some delay in deployment and user can see old data for some time.
