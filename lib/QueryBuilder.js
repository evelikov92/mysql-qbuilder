const parameters = require('./Parameters')
const common = require('./utilities/Common')

/**
 * [Select clause of sql query which select the columns (properties) of records]
 * @param  {Array} columns [Array or String All selected columns from table]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
module.exports.select = function (columns) {
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
module.exports.from = function (table) {
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
module.exports.table = function (table) {
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
module.exports.addSelect = function (columns) {
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
module.exports.add = function (columns) {
  if (Array.isArray(columns)) {
    let symbols = common.returnSymbolParamsCount(columns)

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
module.exports.delete = function () {
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
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
module.exports.update = function (columns) {
  if (!Array.isArray(columns)) {
    throw new Error('The columns variable is required to be array!')
  }

  if (!parameters.table) {
    throw new Error('Is need to enter in which table is need to delete record!')
  }

  let cl = columns.map(cl => { return cl + ' = ?, ' })
  parameters.update = `UPDATE ${parameters.table} SET ${cl.join('').slice(0, -2)}`
  parameters.option = 'update'

  return this
}

/**
 * [Try to add new record on database or if is exists then just update with new values]
 * @param  {Array} addParams     [All columns which is to add on database]
 * @param  {Array} updateParams  [All columns which is update on databse]
 * @return {QueryBuilder}        [Query Builder Creator of sql queries and connect to database]
 */
module.exports.addOrUpdate = function (addParams, updateParams) {
  if (!Array.isArray(addParams) || !Array.isArray(updateParams)) {
    throw new Error('The params variables is required to be array!')
  }
  if (!parameters.table) {
    throw new Error('Is need to enter in which table is need to delete record!')
  }

  let addSymbols = common.returnSymbolParamsCount(addParams)
  let updateColumns = updateParams.map(cl => { return cl + ' = ?' })

  parameters.insert = `INSERT INTO ${parameters.table} ( ${addParams.join(', ')} )
    VALUES ( ${addSymbols} )
    ON DUPLICATE KEY UPDATE ${updateColumns}`
  parameters.option = 'insert'
}

/**
 * [Join clause on sql query which is just join another table on sql query]
 * @param  {String} table [The database table which is need to join]
 * @param  {String} equal [The columns ids equals on both databases]
 * @param  {String} type  [Type of join clause (left, inner, outer etc)]
 * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
 */
module.exports.join = function (table, equal, type = '') {
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
module.exports.take = function (limit) {
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
module.exports.skip = function (count) {
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
module.exports.orderBy = function (column, isDesc = false) {
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
module.exports.groupBy = function (column, isDesc = false) {
  if (typeof column !== 'string') {
    throw new Error('The column variable is required to be string!')
  }

  parameters.groupBy = ` GROUP BY ${column} `

  if (isDesc) {
    parameters.groupBy += ' DESC '
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
module.exports.where = function (column, operator = '=', param = null) {
  if (typeof column === 'string' && typeof operator === 'string') {
    parameters.where = ` WHERE ${column} ${operator} ?`

    if (param && !Array.isArray(param)) {
      parameters.params.push(param)
    }

    return this
  } else {
    throw new Error('The column and operator variable is required to be string!')
  }
}

/**
 * [Where clause on sql query which is check do condition is not true]
 * @param  {String} column         [Column from database table to check do is some equal with param]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereNot = function (column, operator = '=', param = null, andOr = 'AND') {
  if (parameters.where === '') {
    parameters.where = ` WHERE NOT ${column} ${operator} ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} NOT ${column} ${operator} ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }
}

/**
 * [If is used the where clause then that is next where clause if is need both to be true]
 * @param  {String} column         [Column from database table to check do is some equal with param]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.andWhere = function (column, operator = '=', param = null) {
  if (parameters.where === '') {
    throw new Error('Please first use WHERE method before add new column on select method!')
  }
  if (typeof column === 'string' && typeof operator === 'string') {
    parameters.where += ` AND ${column} ${operator} ?`

    if (param && !Array.isArray(param)) {
      parameters.params.push(param)
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
module.exports.orWhere = function (column, operator = '=', param = null) {
  if (parameters.where === '') {
    throw new Error('Please first use WHERE method before add new column on select method!')
  }
  if (typeof column === 'string' && typeof operator === 'string') {
    parameters.where += ` OR ${column} ${operator} ?`

    if (param && !Array.isArray(param)) {
      parameters.params.push(param)
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
module.exports.andOrWhere = function (column, firstOperator = '=', secondOperator = '=', param = null) {
  if (typeof column !== 'string' || typeof firstOperator !== 'string' || typeof secondOperator !== 'string') {
    throw new Error('The column, firstOperator and secondOperator is required to be string!')
  }
  if (parameters.where === '') {
    parameters.where = ` WHERE ( ${column} ${firstOperator} ? OR ${column} ${secondOperator} ? )`
  } else {
    parameters.where += ` AND ( ${column} ${firstOperator} ? OR ${column} ${secondOperator} ? )`
  }
  if (param && !Array.isArray(param)) {
    parameters.params.push(param)
  }
  return this
}

/**
 * [Where find all records which the column is null]
 * @param  {String} column [Column on table which is to check do is null]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereNull = function (column, andOr = 'AND') {
  if (typeof column === 'string') {
    if (parameters.where === '') {
      parameters.where = ` WHERE ${column} is null `
    } else {
      andOr = andOr.toUpperCase()
      if (andOr === 'AND' || andOr === 'OR') {
        parameters.where = ` ${andOr} ${column} is null`
      } else {
        throw new Error('The andOr variable is required to be AND or OR!')
      }
    }

    return this
  } else {
    throw new Error('The column is required to be string!')
  }
}

/**
 * [Where find all records which the column is NOT null]
 * @param  {String} column [Column on table which is to check do is null]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereNotNull = function (column, andOr = 'AND') {
  if (typeof column === 'string') {
    if (parameters.where === '') {
      parameters.where = ` WHERE ${column} is not null `
    } else {
      andOr = andOr.toUpperCase()
      if (andOr === 'AND' || andOr === 'OR') {
        parameters.where = ` ${andOr} ${column} is not null`
      } else {
        throw new Error('The andOr variable is required to be AND or OR!')
      }
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
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}       [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereBetween = function (column, params = [], andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} BETWEEN ? AND ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} ${column} BETWEEN ? AND ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (params.length > 0) {
    if (params.length === 2) {
      for (let i = 0; i < 2; i++) {
        parameters.params.push(params[i])
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
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}       [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereNotBetween = function (column, params = [], andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} NOT BETWEEN ? AND ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} ${column} NOT BETWEEN ? AND ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (params.length > 0) {
    if (params.length === 2) {
      for (let i = 0; i < 2; i++) {
        parameters.params.push(params[i])
      }
    } else {
      throw new Error('The params is required to be Array with length 2')
    }
  }
  return this
}

/**
 * [Where find all records which is like set parameters]
 * @param  {String} column         [Column on table which is to check do is have record like that parameters]
 * @param  {Array}  [params=[]]    [Values to check do have record like that values]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereIn = function (column, params = [], andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  let symbols = common.returnSymbolParamsCount(params)
  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} IN ( ${symbols} )`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} ${column} IN ( ${symbols} )`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (params.length > 0) {
    for (let i = 0, len = params.length; i < len; i++) {
      parameters.params.push(params[i])
    }
  }
  return this
}

/**
 * [Where find all records which is NOT like set parameters]
 * @param  {String} column         [Column on table which is to check do is have record NOT like that parameters]
 * @param  {Array} [params=[]]     [Values to check do NOT have record like that values]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereNotIn = function (column, params = [], andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  let symbols = common.returnSymbolParamsCount(params)
  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} NOT IN ( ${symbols} )`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} ${column} NOT IN ( ${symbols} )`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (params.length > 0) {
    for (let i = 0, len = params.length; i < len; i++) {
      parameters.params.push(params[i])
    }
  }

  return this
}

/**
 * [Find all records where the column value is have specific year]
 * @param  {String} column        [Column on table which is with some date time format]
 * @param  {String} [operator=''] [Operator for comparison the column and parameter]
 * @param  {Number} year          [Specific year which the condition is checked]
 * @param  {String} [andOr='AND'] [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}         [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereYear = function (column, operator = '=', year = 0, andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }
  if (typeof andOr !== 'string') {
    throw new Error('The andOr is required to be string!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE YEAR(${column}) ${operator} ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} YEAR(${column}) ${operator} ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (year) {
    parameters.params.push(year)
  }

  return this
}

/**
 * [Find all records where the column value is have specific month]
 * @param  {String} column         [Column on table which is with some date time format]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {Number} month          [Specific month which the condition is checked]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereMonth = function (column, operator = '=', month = 0, andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }
  if (typeof andOr !== 'string') {
    throw new Error('The andOr is required to be string!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE MONTH(${column}) ${operator} ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} MONTH(${column}) ${operator} ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (month) {
    parameters.params.push(month)
  }

  return this
}

/**
 * [Find all records where the column value is have specific day]
 * @param  {String} column         [Column on table which is with some date time format]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {Number} day            [Specific day which the condition is checked]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereDay = function (column, operator = '=', day = 0, andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }
  if (typeof andOr !== 'string') {
    throw new Error('The andOr is required to be string!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE DAY(${column}) ${operator} ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} DAY(${column}) ${operator} ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  if (day) {
    parameters.params.push(day)
  }

  return this
}

/**
 * [Where date is find record by date time]
 * @param  {String} column         [Column on table which is with some date time format]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [date=null]    [What date is to be equal]
 * @param  {String} [andOr='AND']  [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereDate = function (column, operator = '=', date = null, andOr = 'AND') {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE ${column}.Date ${operator} ?`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} ${column}.Date ${operator} ?`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }
  if (date) {
    parameters.params.push(date)
  }

  return this
}

/**
 * [Where column is first column of record to be equal of second column of record]
 * @param  {String} first            [First column of record]
 * @param  {String} second           [Second column of record]
 * @param  {String} [operator='=']   [Operator for comparison the first and second columnd
 * @param  {String} [andOr='AND']    [If before has another where clause then is possible to choose AND or OR]
 * @return {QueryBuilder}            [Query Builder Creator of sql queries and connect to database]
 */
module.exports.whereColumn = function (first, second, operator = '=', andOr = 'AND') {
  if (typeof first !== 'string') {
    throw new Error('The first is required to be string!')
  }
  if (typeof second !== 'string') {
    throw new Error('The second is required to be string!')
  }
  if (typeof operator !== 'string') {
    throw new Error('The operator is required to be string!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE ${first} ${operator} ${second}`
  } else {
    andOr = andOr.toUpperCase()
    if (andOr === 'AND' || andOr === 'OR') {
      parameters.where = ` ${andOr} ${first} ${operator} ${second}`
    } else {
      throw new Error('The andOr variable is required to be AND or OR!')
    }
  }

  return this
}
