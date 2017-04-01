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
To add this npm package to your local machine, type the above into your command line. You’ll notice a node_modules directory appear in your root where the package is now installed.

## How to used
```JavaScript
const qBuilder = require('mysql-qbuilder')
```

```JavaScript
// Set the parameters for mysql connection
qBuilder.setOptions({
 hostname: 'localhost',
 username: 'root',
 password: '',
 database: 'distribution'
})
```

```JavaScript
// Start to make query
qBuilder.makeQuery()
 .select('id, title, someDiff') // Select few columns used String or Array
 .addSelect(['count', 'name']) // Add few more columns used String or Array IS REQUIRED TO USED SELECT BEFORE USED ADDSELECT
 .add(['title', 'count', 'name']) // INSERT clause enter the columns which You set the values on new record
 .from('tableName') // Create from clause where you can used if you used select clause
 .table('tableName') // Set the table which You used for that query
 .delete() // delete some record from database IS REQUIRED TO USED FROM OR TABLE BEFORE USED DELETE
 .update(['title', 'count', 'name']) UPDATE that columns on the record
 .join('roles', 'roles.id = users.roleId' 'INNER') // the last parameter is optional Make join between two tables
 .take(500) // Get first 500 records from database
 .skip(500) // Skip first 500 records from database
 .top(500) // Get first 500 records from database IS REQUIRED TO USED SELECT BEFORE USED TOP
 .orderBy('count', true) // order by count column and set to be DESC (if is false then is not used DESC)
 .groupBy('count', false) // group by count column and don't set to be DESC
 .where('id', '>', 5) // find all records which id column is bigger from 5 second and third parameters are optional
 .andWhere('id') // find all records which and id is equal to some parameter IS REQUIRED TO USED WHERE BEFORE USED ANDWHERE
 .orWhere('count', '=', 10) // find all records which is by first where or count is equal to 10 IS REQUIRED TO USED WHERE BEFORE USED ANDWHERE
 .andOrWhere('count', '>', '<', [10, 30]) // find all records which and count bigger from 10 or smaller from 30
 .whereNull('title') // find all records which title is null
 .whreNotNull('title') // find all records which title is not null
 .whereBetween('count', [10, 30]) // find all records which the column 'count' is between 10 and 30
 .whereNotBetween('count', [10, 30]) // find all records which the column 'count' is not between 10 and 30
 .whereIn('count', [5, 10, 15, 20, 25]) // find all records which is have value like one of the array elements
 .whereNotIn('title', ['first', 'second', 'third', 'fourth'] // find all records which is NOT have value like one of the array elements
 .whereDate('createTime', 'some date format', '>', someDateTime) // find all records which create time is same like bigger from someDateTime
 .whereColumn('title', 'name', '=') // find all records where title and name is the same

// After we finish with the build the query is need to prepare and execute
qBuilder.prepare() // Build the query from all simple parts
 .setParameters([param1, param2, param3]) // Set all parameters which You need to used on mysql query builder
 .execute() // Just execute the query and no return result

// OR
qBuilder.prepare() // Build the query from all simple parts
 .setParameters([param1, param2, param3]) // Set all parameters which You need to used on mysql query builder
 .getResult((err, data) => { // Get the result of executed query
  if (err) console.log(err)
  console.log(data) // data is result of mysql query
  // The result
  // is in Object format like { title: 'SomeTitile' }
  // or in Array format like [ { title: 'firstTitle' }, { title: 'secondTitle' } ]
})
```

```JavaScript
// If you don't trust of the developer then You have option to write query yourself like
qBuilder.setCommand('SELECT * FROM Table WHERE id > ?')
 .prepare()
 .setParameters([param1]) // Set all parameters which You need to used on mysql query builder
 .getResult((err, data) => {
   if (err) console.log(err)
   console.log(data) // data is result of mysql query
   // The result
   // is in Object format like { title: 'SomeTitile' }
   // or in Array format like [ { title: 'firstTitle' }, { title: 'secondTitle' } ]
 })
```

```JavaScript
// You can get and see the mysql query which is make with that function
qBuilder.prepare() // But first need to run prepare function
qBuilder.getCommand()
```

```JavaScript
// this will return mysql module pattern for more advanced functions
qBuilder.getMysql()
```

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

# NOTE
## The clauses is still on testing mode
