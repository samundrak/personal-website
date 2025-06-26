---
id: constraints-metadata-data-dictionary-and-keys-in-dbms
title: Constraints, Metadata, Data Dictionary and keys in DBMS
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [database]
---

**Constraints**: Constraints are rules which are imposed on columns or table. Constraints allows only data that meets requirement to be entered. It can be applied on both column and table.

<!-- truncate -->

**Metadata**: The data about data is known as Metadata. It holds the information about the data in the database and is available for query and manipulation as other data in the database.

**Data dictionary**: It is a file or set of files which contains metadata of databases. It contains the information of other object in database like ownership of data, relationship with other objects and other similar information it is crucial component of relational database.

### Keys

1.  **Primary key**: It is used to denote a candidate key which is used to identify tuples within a relation and is unique.
2.  **Foreign key**: we use foreign key to link a table with another table and allows repeating. A foreign key in an entity means it has relation with some other entity which can used to fetch records when joining or cascade delete, updates in table that has relation.

3.  **Unique**: Unique key are used when we will have value which will be unique on every record which is stored in the same table. A unique can’t be repeated multiple times and is used to identify record by its unique value.

4.  **Not null**: A not null value means that we are assured that it won’t have any null value and records can be pulled without having to worry of if data exist or not.
