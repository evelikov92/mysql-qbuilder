const mysql = require('mysql')
const qBuilder = require('./module/QueryBuilder')

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
 * [Start to create SQL Query]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.makeQuery = () => {
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
exports.setParameters = (params) => {
  qBuilder.setParameters(params)
  _params = params
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
exports.execute = () => {
  return this
}

/**
 * [Get the result from created sql query]
 * @return {[type]} [description]
 */
exports.getResult = () => {

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
