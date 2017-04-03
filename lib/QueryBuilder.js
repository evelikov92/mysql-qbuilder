let _where = ''
let _select = ''
let _from = ''
let _orderBy = ''
let _groupBy = ''
let _limit = ''
let _skip = ''
let _join = ''
let _insert = ''
let _delete = ''
let _update = ''
let _command = ''
let _table = ''
let _option = ''
let _params = []

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
    _select = `SELECT ${columns.join(', ')}`
  } else if (columns.length > 0) {
    _select = `SELECT ${columns}`
  } else {
    throw new Error('The columns is not available in correct format!')
  }

  _option = 'select'
  return this
}

/**
 * [From clause of sql query which select the database table]
 * @param  {String} table [The name of database table]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.from = function (table) {
  if (table.length > 0 && !Array.isArray(table)) {
    _from = ` FROM ${table}`
    _table = table
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
    _table = table
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
  if (!_select) {
    throw new Error('Please first use SELECT method before add new column on select method!')
  } else if (Array.isArray(columns)) {
    _select += `, ${columns.join(', ')}`
  } else if (columns.length > 0) {
    _select += `, ${columns}`
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
      _insert = 'INSERT INTO `' + _table + '` ( ' + columns.join(', ') + ' ) VALUES ( ' + symbols + ' )'
      _option = 'insert'
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
  if (_table) {
    _delete = `DELETE FROM ${_table}`
    _option = 'delete'
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

  if (!_table) {
    throw new Error('Is need to enter in which table is need to delete record!')
  }

  let cl = columns.map((cl) => { return cl + ' = ?, ' })
  _update = `UPDATE ${_table} SET ${cl.join('').slice(0, -2)}`
  _option = 'update'
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
    _join += ` ${type} JOIN ${table} ON ${equal}`
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

  _limit = ` LIMIT ${limit}`
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

  if (_limit === '') {
    throw new Error('The OFFSET is working together with LIMIT so first used take function!')
  }

  _skip = ` OFFSET ${count}`
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

  _orderBy = ` ORDER BY ${column} `

  if (isDesc) {
    _orderBy += ' DESC '
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

  _groupBy = ` GROUP BY ${column} `

  if (isDesc) {
    _groupBy += ' DESC '
  }

  return this
}

/**
 * [Where clause on sql query which is check do column is some equal with param]
 * @param  {String} column         [Column from database table to check do is some equal with param]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
exports.where = function (column, operator = '=', param = null) {
  if (typeof column === 'string' && typeof operator === 'string') {
    _where = ` WHERE ${column} ${operator.replace(/'"/g, '')} ?`

    if (param && !Array.isArray(param)) {
      _params.push(param)
    }

    return this
  } else {
    throw new Error('The column and operator variable is required to be string!')
  }
}

/**
 * [If is used the where clause then that is next where clause if is need both to be true]
 * @param  {String} column         [Column from database table to check do is some equal with param]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
exports.andWhere = function (column, operator = '=', param = null) {
  if (_where === '') {
    throw new Error('Please first use WHERE method before add new column on select method!')
  }
  if (typeof column === 'string' && typeof operator === 'string') {
    _where += ` AND ${column} ${operator.replace(/'"/g, '')} ?`

    if (param && !Array.isArray(param)) {
      _params.push(param)
    }

    return this
  } else {
    throw new Error('The column and operator is required to be string!')
  }
}

/**
 * [If is used the where clause then that is next where clause if is need one or both to be true]
 * @param  {String} column         [Column from database table to check do is some equal with param]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
exports.orWhere = function (column, operator = '=', param = null) {
  if (_where === '') {
    throw new Error('Please first use WHERE method before add new column on select method!')
  }
  if (typeof column === 'string' && typeof operator === 'string') {
    _where += ` OR ${column} ${operator.replace(/'"/g, '')} ?`

    if (param && !Array.isArray(param)) {
      _params.push(param)
    }

    return this
  } else {
    throw new Error('The column and operator is required to be string!')
  }
}

/**
 * [Where clause on sql query which is check do column is some equal with first or second operator to be equal on param]
 * @param  {String} column               [Column from database table to check do is some equal with param]
 * @param  {String} [firstOperator='=']  [First operator for comparison the column and parameter]
 * @param  {String} [secondOperator='='] [Second operator for comparison the column and parameter]
 * @param  {String} [param=null]         [Value to check do column from database table is some equal with param]
 * @return {QueryBuilder}                [Query Builder Creator of sql queries and connect to database]
 */
exports.andOrWhere = function (column, firstOperator = '=', secondOperator = '=', param = null) {
  if (typeof column !== 'string' || typeof firstOperator !== 'string' || typeof secondOperator !== 'string') {
    throw new Error('The column, firstOperator and secondOperator is required to be string!')
  }
  if (_where === '') {
    _where = ` WHERE ( ${column} ${firstOperator.replace(/'"/g, '')} ? OR ${column} ${secondOperator.replace(/'"/g, '')} ? )`
  } else {
    _where += ` AND ( ${column} ${firstOperator.replace(/'"/g, '')} ? OR ${column} ${secondOperator.replace(/'"/g, '')} ? )`
  }
  if (param && !Array.isArray(param)) {
    _params.push(param)
  }
  return this
}

/**
 * [Where find all records which the column is null]
 * @param  {String} column [Column on table which is to check do is null]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
exports.whereNull = function (column) {
  if (typeof column === 'string') {
    if (_where === '') {
      _where = ` WHERE ${column} is null `
    } else {
      _where = ` AND ${column} is null`
    }

    return this
  } else {
    throw new Error('The column is required to be string!')
  }
}

/**
 * [Where find all records which the column is NOT null]
 * @param  {String} column [Column on table which is to check do is null]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
exports.whereNotNull = function (column) {
  if (typeof column === 'string') {
    if (_where === '') {
      _where = ` WHERE ${column} is not null `
    } else {
      _where = ` AND ${column} is not null`
    }

    return this
  } else {
    throw new Error('The column is required to be string!')
  }
}

/**
 * [Where find all records which is like between set parameters]
 * @param  {String} column      [Column on table which is to check do is have record between that params]
 * @param  {Array}  [params=[]] [Values to check do have records between that parameters]
 * @return {QueryBuilder}       [Query Builder Creator of sql queries and connect to database]
 */
exports.whereBetween = function (column, params = []) {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  if (_where === '') {
    _where = ` WHERE ${column} BETWEEN ? AND ?`
  } else {
    _where = ` AND ${column} BETWEEN ? AND ?`
  }

  if (params.length > 0) {
    if (params.length === 2) {
      for (let i = 0; i < 2; i++) {
        _params.push(params[i])
      }
    } else {
      throw new Error('The params is required to be Array with length 2')
    }
  }

  return this
}

/**
 * [Where find all records which is NOT like between set parameters]
 * @param  {String} column      [Column on table which is to check do is have record between that params]
 * @param  {Array}  [params=[]] [Values to check do have records between that parameters]
 * @return {QueryBuilder}       [Query Builder Creator of sql queries and connect to database]
 */
exports.whereNotBetween = function (column, params = []) {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  if (_where === '') {
    _where = ` WHERE ${column} NOT BETWEEN ? AND ?`
  } else {
    _where = ` AND ${column} NOT BETWEEN ? AND ?`
  }

  if (params.length > 0) {
    if (params.length === 2) {
      for (let i = 0; i < 2; i++) {
        _params.push(params[i])
      }
    } else {
      throw new Error('The params is required to be Array with length 2')
    }
  }
  return this
}

/**
 * [Where find all records which is like set parameters]
 * @param  {String} column   [Column on table which is to check do is have record like that parameters]
 * @param  {Array}  [params] [Values to check do have record like that values]
 * @return {QueryBuilder}    [Query Builder Creator of sql queries and connect to database]
 */
exports.whereIn = function (column, params) {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  let symbols = returnSymbolParamsCount(params)
  if (_where === '') {
    _where = ` WHERE ${column} IN ( ${symbols} )`
  } else {
    _where = ` AND ${column} IN ( ${symbols} )`
  }

  if (params.length > 0) {
    for (let i = 0, len = params.length; i < len; i++) {
      _params.push(params[i])
    }
  }
  return this
}

/**
 * [Where find all records which is NOT like set parameters]
 * @param  {String} column [Column on table which is to check do is have record NOT like that parameters]
 * @param  {Array} params  [Values to check do NOT have record like that values]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
exports.whereNotIn = function (column, params) {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  let symbols = returnSymbolParamsCount(params)
  if (_where === '') {
    _where = ` WHERE ${column} NOT IN ( ${symbols} )`
  } else {
    _where = ` AND ${column} NOT IN ( ${symbols} )`
  }

  if (params.length > 0) {
    for (let i = 0, len = params.length; i < len; i++) {
      _params.push(params[i])
    }
  }

  return this
}

/**
 * [Where date is find record by date time]
 * @param  {String} column        [Column on table which is with some date time format]
 * @param  {String} dateType      [Date type format for searching]
 * @param  {String} [operator=''] [Operator for comparison the column and parameter]
 * @param  {String} date          [What date is to be equal]
 * @return {QueryBuilder}         [Query Builder Creator of sql queries and connect to database]
 */
exports.whereDate = function (column, dateType, operator = '=', date) {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }
  if (typeof dateType !== 'string' && dateType !== '') {
    throw new Error('The dateType is required to be string!')
  }

  if (_where === '') {
    _where = ` WHERE ${dateType} ( ${column}) ${operator} ?`
  } else {
    _where = ` AND ${dateType} ( ${column}) ${operator} ?`
  }
  if (date) {
    _params.push(date)
  }

  return this
}

/**
 * [Where column is first column of record to be equal of second column of record]
 * @param  {String} first          [First column of record]
 * @param  {String} second         [Second column of record]
 * @param  {String} [operator='='] [Operator for comparison the first and second columnd]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
exports.whereColumn = function (first, second, operator = '=') {
  if (typeof first !== 'string') {
    throw new Error('The first is required to be string!')
  }
  if (typeof second !== 'string') {
    throw new Error('The second is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }

  if (_where === '') {
    _where = ` WHERE ${first} ${operator} ${second}`
  } else {
    _where = ` AND ${first} ${operator} ${second}`
  }

  return this
}

/**
 * [Get all sql query parameters]
 * @return {Array} [SQL Query parameters]
 */
exports.getParameters = () => {
  return _params
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
      _params.push(values[i])
    }
  }

  return this
}

/**
 * [Reset the query parameters for can work with another queries]
 */
exports.resetParameters = function () {
  _params = []
}

/**
 * [Prepare the sql query and set what kind of query is will used]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
exports.prepare = function () {
  if (_option === 'select') {
    _command = _select + _from + _join + _groupBy + _where + _orderBy + _limit + _skip
  } else if (_option === 'insert') {
    _command = _insert
  } else if (_option === 'update') {
    _command = _update + _where + _limit + _skip
  } else if (_option === 'delete') {
    _command = _delete + _where + _limit + _skip
  } else {
    _command = _where + _limit + _skip
  }

  _select = ''
  _from = ''
  _join = ''
  _groupBy = ''
  _where = ''
  _orderBy = ''
  _limit = ''
  _skip = ''
  _insert = ''
  _update = ''
  _delete = ''

  return _command
}

// New Features
exports.count = function () {

}

exports.union = function () {

}
