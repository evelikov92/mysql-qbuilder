# mysql-qbuilder

That is module for create queries simple and easy with only few rows.

Query builder for MySQL working with NodeJS

## What You can do with that package
---
* Write faster and to not care abot syntax about the sql queries
* Write Your own sql queries and send to module for execution

## How to install
```
npm install mysql-qbuilder
```

To add this npm package to your local machine, type the above into your command line. You will notice a node_modules directory appear in your root where the package is now installed.


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

## Select

#### Some times You don't want to select all columns from database
#### Then You need to enter just the columns.
#### If You want just write *

```JavaScript
  qBuilder.makeQuery().select('id, title, count')
  qBuilder.makeQuery().select(['id', 'title', 'count'])
  qBuilder.makeQuery().select('*')
```

#### If You forget some column then You can add that columns with addSelect function
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


## Insert
#### Many times You don't want to get the data from database. Just want to add new record
```JavaScript
  qBuilder.makeQuery()
    .table('tableName')
    .add(['count', 'title', 'name']) // set the column name on database
  qBuilder.prepare()
    .setParameters([5, 'SomeTitle', 'SomeName']) // set the values of new record
    .execute() // Save the new record on database
```

### Used one of that functions for create sql query
```JavaScript


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
