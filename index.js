const mysql = require('mysql')
const qBuilder = require('./lib/QueryBuilder')
const qModel = require('./lib/ModelBinding')

let connection = null
let _query = ''
let _params = []

/**
 * [setOptions description]
 * @param {[type]} dbSetting [description]
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
 * [Get the MySQL module package for more advanced functions]
 * @return {MySQL} [Mysql module package]
 */
exports.getMysql = () => {
  return mysql
}

/**
 * [useModel description]
 * @param  {Array} schema [List of columns on table which You want to used for current case]0
 * @param {String} table   [Database table for that schema]
 * @return {ModelBinding}  [description]
 */
exports.useSchema = (schema, table) => {
  return qModel.setSchema(schema, table)
}

/**
 * [Start to create SQL Query]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.makeQuery = () => {
  qBuilder.resetParameters()
  _params = []
  return qBuilder
}

/**
 * [Prepare the sql query and set what kind of query is will used]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.prepare = () => {
  _query = qBuilder.prepare()
  return this
}

/**
 * [Set parameters for created sql query]
 * @param {Array} params  [description]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.setParameters = function (params) {
  qBuilder.setParameters(params)
  _params = this.getParameters()
  return this
}

/**
 * [Get all sql query parameters]
 * @return {Array} [SQL Query parameters]
 */
exports.getParameters = () => {
  _params = qBuilder.getParameters()
  return _params
}

/**
 * [Get the created sql query]
 * @return {String} [SQL Query]
 */
exports.getCommand = () => {
  return _query
}

/**
 * [Set Your own sql query]
 * @param  {String} command [SQL Query]
 * @return {QueryBuilder}   [Query Builder Creator of sql queries and connect to database]
 */
exports.setCommand = function (command) {
  _query = command
  return this
}

/**
 * [Execute the created sql query]
 * @return {QueryBuilder}   [Query Builder Creator of sql queries and connect to database]
 */
exports.execute = function () {
  if (_query.indexOf('?') !== -1) {
    _params = this.getParameters()

    connection.query(_query, _params, (err, result) => {
      if (err) console.log(err)
    })
  } else {
    connection.query(_query, (err, result) => {
      if (err) console.log(err)
    })
  }

  return this
}

/**
 * [Get the result from created sql query]
 * @param {fn} callback [description]
 */
exports.getResult = (callback) => {
  if (_query.indexOf('?') !== -1) {
    _params = this.getParameters()

    connection.query(_query, _params, (err, rows, fields) => {
      if (err) callback(err, null)
      callback(null, JSON.parse(JSON.stringify(rows)))
    })
  } else {
    connection.query(_query, (err, rows, fields) => {
      if (err) callback(err, null)
      callback(null, JSON.parse(JSON.stringify(rows)))
    })
  }
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
