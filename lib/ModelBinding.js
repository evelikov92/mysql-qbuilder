let qBuilder = require('./QueryBuilder')
let _schema = {}
let _table = ''

/**
 * [setModel description]
 * @param {Object} schema [description]
 * @param {String} table [Database table for that schema]
 */
exports.setSchema = (schema, table) => {
  if (typeof schema === 'object' && typeof table === 'string') {
    _schema = schema
    _table = table
  } else {
    throw new Error('The Db schema is not correct')
  }
}

/**
 * [create description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
exports.create = (params) => {

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
 * [findByField description]
 * @param  {[type]} field [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
exports.findByField = (field, value) => {

}
