const tableClauses = require('./clauses/Table')
const whereClauses = require('./clauses/Where')
const parameters = require('./clauses/Parameters')

exports = whereClauses
exports = tableClauses

/**
 * [Generate ? symbol for sql query for every parameter]
 * @param  {Array} columns [List of all parameters on sql query]
 * @return {String}        [Correct syntax for query builder of parameters]
 */
function returnSymbolParamsCount (columns) {
  let length = columns.length + 1
  let symbols = Array(length).join('?, ')
  return symbols.slice(0, -2)
}

/**
 * [Select clause of sql query which select the columns (properties) of records]
 * @param  {Array} columns [Array or String All selected columns from table]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
exports.select = function (columns) {
  if (Array.isArray(columns)) {
    parameters.select = `SELECT ${columns.join(', ')}`
  } else if (columns.length > 0) {
    parameters.select = `SELECT ${columns}`
  } else {
    throw new Error('The columns is not available in correct format!')
  }

  parameters.option = 'select'
  return this
}

/**
 * [From clause of sql query which select the database table]
 * @param  {String} table [The name of database table]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.from = function (table) {
  if (table.length > 0 && !Array.isArray(table)) {
    parameters.from = ` FROM ${table}`
    parameters.table = table

    return this
  } else {
    throw new Error('The table variable is required to be string!')
  }
}

/**
 * [Set the name of database table]
 * @param  {String} table [The name of database table]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.table = function (table) {
  if (table.length > 0 && !Array.isArray(table)) {
    parameters.table = table

    return this
  } else {
    throw new Error('The table variable is required to be string!')
  }
}

/**
 * [Add few more columns on select caluse of sql query]
 * @param  {String} columns [Array or String All selected columns from table]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
exports.addSelect = function (columns) {
  if (!parameters.select) {
    throw new Error('Please first use SELECT method before add new column on select method!')
  } else if (Array.isArray(columns)) {
    parameters.select += `, ${columns.join(', ')}`
  } else if (columns.length > 0) {
    parameters.select += `, ${columns}`
  } else {
    throw new Error('The columns is not available in correct format!')
  }

  return this
}

/**
 * [Insert clause on sql query which is create to add new record on database]
 * @param  {Array} columns [All columns which is to add on database]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.add = function (columns) {
  if (Array.isArray(columns)) {
    let symbols = returnSymbolParamsCount(columns)

    if (symbols.length > 0) {
      parameters.insert = 'INSERT INTO `' + parameters.table + '` ( ' + columns.join(', ') + ' ) VALUES ( ' + symbols + ' )'
      parameters.option = 'insert'

      return this
    } else {
      throw new Error('The columns is empty!')
    }
  } else {
    throw new Error('The columns is required to be array!')
  }
}

/**
 * [Delete clause on sql query which is delete record from database]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.delete = function () {
  if (parameters.table) {
    parameters.delete = `DELETE FROM ${parameters.table}`
    parameters.option = 'delete'

    return this
  } else {
    throw new Error('Is need to enter in which table is need to delete record!')
  }
}

/**
 * [Update clause on sql query which is update current record on database]
 * @param  {Array} columns [All columns which is update on databse]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.update = function (columns) {
  if (!Array.isArray(columns)) {
    throw new Error('The columns variable is required to be array!')
  }

  if (!parameters.table) {
    throw new Error('Is need to enter in which table is need to delete record!')
  }

  let cl = columns.map((cl) => { return cl + ' = ?, ' })
  parameters.update = `UPDATE ${parameters.table} SET ${cl.join('').slice(0, -2)}`
  parameters.option = 'update'

  return this
}

/**
 * [Join clause on sql query which is just join another table on sql query]
 * @param  {String} table [The database table which is need to join]
 * @param  {String} equal [The columns ids equals on both databases]
 * @param  {String} type  [Type of join clause (left, inner, outer etc)]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.join = function (table, equal, type = '') {
  if (typeof table === 'string' && table.length > 1 &&
  typeof equal === 'string' && equal.length > 1) {
    parameters.join += ` ${type} JOIN ${table} ON ${equal}`
    return this
  } else {
    throw new Error('The table and equal variable is required to be string!')
  }
}

/**
 * [Take clause on sql query which is set how many records to take from database table]
 * @param  {Number} limit [How many items to take]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.take = function (limit) {
  limit = parseInt(limit)

  if (isNaN(limit)) {
    throw new Error('The limit variable is required to be Integer!')
  }

  parameters.limit = ` LIMIT ${limit}`
  return this
}

/**
 * [Skip clause on sql query which is set how many records to skip from database table]
 * @param  {Number} count [How many items to skip]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.skip = function (count) {
  count = parseInt(count)

  if (isNaN(count)) {
    throw new Error('The count variable is required to be Integer!')
  }

  if (parameters.limit === '') {
    throw new Error('The OFFSET is working together with LIMIT so first used take function!')
  }

  parameters.skip = ` OFFSET ${count}`
  return this
}

/**
 * [Order clause on sql query which is order by one column]
 * @param  {String}  column         [The column on table with which is to be ordered]
 * @param  {Boolean} [isDesc=false] [Do is DESC or ASC]
 * @return {QueryBuilder}           [Query Builder Creator of sql queries and connect to database]
 */
exports.orderBy = function (column, isDesc = false) {
  if (typeof column !== 'string') {
    throw new Error('The column variable is required to be string!')
  }

  parameters.orderBy = ` ORDER BY ${column} `

  if (isDesc) {
    parameters.orderBy += ' DESC '
  }

  return this
}

/**
 * [Group clause on sql query which is set the grouped by column]
 * @param  {String}  column         [The column on table with which is to be grouped]
 * @param  {Boolean} [isDesc=false] [Do is DESC or ASC]
 * @return {QueryBuilder}           [Query Builder Creator of sql queries and connect to database]
 */
exports.groupBy = function (column, isDesc = false) {
  if (typeof column !== 'string') {
    throw new Error('The column variable is required to be string!')
  }

  parameters.groupBy = ` GROUP BY ${column} `

  if (isDesc) {
    parameters.groupBy += ' DESC '
  }

  return this
}

exports.count = function () {

}

exports.union = function () {

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
 * @param  {Array} values [SQL query parameres only values]
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
 * [Reset the query parameters for can work with another queries]
 */
exports.resetParameters = function () {
  parameters.params = []
}

/**
 * [Prepare the sql query and set what kind of query is will used]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.prepare = function () {
  if (parameters.option === 'select') {
    parameters.command = parameters.select + parameters.from +
      parameters.join + parameters.groupBy + parameters.where +
      parameters.orderBy + parameters.limit + parameters.skip
  } else if (parameters.option === 'insert') {
    parameters.command = parameters.insert
  } else if (parameters.option === 'update') {
    parameters.command = parameters.update + parameters.where + parameters.limit + parameters.skip
  } else if (parameters.option === 'delete') {
    parameters.command = parameters.delete + parameters.where + parameters.limit + parameters.skip
  } else {
    parameters.command = parameters.where + parameters.limit + parameters.skip
  }

  parameters.select = ''
  parameters.from = ''
  parameters.join = ''
  parameters.where = ''
  parameters.groupBy
  parameters.orderBy = ''
  parameters.limit = ''
  parameters.skip = ''
  parameters.insert = ''
  parameters.update = ''
  parameters.delete = ''

  return parameters.command
}
