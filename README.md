# mysql-qbuilder

[![npm](https://img.shields.io/npm/v/mysql-qbuilder.svg)]()
[![node](https://img.shields.io/node/v/mysql-qbuilder.svg)]()
[![Build Status](https://semaphoreapp.com/api/v1/projects/d4cca506-99be-44d2-b19e-176f36ec8cf1/128505/shields_badge.svg)](https://semaphoreapp.com/boennemann/badges)
[![npm](https://img.shields.io/npm/l/mysql-qbuilder.svg)]()
[![npm](https://img.shields.io/npm/dm/mysql-qbuilder.svg)]()
[![npm](https://img.shields.io/npm/dt/mysql-qbuilder.svg)]()

SQL Query builder working with NodeJS
```
npm install mysql-qbuilder --save --save-exat
```

To add this npm package to your local machine, type the above into your command line. You will notice a node_modules directory appear in your root where the package is now installed.

## Introduction
---
mysql-qbuilder is NodeJS module provides a convenient, fluent interface to creating and running database queries.
It can be used to perform most database operations in your application.

mysql-qbuilder query builder uses mysql module to protect your application against SQL injection attacks.
There is no need to clean strings being passed as bindings.

## What You get from that module
All common cases to use the `sql query clauses`
---
* `SELECT`
* * `SELECT ADD`
* `INSERT`
* `DELETE`
* `UPDATE`
* `ORDER BY`
* `GROUP BY`
* `OFFSET`
* `LIMIT`
* `WHERE`
* * `WHERE AND`
* * `WHERE OR`
* * `WHERE COLUMN`
* * `WHERE DATE`
* * `WHERE NOT IN`
* * `WHERE IN`
* * `WHERE BETWEEN`
* * `WHERE NOT BETWEEN`
* * `WHERE NULL`
* * `WHERE NOT NULL`
* * `WHERE AND OR`
* `JOIN`
* `FROM`
* `TABLE`


## How to use

### Require the module
```JavaScript
const qBuilder = require('mysql-qbuilder')
```


### Set the parameters for mysql connection
```JavaScript
qBuilder.setOptions({
 hostname: 'hostName',
 username: 'userName',
 password: 'passWord',
 database: 'databaseName'
})
```

### Then connecto to database
```JavaScript
qBuilder.connectToDatabase()
```


### Start to make query
```JavaScript
qBuilder.makeQuery()
```

## Select `select()` `addSelect()`

Some times You don't want to select all columns from database
Then You need to enter just the columns.
If You want just write *

```JavaScript
  qBuilder.makeQuery().select('id, title, count')
  qBuilder.makeQuery().select(['id', 'title', 'count'])
  qBuilder.makeQuery().select('*')
```

If You forget some column then You can add that columns with addSelect function
If You forget some column then You can add that columns with addSelect function

```JavaScript
  qBuilder.makeQuery()
    .select('id, title, count') // Oops I forgot the name column
    .addSelect('name') // Alright I added now
    .from('tableName') // set Database table
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
    })
```


## Insert `add()`

Many times You don't want to get the data from database. Just want to add new record

```JavaScript
  qBuilder.makeQuery()
    .table('tableName')
    .add(['count', 'title', 'name']) // set the column name on database
  qBuilder.prepare()
    .setParameters([5, 'SomeTitle', 'SomeName']) // set the values of new record
    .execute() // Save the new record on database
```


## From, Table `from()` `table()`

The from and table method is just set the table of query

```JavaScript
  qBuilder.makeQuery()
    .select('id, title, count') // Oops I forgot the name column
    .from('tableName') // set Database table
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
    })
```


## DELETE `delete()`

The query builder may also be used to delete records from the table used delete function

```JavaScript
  qBuilder.makeQuery()
    .table('tableName')
    .delete()
    .where('id', '=', 10)
  qBuilder.prepare().execute()
```

## UPDATE `update()`

Some times You don't want to select or add new columns or delete
Some times is need just update the existing record in database. This is possible with update function

```JavaScript
  qBuilder.makeQuery()
    .table('tableName')
    .update(['title', 'count', 'name'])
    .where('id', '=')
  qBuilder.prepare()
    .setParameters(['newTitle', 25, 'newName'], 10) // The last parameter is for where clause
    .execute()  
```

## JOIN `join()`

With Join is possible to get from database record from two tables with one query.

```JavaScript
  qBuilder.makeQuery()
    .select('tableName.title, anotherTable.name')
    .from('tableName') // set Database table
    .join('anotherTable', 'tableName.anotherTableId = anotherTable.id', 'Inner')
    .where('tableName.id' '>' 2)
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
    })
```


## ORDER BY `orderBy()`
Is A method which You can order by some column


## GROUP BY `groupBy()`
Is A method which You can group by some column


## LIMIT `take()`
Is A method which You can get only few records from database


## OFFSET `skip()`
Is A method which You can skip first few records from database


## WHERE `where()`

You may use the where method on a query builder instance to add where clauses to the query
The first argument is column name
The second argument is operator which You used (by default is =)
The third argument is the value of column name on database

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .where('id', '=', 10)
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `andWhere()`

Add another state and tell of the query to be both equal to true
```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .where('id', '=', 10)
    .andWhere('name', '=', 'Simon')
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `orWhere()`

Add another state and tell of the query to be first or second or both equal to true
```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .where('id', '=', 10)
    .orWhere('name', '=', 'Simon')
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `andOrWhere()`

The andOrWhere function is can used if You want first where which You call to be true
and add another where which tell or to be first or second operator
Like example is tell give me every record with name Simon and Id to be > or < of 35

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .where('name', '=', 'Simon')
    .andOrWhere('id', '>', '<' 35)
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereNull()`
Get all records which the column is null

### `whereNotNull()`
Get all records which the column is not null

### `whereBetween()`

Get all records which the column is between two values

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereBetween('id', [22, 300]) // Get all records between 22 and 300
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereNotBetween()`

Get all records which the column is not between two values

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotBetween('id', [22, 300]) // Get all records which is not between 22 and 300
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereIn`

Get all records which the column value is equal to some parameters which is set

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereIn('id', [2, 4, 6, 3, 8]) // Get all records with id 2, 3, 4, 6, 8
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereNotIn`

Get all records which the column value is not equal to some parameters which is set

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotIn('id', [2, 4, 6, 3, 8]) // Get all records which the id is not 2, 3, 4, 6, 8
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereColumn`

Get all records which the first column and second column has same values on database

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereColumn('title', 'name', '=') // Get all records which the title and name is same
  qBuilder.prepare().getResult((err, data) => {

  })
```

## Used one of that functions for create sql query
```JavaScript

  // Select few columns used String or Array
  .select('id, title, someDiff')


  // Add few more columns used String or Array IS REQUIRED TO USED SELECT BEFORE USED ADDSELECT
  .addSelect(['count', 'name'])


  // INSERT clause enter the columns which You set the values on new record
  .add(['title', 'count', 'name'])


  // Create from clause where you can used if you used select clause
  .from('tableName')


  // Set the table which You used for that query
  .table('tableName')


  // delete some record from database IS REQUIRED TO USED FROM OR TABLE BEFORE USED DELETE
  .delete()


  // UPDATE that columns on the record
  .update(['title', 'count', 'name'])


  // The last parameter is optional Make join between two tables
  .join('roles', 'roles.id = users.roleId' 'INNER')


  // Get first 500 records from database
  .take(500)


  // Skip first 500 records from database
  // The OFFSET is working together with LIMIT so first used take function!
  .skip(500)


  // Order by count column and set to be DESC (if is false then is not used DESC)
  .orderBy('count', true)


  // Group by count column and don't set to be DESC
  .groupBy('count', false)


  // Find all records which id column is bigger from 5 second and third parameters are optional
  .where('id', '>', 5)


  // Find all records which and id is equal to some parameter IS REQUIRED TO USED WHERE BEFORE USED ANDWHERE
  .andWhere('id')


  // find all records which is by first where or count is equal to 10 IS REQUIRED TO USED WHERE BEFORE USED ANDWHERE
  .orWhere('count', '=', 10)


  // Find all records which and count bigger from 10 or smaller from 30
  .andOrWhere('count', '>', '<', [10, 30])


  // Find all records which title is null
  .whereNull('title')


  // Find all records which title is not null
  .whreNotNull('title')


  // Find all records which the column 'count' is between 10 and 30
  .whereBetween('count', [10, 30])


  // Find all records which the column 'count' is not between 10 and 30
  .whereNotBetween('count', [10, 30])


  // Find all records which is have value like one of the array elements
  .whereIn('count', [5, 10, 15, 20, 25])


  // Find all records which is NOT have value like one of the array elements
  .whereNotIn('title', ['first', 'second', 'third', 'fourth']


  // Find all records which create time is same like bigger from someDateTime
  .whereDate('createTime', 'some date format', '>', someDateTime)


  // Find all records where title and name is the same
  .whereColumn('title', 'name', '=')
```


### After we finish with the build the query is need to prepare and execute

```JavaScript
// Build the query from all simple parts
qBuilder.prepare()

  // Set all parameters which You need to used on mysql query builder
  .setParameters([param1, param2, param3])

  // Just execute the query and no return result
  .execute()
```


### OR


```JavaScript
// Build the query from all simple parts
qBuilder.prepare()

  // Set all parameters which You need to used on mysql query builder
  .setParameters([param1, param2, param3])

  // Get the result of executed query
  .getResult((err, data) => {
  if (err) console.log(err)

  // data is result of mysql query and is return like array of objects or single object
  console.log(data)
})
```


### If You don't trust of the developer then You have option to write Your own query

```JavaScript
qBuilder.setCommand('SELECT * FROM Table WHERE id > ?')

  // Build the query from all simple parts
  .prepare()

  // Set all parameters which You need to used on mysql query builder
  .setParameters([param1])

  // Get the result of executed query
  .getResult((err, data) => {
   if (err) console.log(err)

   // data is result of mysql query and is return like array of objects or single object
   console.log(data)
 })
```


### For more mysql advanced functions You can used that which return the mysql module

```JavaScript
qBuilder.getMysql()
```
