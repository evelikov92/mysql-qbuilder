let qBuilder = require('./QueryBuilder')
let _schema = {}
let _table = ''

/**
 * [setModel description]
 * @param {Object} schema [description]
 * @param {String} table [Database table for that schema]
 */
exports.setSchema = function (schema, table) {
  if (typeof schema === 'object' && typeof table === 'string') {
    _schema = schema
    _table = table
    return this
  } else {
    throw new Error('The Db schema is not correct or the table is not set')
  }
}

/**
 * [create description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
exports.create = (params) => {
  if (_schema) {
    return qBuilder
      .table(_table)
      .add(Object.keys(_schema))
      .setParameters(params)
      .prepare()
  }
}

/**
 * [getFirst description]
 * @return {[type]} [description]
 */
exports.getFirst = () => {

}

/**
 * [getLast description]
 * @return {[type]} [description]
 */
exports.getLast = () => {

}

/**
 * [getAll description]
 * @return {[type]} [description]
 */
exports.getAll = () => {

}

/**
 * [findById description]
 * @return {[type]} [description]
 */
exports.findById = () => {

}

/**
 * [Find record on database by one state]
 * @param  {Object} column [Column on database. For example { id: '5'} means find element with id 5]
 * @return {Object}        [Record from database by current schema which is set before]
 */
exports.findByField = (column) => {

}
