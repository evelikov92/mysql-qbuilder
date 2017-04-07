const queryBuilder = require('./QueryBuilder')
let parameters = require('./Parameters')
let _table = ''

/**
 * [setModel description]
 * @param {String} table [Database table for that schema]
 */
module.exports.setTable = function (table) {
  if (table === 'string') {
    _table = table
    return this
  } else {
    throw new Error('The table is not set!')
  }
}

/**
 * [Add new record on database]
 * @param  {Object} params [All columns with their values]
 */
module.exports.add = (params) => {
  if (_table === '') {
    throw new Error('The table is not set!')
  }
  if (typeof params !== 'object') {
    throw new Error('The params is need to be object with key column and value value of column!')
  }

  parameters.params = Object.valueOf(params)
  queryBuilder.makeQuery()
    .table(_table).add(Object.keys(params))
}

/**
 * [Make query for can take the first record from table]
 */
module.exports.getFirst = (columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  }
  if (!columns) {
    throw new Error('The columns is not set!')
  }
  queryBuilder.makeQuery()
    .from(_table)
    .select(columns)
    .take(1)
}

/**
 * [Make query for can take the last record from table]
 */
module.exports.getLast = (columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  }
  if (!columns) {
    throw new Error('The columns is not set!')
  }
  queryBuilder.makeQuery()
    .from(_table)
    .select(columns)
    .orderBy('id', true)
    .take(1)
}

/**
 * [Make query for can take all records from table]
 */
module.exports.getAll = (columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  }
  if (!columns) {
    throw new Error('The columns is not set!')
  }
  queryBuilder.makeQuery()
    .from(_table)
    .select(columns)
}

/**
 * [findById description]
 * @return {[type]} [description]
 */
module.exports.findById = (columns = '*') => {

}

/**
 * [Find record on database by one state]
 * @param  {Object} column [Column on database. For example { id: '5'} means find element with id 5]
 * @return {Object}        [Record from database by current schema which is set before]
 */
module.exports.findByField = (columns = '*', column) => {

}
