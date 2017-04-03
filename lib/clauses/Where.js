const common = require('../utilities/Common')
const parameters = require('./Parameters')

/**
 * [Where clause on sql query which is check do column is some equal with param]
 * @param  {String} column         [Column from database table to check do is some equal with param]
 * @param  {String} [operator='='] [Operator for comparison the column and parameter]
 * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
 * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
 */
exports.where = function (column, operator = '=', param = null) {
  if (typeof column === 'string' && typeof operator === 'string') {
    parameters.where = ` WHERE ${column} ${operator.replace(/'"/g, '')} ?`

    if (param && !Array.isArray(param)) {
      parameters.params.push(param)
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
  if (parameters.where === '') {
    throw new Error('Please first use WHERE method before add new column on select method!')
  }
  if (typeof column === 'string' && typeof operator === 'string') {
    parameters.where += ` AND ${column} ${operator.replace(/'"/g, '')} ?`

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
exports.orWhere = function (column, operator = '=', param = null) {
  if (parameters.where === '') {
    throw new Error('Please first use WHERE method before add new column on select method!')
  }
  if (typeof column === 'string' && typeof operator === 'string') {
    parameters.where += ` OR ${column} ${operator.replace(/'"/g, '')} ?`

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
exports.andOrWhere = function (column, firstOperator = '=', secondOperator = '=', param = null) {
  if (typeof column !== 'string' || typeof firstOperator !== 'string' || typeof secondOperator !== 'string') {
    throw new Error('The column, firstOperator and secondOperator is required to be string!')
  }
  if (parameters.where === '') {
    parameters.where = ` WHERE ( ${column} ${firstOperator.replace(/'"/g, '')} ? OR ${column} ${secondOperator.replace(/'"/g, '')} ? )`
  } else {
    parameters.where += ` AND ( ${column} ${firstOperator.replace(/'"/g, '')} ? OR ${column} ${secondOperator.replace(/'"/g, '')} ? )`
  }
  if (param && !Array.isArray(param)) {
    parameters.params.push(param)
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
    if (parameters.where === '') {
      parameters.where = ` WHERE ${column} is null `
    } else {
      parameters.where = ` AND ${column} is null`
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
    if (parameters.where === '') {
      parameters.where = ` WHERE ${column} is not null `
    } else {
      parameters.where = ` AND ${column} is not null`
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

  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} BETWEEN ? AND ?`
  } else {
    parameters.where = ` AND ${column} BETWEEN ? AND ?`
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
 * @return {QueryBuilder}       [Query Builder Creator of sql queries and connect to database]
 */
exports.whereNotBetween = function (column, params = []) {
  if (typeof column !== 'string') {
    throw new Error('The column is required to be string!')
  }
  if (!Array.isArray(params)) {
    throw new Error('The params is required to be Array!')
  }

  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} NOT BETWEEN ? AND ?`
  } else {
    parameters.where = ` AND ${column} NOT BETWEEN ? AND ?`
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

  let symbols = common.returnSymbolParamsCount(params)
  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} IN ( ${symbols} )`
  } else {
    parameters.where = ` AND ${column} IN ( ${symbols} )`
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

  let symbols = common.returnSymbolParamsCount(params)
  if (parameters.where === '') {
    parameters.where = ` WHERE ${column} NOT IN ( ${symbols} )`
  } else {
    parameters.where = ` AND ${column} NOT IN ( ${symbols} )`
  }

  if (params.length > 0) {
    for (let i = 0, len = params.length; i < len; i++) {
      parameters.params.push(params[i])
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

  if (parameters.where === '') {
    parameters.where = ` WHERE ${dateType} ( ${column}) ${operator} ?`
  } else {
    parameters.where = ` AND ${dateType} ( ${column}) ${operator} ?`
  }
  if (date) {
    parameters.params.push(date)
  }

  return this
}

/**
 * [description]
 * @param  {String} column   [description]
 * @param  {Number} year     [description]
 * @param  {String} operator [description]
 * @return {QueryBuilder}          [description]
 */
exports.whereYear = function (column, year, operator) {

}

/**
 * [description]
 * @param  {String} column   [description]
 * @param  {Number} month    [description]
 * @param  {String} operator [description]
 * @return {QueryBuilder}          [description]
 */
exports.whereMonth = function (column, month, operator) {

}

/**
 * [description]
 * @param  {String} column   [description]
 * @param  {Number} day      [description]
 * @param  {String} operator [description]
 * @return {QueryBuilder}          [description]
 */
exports.whereDay = function (column, day, operator) {

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

  if (parameters.where === '') {
    parameters.where = ` WHERE ${first} ${operator} ${second}`
  } else {
    parameters.where = ` AND ${first} ${operator} ${second}`
  }

  return this
}

exports.whereExists = function () {

}
