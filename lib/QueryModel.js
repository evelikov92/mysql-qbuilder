const queryBuilder = require('./QueryBuilder')
let parameters = require('./Parameters')
let _table = ''

/**
 * [Add More Conditions to the SQL Query]
 * @param {Object} conditions [description]
 * @param {String} andOr      [If before has another where clause then is possible to choose AND or OR]
 */
function addMoreConditions (conditions, andOr) {
  andOr = andOr.toLowerCase()
  if (andOr !== 'and' && andOr !== 'or') {
    throw new Error('The andOr variable is required to be AND or OR!')
  }

  let method = `${andOr}Where`
  for (let key in conditions) {
    if (conditions.hasOwnProperty(key)) {
      queryBuilder[method](key, '=', conditions[key])
    }
  }
}

/**
 * [setModel description]
 * @param {String} [table=''] [Database table for that schema]
 */
module.exports.setTable = function (table = '') {
  if (_table === '') {
    if (typeof table === 'string' && table !== '') {
      _table = table
      return this
    } else {
      throw new Error('The table is not set!')
    }
  } else {
    if (typeof table === 'string' && table !== '') {
      _table = table
    }
    return this
  }
}

/**
 * [Add new record on database]
 * @param  {Object} params [All columns with their values]
 */
module.exports.add = (params) => {
  if (_table === '') {
    throw new Error('The table is not set!')
  } else if (typeof params !== 'object') {
    throw new Error('The params is need to be object with key column and value value of column!')
  }

  queryBuilder.table(_table).add(Object.keys(params))
  parameters.prepare()

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      parameters.params.push(params[key])
    }
  }
}

/**
 * [Make query for can take the first record from table]
 * @param  {String} [columns='*'] [All columns which You want to get from database]
 */
module.exports.getFirst = (columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  } else if (!columns) {
    throw new Error('The columns is not set!')
  }

  queryBuilder.from(_table)
    .select(columns).take(1)

  parameters.prepare()
}

/**
 * [Make query for can take the last record from table]
 * @param  {String} [columns='*'] [All columns which You want to get from database]
 */
module.exports.getLast = (columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  } else if (!columns) {
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
 * @param  {String} [columns='*'] [All columns which You want to get from database]
 */
module.exports.getAll = (columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  } else if (!columns) {
    throw new Error('The columns is not set!')
  }

  queryBuilder.from(_table).select(columns)
  parameters.prepare()
}

/**
 * [Make query for can find record by id on table]
 * @param  {Object} id            [The Id of the record, Or Array of Ids]
 * @param  {String} [columns='*'] [All columns which You want to get from database]
 */
module.exports.findById = (id, columns = '*') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  } else if (!columns) {
    throw new Error('The columns is not set!')
  } else if (!id) {
    throw new Error('The id is not set!')
  }

  queryBuilder.from(_table).select(columns)
  if (Array.isArray(id)) {
    for (let i = 0, len = id.length; i < len; i++) {
      queryBuilder.orWhere('id', '=', id[0])
    }
  } else {
    queryBuilder.where('id', '=', id)
  }

  parameters.prepare()
}

/**
 * [Find records on database by many search conditions or (only one)]
 * @param  {Object} conditions       [Columns on database. For example { id: '5'} means find element with id 5]
 * @param {String} columns           [All columns which You want to get from database]
 * @param  {String} [andOr='AND']    [Choose do You want every condition to be true or only one is enough]
 */
module.exports.findByFields = (conditions, columns = '*', andOr = 'AND') => {
  if (_table === '') {
    throw new Error('The table is not set!')
  } else if (!columns) {
    throw new Error('The columns is not set!')
  } else if (!conditions) {
    throw new Error('The id is not set!')
  }

  let firstKey = Object.keys(conditions)[0]
  queryBuilder.from(_table)
    .select(columns)
    .where(firstKey, '=', conditions[firstKey])

  delete conditions[firstKey]
  if (conditions) {
    addMoreConditions(conditions, andOr)
  }

  parameters.prepare()
}
