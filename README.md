# mysql-qbuilder

[![npm](https://img.shields.io/npm/v/mysql-qbuilder.svg)]()
[![node](https://img.shields.io/node/v/mysql-qbuilder.svg)]()
[![Build Status](https://semaphoreapp.com/api/v1/projects/d4cca506-99be-44d2-b19e-176f36ec8cf1/128505/shields_badge.svg)](https://semaphoreapp.com/boennemann/badges)
[![npm](https://img.shields.io/npm/l/mysql-qbuilder.svg)]()
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm](https://img.shields.io/npm/dm/mysql-qbuilder.svg)]()
[![npm](https://img.shields.io/npm/dt/mysql-qbuilder.svg)]()

## Table of Contents

- [Install](#install)
- [Introduction](#introduction)
- [Before Start to Used](#before-start-to-used)
- [Clauses](#clauses)
- [SELECT](#select)
- [INSERT](#insert)
- [FROM Table](#from-table)
- [DELETE](#delete)
- [UPDATE](#update)
- [JOIN](#join)
- [ORDER BY](#order-by)
- [GROUP BY](#group-by)
- [LIMIT](#limit)
- [OFFSET](#offset)
- [WHERE](#where)
- [All Query Builder Functions](#query-builder)
- [How to Execute](#how-to-execute)
- [How to write Your own Query](#how-to-write-own-query)
- [Get Mysql Module](#get-mysql-module)
- [Change log](#change-log)

## Install

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


## Before Start to Used
Before to start to used the mysql-qbuilder is need to set some options
In this section is show What You need for to work with mysql-qbuilder

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


## Clauses
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
* * `WHERE AND OR`
* * `WHERE NOT`
* * `WHERE COLUMN`
* * `WHERE DATE` ++
* * `WHERE YEAR` ++
* * `WHERE MONTH` ++
* * `WHERE DAY` ++
* * `WHERE IN`
* * `WHERE NOT IN`
* * `WHERE BETWEEN`
* * `WHERE NOT BETWEEN`
* * `WHERE NULL`
* * `WHERE NOT NULL`
* `JOIN`
* `FROM`
* `TABLE`


## SELECT
### `select()` `addSelect()`

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


## INSERT
### `add()`

Many times You don't want to get the data from database. Just want to add new record

```JavaScript
  qBuilder.makeQuery()
    .table('tableName')
    .add(['count', 'title', 'name']) // set the column name on database
  qBuilder.prepare()
    .setParameters([5, 'SomeTitle', 'SomeName']) // set the values of new record
    .execute() // Save the new record on database
```


## FROM Table
### `from()` `table()`

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


## DELETE
### `delete()`

The query builder may also be used to delete records from the table used delete function

```JavaScript
  qBuilder.makeQuery()
    .table('tableName')
    .delete()
    .where('id', '=', 10)
  qBuilder.prepare().execute()
```

## UPDATE
### `update()`

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

## JOIN
### `join()`

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


## ORDER BY
### `orderBy()`

Is A method which You can order by some column

```JavaScript
  qBuilder.makeQuery()
    .select('title, count, name')
    .from('tableName') // set Database table
    .where('id' '>' 2)
    .orderBy('name', true) // Then is to be sorted in DESC
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
  })
```


## GROUP BY
### `groupBy()`

Is A method which You can group by some column

```JavaScript
  qBuilder.makeQuery()
    .select('title, count, name')
    .from('tableName') // set Database table
    .where('id' '>' 2)
    .groupBy('name')
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
  })
```

## LIMIT
### `take()`

Is A method which You can get only few records from database

```JavaScript
  qBuilder.makeQuery()
    .select('title, count, name')
    .from('tableName') // set Database table
    .where('id' '>' 2)
    .take(500) // Get first 500 results
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
  })
```


## OFFSET
### `skip()`

Is A method which You can skip first few records from database

```JavaScript
  qBuilder.makeQuery()
    .select('title, count, name')
    .from('tableName') // set Database table
    .where('id' '>' 2)
    .take(500) // Get results from 201 to 701
    .skip(200) // Skip the first 200 results
  qBuilder.prepare()
    .getResult((err, data) => {
      // data is the array of objects or just single object
  })
```

## NOTICE `From Previous version and that version the some secondary where clauses have one more extra (optional) parameter (andOr), where can set AND or OR. On previous version was AND and now default value is AND`

## WHERE
### `where()`

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

### `WhereNot()`

Where clause is is check do condition is not true

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNot('id', '=', 10, 'OR') // Get all Elements where id is not equal to 10
    .andWhere('name', '=', 'Simon')
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

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNull('name') // get all records which the column name is null
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereNotNull()`

Get all records which the column is not null

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotNull('name') // get all records which the column name is NOT null
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereBetween()`

Get all records which the column is between two values

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereBetween('id', [22, 300], 'OR') // Get all records between 22 and 300
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereNotBetween()`

Get all records which the column is not between two values

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotBetween('id', [22, 300], 'AND') // Get all records which is not between 22 and 300
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereIn`

Get all records which the column value is equal to some parameters which is set

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereIn('id', [2, 4, 6, 3, 8], 'AND') // Get all records with id 2, 3, 4, 6, 8
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereNotIn`

Get all records which the column value is not equal to some parameters which is set

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotIn('id', [2, 4, 6, 3, 8], 'OR') // Get all records which the id is not 2, 3, 4, 6, 8
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereColumn`

Get all records which the first column and second column has same values on database

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereColumn('title', 'name', '=', 'OR') // Get all records which the title and name is same
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereDate`

Get all records where the column createTime is equal to 2010-04-01 Date Time

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereDate('createTime', '=', '2010-04-01')
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereYear`

Get all records where the column createTime is from 2010

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereYear('createTime', '=', '2010', 'OR')
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereMonth`

Get all records where the column createTime is with month equal to 10

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereMonth('createTime', '=', '10', 'OR')
  qBuilder.prepare().getResult((err, data) => {

  })
```

### `whereDay`

Get all records where the column createTime is with day equal to 22

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereDay('createTime', '=', '22', 'OR')
  qBuilder.prepare().getResult((err, data) => {

  })
```


## All Query Builder Functions
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


  // Find all records which the id column is not equal to 5
  .whereNot('id', '=', 5)


  // Find all records which and id is equal to some parameter IS REQUIRED TO USED WHERE BEFORE USED ANDWHERE
  .andWhere('id')


  // find all records which is by first where or count is equal to 10 IS REQUIRED TO USED WHERE BEFORE USED ANDWHERE
  .orWhere('count', '=', 10)


  // Find all records which and count bigger from 10 or smaller from 30
  .andOrWhere('count', '>', '<', [10, 30])


  // Find all records which title is null
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereNull('title', 'OR')


  // Find all records which title is not null
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whreNotNull('title', 'AND')


  // Find all records which the column 'count' is between 10 and 30
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereBetween('count', [10, 30])


  // Find all records which the column 'count' is not between 10 and 30
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereNotBetween('count', [10, 30], 'OR')


  // Find all records which is have value like one of the array elements
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereIn('count', [5, 10, 15, 20, 25], 'AND')


  // Find all records which is NOT have value like one of the array elements
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereNotIn('title', ['first', 'second', 'third', 'fourth'], 'AND')


  // Find all records which create time is bigger from  2010-04-01
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereDate('createTime', '>', '2010-04-01', 'OR')


  // Find all records which createTime is have with Day = 22
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereDay('createTime', '=', 22, 'AND')


  // Find all records which createTime is have with Month = 10
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereMonth('createTime', '=', 10, 'OR')


  // Find all records which createTime is have with Year = 2010
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereYear('createTime', '=', 2010, 'OR')


  // Find all records where title and name is the same
  // If before You call the some another where method then is possible to choose between AND and OR (Default = AND)
  .whereColumn('title', 'name', '=', 'OR')
```


## How to Execute
### Is have two different ways to execute the created query

#### 1) With execute which not return result
Is possible to used when You want to add new record on database

```JavaScript
// Build the query from all simple parts
qBuilder.prepare()
  // Set all parameters which You need to used on mysql query builder
  .setParameters([param1, param2, param3])
  // Just execute the query and don't return some result
  .execute()
```

#### 2) With getResult which return result
Is possible to used when You want to get some records from database

```JavaScript
// Build the query from all simple parts
qBuilder.prepare()
  // Set all parameters which You need to used on mysql query builder
  .setParameters([param1, param2, param3])
  // Get the result of executed query
  .getResult((err, data) => { // is return the Array
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```


## How to write Your own Query
### To write Your own query is need only to call method setCommand

```JavaScript
qBuilder.setCommand('SELECT * FROM Table WHERE id > ?')
  // Build the query from all simple parts
  .prepare()
  // Set all parameters which You need to used on mysql query builder
  .setParameters([param1])
  // Get the result of executed query
  .getResult((err, data) => { // is return the Array
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
 })
```


## Get Mysql Module
### If You want to set more advanced options then You can get the MySql module

```JavaScript
qBuilder.getMysql()
```

## Change log
* v1.2.1
* * Add `WhereDay` `WhereMonth` `WhereYear`
* * Add One more (Optional) Parameter on Where methods which is possible choose between AND or OR (Default = AND)
