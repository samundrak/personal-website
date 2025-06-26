---
id: sql-and-defination-of-ddl-dml-dcl-and-dil
title: SQL and defination of DDL, DML, DCL and DIL
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [database, ddl, dml, dcl]
---

The first version of SQL was developed by IBM called Sequel as part of the System R project. SQL stands for structured query language and is a combination of simple english words. SQL is used as a language to communicate with database. Same SQL code can run on multiple database albeit some database have slightly different syntax than others but still they have to maintain specification of SQL.

<!-- truncate -->

The SQL language has several parts:

- **DDL(Data Definition Language)**: It provides command for defining schemas with relation, removing relations or changing the relation schemas. For example DROP, ALTER, CREATE, DROP

- **DML(Data Manipulation Language)**: It provides the ability to query records from the database also to insert tuples into, delete tuples from and change tuples in database Ex: UPDATE, DELETE, INSERT

- **DCL(Data Control Language)**: DCL allows us to define new roles or update roles which let user to access database. Ex GRANT, REVOKE.

- **DRL(Data Retrieval Language)**: It allows us to fetch records from table.EX: SELECT

- **DIL(Data Integrity Language)**: It includes commands to specifying integrity constraints that the data stored in the database must satisfy. Updates that violate integrity constraints are disallowed.
