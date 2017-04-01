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

To add this npm package to your local machine, type the above into your command line. You�ll notice a node_modules directory appear in your root where the package is now installed.


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
* `TOP`
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
 hostname: 'localhost',
 username: 'root',
 password: '',
 database: 'distribution'
})
```


### Start to make query
```JavaScript
qBuilder.makeQuery()
```


### Used one of that functions for create sql query
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
  .skip(500)


  // Get first 500 records from database IS REQUIRED TO USED SELECT BEFORE USED TOP
  .top(500)


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


### For more mysql advanced functions used that

```JavaScript
qBuilder.getMysql()
```



# NOTE
## The clauses is still on testing mode
