---
id: entity-and-attributes-in-dbms
title: Entity and attributes in DBMS
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: []
---

import useBaseUrl from "@docusaurus/useBaseUrl";

An Entity in DBMS refers to the data which can be real objects or virtual things. An entity contains multiple attributes to describe themselves. Normally in DBMS table contains a set of entities and can have relations with other entities in other sets.

<!-- truncate -->

# Attributes

Attribute helps us identify an entity or describe the entity. Like an entity person can have personId attribute as identification and can have other properties like name, sex to describe the person more.

## Type of Attributes

- **Simple Attribute**:
  This is a simple atomic attribute that can’t be divided further. For example a phone number.
- **Composite Attribute**:
  The composite attributes are made up of more than one attribute. For example, the name can be a composition of first_name and last_name
- **Multi-valued attribute**:
  This type of attribute can contain more than one value like email_address. A user can have multiple emails
- **Single Value Attribute**:
  It contains only a single value like an SSN number.

# RelationShip

Relationship in DBMS means one entity having some kind of relationship with the entity of other sets and that can have a relation of a different type.

**One to One**
An Entity can have only one related entity on other sets. In the example provided below then you can see that an entity having only one relation.

<img
alt="One to One relationship"
src={useBaseUrl("images/one-to-one.png")}
/>

**One to Many**
An Entity can have a relation with multiple entities on other sets. In the image below you can see that an entity of set A is having multiple relations on set B but the entity of set B has relation only with one entity on set A.
<img
alt="One to Many relationship"
src={useBaseUrl("images/one-to-many.png")}
/>

**Many to Many**
One entity from set A can be associated with more than one entity on set B and vice versa.

**Many to one**
One entity from set A can have at most one association on set B however set B can have any amount of association with set A.
<img
alt="Many to Many relationship"
src={useBaseUrl("images/many-to-one.png")}
/>
