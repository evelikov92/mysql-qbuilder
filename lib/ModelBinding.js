const queryBuilder = require('./QueryBuilder')
let parameters = require('./Parameters')
let _table = ''

/**
 * [setModel description]
 * @param {String} table [Database table for that schema]
 */
module.exports.setTable = function (table) {
  if (typeof table === 'string') {
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

  queryBuilder.table(_table).add(Object.keys(params))
  parameters.prepare()
  parameters.params = Object.valueOf(params)
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
  queryBuilder.from(_table)
    .select(columns)
    .take(1)
  parameters.prepare()
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
  queryBuilder.from(_table)
    .select(columns)
    .orderBy('id', true)
    .take(1)
  parameters.prepare()
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
  queryBuilder.from(_table).select(columns)
  parameters.prepare()
}

/**
 * [findById description]
 * @param  {[type]} id            [description]
 * @param  {String} [columns='*'] [description]
 * @return {[type]}               [description]
 */
module.exports.findById = (id, columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  }
  if (!columns) {
    throw new Error('The columns is not set!')
  }
  if (!id) {
    throw new Error('The id is not set!')
  }

  queryBuilder.from(_table)
    .select(columns)
    .where('id', '=', id)
  parameters.prepare()
}

/**
 * [Find record on database by one state]
 * @param  {Object} column           [Column on database. For example { id: '5'} means find element with id 5]
 * @param {String} columns           []
 * @param  {String} [andOr='AND']    [If before has another where clause then is possible to choose AND or OR]
 */
module.exports.findByFields = (column, columns = '*', andOr = 'AND') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  }
  if (!columns) {
    throw new Error('The columns is not set!')
  }
  if (!column) {
    throw new Error('The id is not set!')
  }

  let firstKey = Object.keys(column)

  queryBuilder.from(_table)
    .select(columns)
    .where(firstKey, '=', column[firstKey])

  delete column[firstKey]

  if (column) {
    for (let key in column) {
      queryBuilder.andWhere(key, '=', column[key])
    }
  }

  parameters.prepare()
}
