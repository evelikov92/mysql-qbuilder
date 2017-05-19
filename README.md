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
- - [SELECT](#select)
- - [INSERT](#insert)
- - [FROM Table](#from-table)
- - [DELETE](#delete)
- - [UPDATE](#update)
- - [INSERT OR UPDATE](#insert-or-update)
- - [JOIN](#join)
- - [ORDER BY](#order-by)
- - [GROUP BY](#group-by)
- - [LIMIT](#limit)
- - [OFFSET](#offset)
- - [WHERE](#where)
- [How to Execute](#how-to-execute)
- [Query Model](#query-model)
- - [Add](#add)
- - [Get First](#get-first)
- - [Get Last](#get-last)
- - [Get All](#get-all)
- - [Find by Id](#find-by-id)
- - [Find by Fields](#find-by-fields)
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

### Then connect to the database
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
* * `WHERE DATE`
* * `WHERE YEAR`
* * `WHERE MONTH`
* * `WHERE DAY`
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
  qBuilder.prepare().getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
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
    .setParameters(['newTitle', 25, 'newName', 10]) // The last parameter is for where clause
    .execute()
```

## INSERT OR UPDATE
### `addOrUpdate()`

In some cases You need to add few new records on database, but some times that records is possible
to get from database and need just to update if is exists on database

#### IMPORTANT: In that case is need to have Unique index on table for can check do is exists
#### For example here the unique key is need to be title and name
##### Example for create the unique key: `CREATE UNIQUE INDEX title_name_index ON tableName (title, name)`

```JavaScript
qBuilder.makeQuery()
  .table('tableName')
  // First parameter is for try to add the elements
  // Second parameters is for if is exists with same title and name then just update the count
  .addOrUpdate(['title', 'count', 'name'], ['count'])
qBuilder.prepare()
  .setParameters(['newTitle', 25, 'newName', 25]) // Set the parameters
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
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
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereNull()`

Get all records which the column is null

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNull('name') // get all records which the column name is null
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereNotNull()`

Get all records which the column is not null

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotNull('name') // get all records which the column name is NOT null
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereBetween()`

Get all records which the column is between two values

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereBetween('id', [22, 300], 'OR') // Get all records between 22 and 300
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereNotBetween()`

Get all records which the column is not between two values

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotBetween('id', [22, 300], 'AND') // Get all records which is not between 22 and 300
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereIn`

Get all records which the column value is equal to some parameters which is set

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereIn('id', [2, 4, 6, 3, 8], 'AND') // Get all records with id 2, 3, 4, 6, 8
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereNotIn`

Get all records which the column value is not equal to some parameters which is set

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereNotIn('id', [2, 4, 6, 3, 8], 'OR') // Get all records which the id is not 2, 3, 4, 6, 8
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereColumn`

Get all records which the first column and second column has same values on database

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereColumn('title', 'name', '=', 'OR') // Get all records which the title and name is same
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereDate`

Get all records where the column createTime is equal to 2010-04-01 Date Time

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereDate('createTime', '=', '2010-04-01')
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereYear`

Get all records where the column createTime is from 2010

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereYear('createTime', '=', '2010', 'OR')
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereMonth`

Get all records where the column createTime is with month equal to 10

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereMonth('createTime', '=', '10', 'OR')
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
```

### `whereDay`

Get all records where the column createTime is with day equal to 22

```JavaScript
  qBuilder.makeQuery()
    .select('*')
    .from('tableName')
    .whereDay('createTime', '=', '22', 'OR')
    qBuilder.prepare().getResult() // New version bigger of 1.5.1
      .then(result => {

      })
      .catch(err => {

      })
    qBuilder.prepare().getResult((err, data) => { // Old version less of 1.5.1
        // data is the array of objects or just single object
    })
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
  qBuilder.getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.getResult((err, data) => { // Old version less of 1.5.1
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```


## Query Model
From v1.3.1 Is possible to used mysql-qbuilder much easier for some common cases like
* Add some record on database
* Get first element from table
* Get last element from table
* Get all elements from table
* Find element by Id
* Find elements by few columns from table

## Add
Add new record on database
```JavaScript
qBuilder.useScheme('tableName')

  // First field is Object where the keys is column of database and values is the values of columns
  .add({ 'username': 'administrator', 'email': 'administrator@admin.com' })

qBuilder.execute()
```


## Get First
Get first record from table
```JavaScript
qBuilder.useScheme() // used same table like before

  // First field is String or Array with all columns which You want to get from database
  .getFirst('email, username')

  qBuilder.getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.getResult((err, data) => { // Old version less of 1.5.1
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```


## Get Last
Get last record from table
```JavaScript
qBuilder.useScheme() // used same table like before

  // First field is String or Array with all columns which You want to get from database
  .getLast('email, username')

  qBuilder.getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.getResult((err, data) => { // Old version less of 1.5.1
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```


## Get All
Get all records from table
```JavaScript
qBuilder.useScheme() // used same table like before

  // First field is String or Array with all columns which You want to get from database
  .getAll('email, username')

  qBuilder.getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.getResult((err, data) => { // Old version less of 1.5.1
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```


## Find by Id
Find record on database by entered id
```JavaScript
qBuilder.useScheme('tableName')

  // First field is id of the record
  // Second is all columns which You want to get from database
  .findById(2, 'email')
  // OR
  .findById([2, 3, 4], 'email') // Is find records with id 2, 3 or 4

  qBuilder.getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.getResult((err, data) => { // Old version less of 1.5.1
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```


## Find by Fields
Find records on database by many search conditions or (only one)
```JavaScript
qBuilder.useScheme('tableName')

  // First field is Object where the keys is column of database and values is the values of columns
  // Second is all columns which You want to get from database
  // Third is do You want every condition to be true or only one
  .findByFields({ 'id': 2, 'username': 'administrator' }, 'email', 'or')
  // Or Get all records which is with id 2, 3 or 4 or have username administrator or userNaMe
  .findByFields({ 'id': [2, 3, 4], 'username': ['administrator', 'userNaMe'] }, 'email', 'or')

  qBuilder.getResult() // New version bigger of 1.5.1
    .then(result => {

    })
    .catch(err => {

    })
  qBuilder.getResult((err, data) => { // Old version less of 1.5.1
    if (err) {
      console.log(err)
    } else {
      // make something with data which is result of mysql query execution
    }
  })
```

## Change log
* v1.6.1
* * Add `addOrUpdate` You can check how to used from description
* v1.5.2
* * Make the getResult() to work with both callback or Promise
* v1.5.1
* * Replace the callback of the getResult with Promise
* * If the getResult() return only one element then is return directly object. Not like to now array of one object.
* v1.4.1
* * Add one more option for findById and findByFields searching not only by one value
* v1.3.1
* * Add Helper Query functions with for some common cases like:
* * * `add` Add record on database
* * * `getFirst` Get first element from table
* * * `getLast` Get last element from table
* * * `getAll` Get all elements from table
* * * `findById` Find record from table by id
* * * `findByFields` Find records from table by selected few columns
* v1.2.0
* * Add `WhereDay` `WhereMonth` `WhereYear`
* * Add One more (Optional) Parameter on Where methods which is possible choose between AND or OR (Default = AND)
