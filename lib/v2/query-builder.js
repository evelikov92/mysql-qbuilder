const parameters = require('./parameters')
const common = require('./utilities/common')

/**
 * Select clause of sql query which select the columns (properties) of records
 * @param  {String} columns Array or String All selected columns from table
 * @return {QueryBuilder}   Query Builder Creator of sql queries and connect to database
 */
module.exports.select = function (columns) {
  if (Array.isArray(columns)) {
    parameters.select = `SELECT ${columns.join(', ')}`
  } else if (typeof columns === 'string') {
    parameters.select = `SELECT ${columns}`
  } else {
    throw new Error('The columns is not available in correct format!')
  }

  parameters.option = 'select'
  return this
}

/**
 * From clause of sql query which select the database table
 * @param  {String} table The name of database table
 * @return {QueryBuilder} Query Builder Creator of sql queries and connect to database
 */
module.exports.table = function (table) {
  if (typeof table !== 'string') { throw new Error('The table variable is required to be string!') }

  parameters.from = ` FROM ${table}`
  parameters.table = table
  return this
}

/**
 * Insert clause on sql query which is create to add new record on database
 * @param  {Object} args  The object which need to add on database
 * Example: { name: 'Foo', age: 23 } name and age is columns on database and Foo and 23 is the value for the record
 * @return {QueryBuilder} Query Builder Creator of sql queries and connect to database
 */
module.exports.insert = function (args) {
  if (!args) { throw new Error('The columns is empty!') }
  if (!parameters.table) { throw new Error('The table is need to be set!') }

  let columns = Object.keys(args).join(', ')
  let symbols = common.returnSymbolParamsCount(columns)

  for (let element in args) {
    if (args.hasOwnProperty(element)) {
      parameters.params.push(args[element])
    }
  }

  parameters.insert = 'INSERT INTO `' + parameters.table + '` ( ' + columns + ' ) VALUES ( ' + symbols + ' )'
  parameters.option = 'insert'
  return this
}

/**
 * Update clause on sql query which is update current record on database
 * @param  {Array} args The object which need to add on database
 * Example: { name: 'Foo', age: 23 } name and age is columns on database and Foo and 23 is the value for the record
 * @return {QueryBuilder}  Query Builder Creator of sql queries and connect to database
 */
module.exports.update = function (args) {
  if (!args) { throw new Error('The columns is empty!') }
  if (!parameters.table) { throw new Error('The table is need to be set!') }

  for (let element in args) {
    if (args.hasOwnProperty(element)) {
      parameters.params.push(args[element])
    }
  }

  let columns = Object.keys(args).map(x => { return `${x} = ?` })
  parameters.update = `UPDATE ${parameters.table} SET ${columns.join('').slice(0, -2)}`
  parameters.option = 'update'
  return this
}

/**
 * Delete clause on sql query which is delete record from database
 * @return {QueryBuilder} Query Builder Creator of sql queries and connect to database
 */
module.exports.delete = function () {
  if (!parameters.table) { throw new Error('The table is need to be set!') }

  parameters.delete = `DELETE FROM ${parameters.table}`
  parameters.option = 'delete'
  return this
}

module.exports.addOrUpdate = function (addArgs, updateArgs) {
  if (!parameters.table) { throw new Error('The table is need to be set!') }

  return this
}
