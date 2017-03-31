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

// Set the parameters for mysql connection
qBuilder.setOptions({
  hostname: 'localhost',
  username: 'root',
  password: '',
  database: 'distribution'
})

// Here we start to make the query
qBuilder.makeQuery() // Start to make query
  .select('id, title, someDiff') // Select all columns which You want to get from database. Here You can use the string which the columns is separated with comma or for more simple used the Array of columns
  .from('testTable') // From which table You get the elements
  .where('id', '>', 1) // Some where clasue
qBuilder.prepare().getResult() // Prepare the sql query and get the result
// getResult() will return the all elements which You can get like a Object.
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

# NOTE
### The where clause is still on development mode
