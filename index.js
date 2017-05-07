const mysql = require('mysql')
const queryBuilder = require('./lib/QueryBuilder')
const queryModel = require('./lib/QueryModel')
const parameters = require('./lib/Parameters')

let connection = null

/**
 * [Get the MySQL module package for more advanced functions]
 * @return {MySQL} [Mysql module package]
 */
exports.getMysql = () => {
  return mysql
}

/**
 * [Set the options of mysql engine: hostname; username; password; database]
 * @param {Object} dbSetting [Configuration of connection of mysql engine]
 */
exports.setOptions = (dbSetting) => {
  connection = mysql.createConnection({
    host: dbSetting.hostname,
    user: dbSetting.username,
    password: dbSetting.password,
    database: dbSetting.database
  })
}

/**
 * [Connect to MySQL server]
 */
exports.connectToDatabase = () => {
  connection.connect()
}

/**
 * [Close the MySQL connection]
 */
exports.closeTheConnection = () => {
  connection.end()
}

/**
 * [Make table scheme and use some common methods]
 * @param {String} [table='']   [Database table for that schema]
 * @return {ModelBinding}       [description]
 */
exports.useScheme = function (table = '') {
  parameters.params = []
  return queryModel.setTable(table)
}

/**
 * [Start to create SQL Query]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.makeQuery = () => {
  parameters.params = []
  return queryBuilder
}

/**
 * [Get all sql query parameters]
 * @return {Array} [SQL Query parameters]
 */
exports.getParameters = () => {
  return parameters.params
}

/**
 * [Set parameters for created sql query]
 * @param {Array} values  [SQL query parameres only values]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.setParameters = function (values) {
  let len = values.length

  if (!Array.isArray(values)) {
    throw new Error('The values variable is required to be array!')
  }

  if (len > 0) {
    for (let i = 0; i < len; i++) {
      parameters.params.push(values[i])
    }
  }

  return this
}

/**
 * [Set Your own sql query]
 * @param  {String} command [SQL Query]
 * @return {QueryBuilder}   [Query Builder Creator of sql queries and connect to database]
 */
exports.setCommand = function (command) {
  parameters.command = command
  return this
}

/**
 * [Get the created sql query]
 * @return {String} [SQL Query]
 */
exports.getCommand = () => {
  return parameters.command
}

/**
 * [Prepare the sql query and set what kind of query is will used]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.prepare = function () {
  parameters.prepare()
  return this
}

/**
 * [Run the sql query on mysql]
 */
exports.execute = function () {
  if (parameters.command.indexOf('?') !== -1) {
    connection.query(parameters.command, parameters.params, (err, result) => {
      if (err) throw new Error(err)
    })
  } else {
    connection.query(parameters.command, (err, result) => {
      if (err) throw new Error(err)
    })
  }
}


// TODO Not tested
exports.getResult = new Promise((resolve, reject) => {
  if (parameters.command.indexOf('?') !== -1) {
    connection.query(parameters.command, parameters.params, (err, rows, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(JSON.stringify(rows)))
      }
    })
  } else {
    connection.query(parameters.command, (err, rows, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(JSON.stringify(rows)))
      }
    })
  }
})

/**
 * [Get the result from created sql query]
 * @param {fn} callback [Callback where first parameter is Error and second is list of records]
 */
exports.getResult = (callback) => {
  if (parameters.command.indexOf('?') !== -1) {
    connection.query(parameters.command, parameters.params, (err, rows, fields) => {
      if (err) return callback(err, null)
      callback(null, JSON.parse(JSON.stringify(rows)))
    })
  } else {
    connection.query(parameters.command, (err, rows, fields) => {
      if (err) return callback(err, null)
      callback(null, JSON.parse(JSON.stringify(rows)))
    })
  }
}
