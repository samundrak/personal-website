---
id: notification-service-architecture
title: Notification Service Architecture
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: []
---

import useBaseUrl from "@docusaurus/useBaseUrl";

A system which notifies the user when some event occurs. Users will be notified about the activity or event generated from different parts of our application, for example, birthday notification, quote received, lead generated, etc. The system can notify users using a different medium like email, push notification, SMS(mobile), WhatsApp.

<!-- truncate -->

Notification helps us to increase engagement in our application. Most of the time users may not have a habit of logging into our system but by sending notification we try to get their attention and pull them into our application by making them feel something is happening and attention is needed.

While generating notification we also need to consider the destination like are we sending this email to some other person who is not currently in our system.

## Functional Requirements

- **User Preferences**
  - Some users may wish not to receive notification in email or SMS so that before sending notification we should consider this too.
- **Pluggable**
  - Should be developed in such a way that notification can be generated from any service or module and implementing it should be easy and simple so that in the future we can easily toggle things to send or not. We should have such a contract that in the future there should be a simple way to add or remove the notification delivery medium. For example, if we support the only Email and Push notification and in the future, if needed we should be able to integrate SMS easily without touching notification generation and dispatcher part.
- **Cancellable Notification**
  - Any notification should be cancellable at any time. There can be scenario like a system generates notification because quote is received but before that user already has deleted that quote which means that quote will no longer valid and also the notification related to that deleted quote, so if notification is not dispatched from our server then it should be cancellable at any time.
- **Dedupe Notification**
  - Users should not receive the same notification twice.
- **Prioritization**
  - Every notification should have some weight by which we can set its priority.
  - If some notification has high priority then we can alert users by using all mediums.
  - If some notification is basic like a birthday reminder then that can be done with low priority.
- **Logging**
  - Logs every notification sent.
  - Logs and unsuccessful job/task
  - Should be able to see the logs in real-time when the application is in the product.
  - Should be able to find the detail of any events on demand.

## Non Functional Requirements

### Decoupled

- Should not touch other services or should not break other services.
- Should follow SOLID principles
- Follow Sidecar Pattern.

### Highly Available

- This service should be up and should be sending/receiving data anytime in the day and should be responsive at any given time. Survives hardware failure/network failure and no single point of failure.

### Scalable

- Supports a large number of publishers, subscribers, and topics. Should be able to auto-scale or balance the load if the usage of some service is maximum.

### Fault tolerance/Resilience

- Handling of Exceptions and edge casing
- Has traits of Highly Availability
- Should survive any component failure or service failure.
- If a notification fails to reach user due to service, network failure then our service should able to send that notification again after some delay. It should keep trying sending the notification until it becomes relevant.

### Durable

- Should be able to retry failed job/task.
- Each subscriber should receive a message once
- No duplication notification
- Messages should not be lost

## System Design

This section contains about how our notification service system should look like and what are components needs to be created. Components can be extracted to its own service or can work side by side with other components. Each microservice normally consist its own database but that can be too much when load is not much in the service. We can add kafka/queue where necessary if we think there can be delay in processing data. Most of the time we should be able to decide and choose right storage to make our service more smooth. For example in some case we may have to go with in memory database for faster data retrieval and some time we may have to end up with file based storage if data has relations and needs long time persistence.

Please go through the image below to understand more about what our notification service system should look like. We can add remove components after more discussion but this help us to our mental model clear. Services are described below images with their respective job.

Each service or component will have their own proper flow and requirements which can be created by developer themself. Some of the service can have complex logic and may need diagrams like use case, sequence, data flow diagram to describe or document their flow.

Sending notification via push notification or rate limiting can have complex algorithms to accomplish their and will need proper documentation.

<img
alt="System design of notification architecture"
src={useBaseUrl("images/flow.png")}
/>

_Figure 1. System design of Notification service_

### Services

#### Notification Service

- This will be the service from where notification will start its journey. Any module or service will call this service and it will receive the notification and will be forwarded to respective service which this service will not aware of. Its only job is to receive message from any service and do any initial tasks like adding metadata, user transaction information and forward it.

#### Bulk Notification handler

- This will be executed from super admin whenever we want to dispatch bulk notification. Normally it will be like of massive discount, sales and in our context it can be announcements or news. Should be able to dispatch message to selected people or for all.

#### Notification Verification, validation and prioritize

- This will be the place where the received notification will be verified like checking if notification is still relevant. Validation things like if the notification has metadata about its destination and source. Notification will also be labeled its priority here.

#### Notification handlers &amp; preferences

- Decides if user is available, if user has opted in mail notification or any other kind. For example if a notification is supposed to be delivered to a user and user has selected not to get notification in an email but only in mobile then at that time we have to send notification to only allowed mediums.

#### Rate Limiter

- Controls the flow of notification and if needed will limit the notification flow as per necessity to handle and balance load of notification.

#### Notification Dispatcher

- Will dispatch notification to respective mediums like mobile, email etc.

#### Notification Tracker

- Tracks dispatched notification, will log data of if notification is delivered, received, opened or seen. It will track information like, time of notification dispatched, delivered, opened and clicked.

### Design patterns to keep in mind

- Observable
- Strategy
- Template
- Builder/Factory

### Tools/Stacks to keep in mind

- Redis (Queue/Jobs/Rate limiting)
- Kafka (same as Redis + streaming + higher throughput)
- Docker (containerization)
- Kubernetes( container orchestration)

## Notification delivery medium

### Mobile SMS

If a notification is urgent or needs attention then we can send a message on their mobile. There will be a character limit in this type of notification or alert.

| **PRO**                                                                        | **CONS**                                                |
| ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| If the user is near to mobile then there is a high chance user seeing the SMS. | Will be costly as 3rd party service normally charge SMS |
|                                                                                | Can deliver late if mobile is off                       |

### Push Notification

Browsers/Mobiles display messages to users even when the user is not actively using our system or not opening our app. Some process continuously runs in the background and we can push a message to let the user know about some events. Users can choose not to allow this feature and for this we will be asking for explicit permission from the user which most of the time is blocked if asked in the wrong manner or the browser and mobile OS can mark as spam.

<img
alt="Browser asking permission for push notification"
src={useBaseUrl("images/fb.png")}
/>

_Figure 2. Browser asking permission for push notification._

<img
alt=" Notification displayed in mobile via push notification"
src={useBaseUrl("images/mobile.png")}
/>

_Figure 3: Notification displayed in mobile via push notification._

| **PRO**                                                               | **CONS**                                                                                                                                       |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Users will be notified even when they are not actively using our app. | If the user doesn&#39;t give permission for notifying then there will be very little chance of a user enabling it again.                       |
| Works on both mobile and web(PWA).                                    | The browser can stop the background process if the user machine is having some memory limitation and there can be some delay while delivering. |

### In-App Notification

This medium is basically will be in control of our system but we can&#39;t rely totally on this method of notifying user because can be offline and they have to log in to our system to see the notification. This is the same as what we see on Facebook. Whenever we go to Facebook there is an indication with count to show us a notification and whenever something is happening when we are using the application then Facebook shows a notification on the left bottom.

<img
alt=" Notification displayed in mobile via push notification"
src={useBaseUrl("images/in-app.png")}
/>

_Figure 2. Facebook&#39;s in-app notification indicator_

| **PRO**                                                              | **CONS**                                                                                            |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| This gives a more instant and real-time feeling.                     | Only available when users are in our app.                                                           |
| Users will be notified when they are in any part of our application. | Not useful when some important event occurs and the user is not active in our application for days. |

### Email

In this medium, an email will be sent to the receiver which they used to login to our system or any other secondary email that the user entered. Sending mail to a secondary email address should be optional and based on user preference. Emails are not treated instant and because of that mindset, users can act with less urgency until we add some unique subject.

| **PRO**                     | **CONS**                                                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cheap and Easy to implement | If the email is not users&#39; primary email then there will be less chance of user checking email frequently due to which it may go unnoticed for longer time. |

### Social Media (WhatsApp, Messenger)

### Interactive voice response (IVR)

## Notification delivery group

It is group which contains one or more than delivery medium. Whenever dispatching a notification we will dispatch notification to delivery group and it will dispatch to all delivery mediums that are in the group. The group name and mediums show in image is just an idea about it should be and we can change it as per necessity. To clarify more if we dispatch notification to N_BASIC group then the notification will be delivered to email and push notification only.

<img
alt=" Notification displayed in mobile via push notification"
src={useBaseUrl("images/delivery-mediums.png")}
/>

_Figure 5. Notification delivery mediums group_

##

## Priority

Setting priority of notification means how fast it should be delivered to user. If a notification is urgent doesn&#39;t necessarily means it should be delivered in mobile but it can basically means that it should be delivered with highest priority and should be dispatch within 1 min after notification generation. There can be instance like a notification can be with low priority but still will be delivered to mobile despite being low priority. It is basically requirement and how we define and divide the notification.

Some of the notification priority that are identified by now are:

- URGENT
  - This type of notification should be picked as soon as it is generated dispatch immediately
- IMPORTANT
- HIGH
- MEDIUM
- LOW

## References and Resources

Notification System Architecture, [https://www.youtube.com/watch?v=\_63IA-Ly0gY](https://www.youtube.com/watch?v=_63IA-Ly0gY)

System Design Interview - Notification Service, [https://www.youtube.com/watch?v=bBTPZ9NdSk8](https://www.youtube.com/watch?v=bBTPZ9NdSk8)

Notification Service System Design Interview Question to handle Billions of users &amp; Notifications,

[https://www.youtube.com/watch?v=CUwt9_l0DOg](https://www.youtube.com/watch?v=CUwt9_l0DOg)

[http://www.opengroup.org/soa/source-book/soa_refarch/p7.htm](http://www.opengroup.org/soa/source-book/soa_refarch/p7.htm)

[https://dzone.com/articles/sidecar-design-pattern-in-your-microservices-ecosy-1](https://dzone.com/articles/sidecar-design-pattern-in-your-microservices-ecosy-1)

[https://simpleprogrammer.com/understanding-the-vertical-slice/](https://simpleprogrammer.com/understanding-the-vertical-slice/)

[https://almanac.io/articles/803/guide-how-to-design-a-notification-system](https://almanac.io/articles/803/guide-how-to-design-a-notification-system)

https://softwareengineering.stackexchange.com/questions/177973/how-to-design-a-scalable-notification-system

[https://medium.com/swlh/architecting-a-scalable-notification-service-778c6fb3ac28](https://medium.com/swlh/architecting-a-scalable-notification-service-778c6fb3ac28)

[https://medium.com/quora-design/notification-system-design-99-40d70c9da028](https://medium.com/quora-design/notification-system-design-99-40d70c9da028)

https://www.youtube.com/watch?v=FU4WlwfS3G0

[More On JavaScript](https://www.toptal.com/javascript)
