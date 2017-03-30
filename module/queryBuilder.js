let _where,
  _select,
  _from,
  _orderBy,
  _groupBy,
  _limit,
  _skip,
  _join,
  _insert,
  _delete,
  _update,
  _command,
  _table,
  _option,
  _params

/**
 * [Generate ? symbol for sql query for every parameter]
 * @param  {Array} columns [List of all parameters on sql query]
 * @return {String}        [Correct syntax for query builder of parameters]
 */
function returnSymbolParamsCount (columns) {
  let length = columns.length
  let symbols = Array(length).join('?, ')
  return symbols.slice(0, -2)
}

module.exports = {

  /**
   * [Select clause of sql query which select the columns (properties) of records]
   * @param  {Array} columns [Array or String All selected columns from table]
   * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
   */
  select: function (columns) {
    if (Array.isArray(columns)) {
      _select = `SELECT ${columns.join(', ')}`
    } else if (columns.length > 0) {
      _select = `SELECT ${columns}`
    } else {
      throw new Error('The columns is not available in correct format!')
    }
    _option = 'select'
    return this
  },

  /**
   * [From clause of sql query which select the database table]
   * @param  {String} table [The name of database table]
   * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
   */
  from: function (table) {
    if (table.length > 0 && !Array.isArray(table)) {
      _from = ` FROM ${table}`
      _table = table
      return this
    } else {
      throw new Error('The table variable is required to be string!')
    }
  },

  /**
   * [Set the name of database table]
   * @param  {String} table [The name of database table]
   * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
   */
  table: function (table) {
    if (table.length > 0 && !Array.isArray(table)) {
      _table = table
      return this
    } else {
      throw new Error('The table variable is required to be string!')
    }
  },

  /**
   * [Add few more columns on select caluse of sql query]
   * @param  {String} columns [Array or String All selected columns from table]
   * @return {QueryBuilder}  [Query Builder Creator of sql queries and connect to database]
   */
  addSelect: function (columns) {
    if (!_select) {
      throw new Error('Please first use SELECT method before add new column on select method!')
    } else if (Array.isArray(columns)) {
      _select += ` ${columns.join(', ')}`
    } else if (columns.length > 0) {
      _select += ` ${columns}`
    } else {
      throw new Error('The columns is not available in correct format!')
    }
    return this
  },

  /**
   * [Insert clause on sql query which is create to add new record on database]
   * @param  {Array} columns [All columns which is to add on database]
   * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
   */
  add: function (columns) {
    if (Array.isArray(columns)) {
      let symbols = returnSymbolParamsCount(columns)
      if (symbols.length > 0) {
        _insert = 'INSERT INTO `' + _table + '` ( ' + symbols + ' ) VALUES ( ' + symbols + ' )'
        _option = 'insert'
        return this
      } else {
        throw new Error('The columns is empty!')
      }
    } else {
      throw new Error('The columns is required to be array!')
    }
  },

  /**
   * [Delete clause on sql query which is delete record from database]
   * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
   */
  delete: function () {
    if (_table) {
      _delete = `DELETE FROM ${_table}`
      _option = 'delete'
      return this
    } else {
      throw new Error('Is need to enter in which table is need to delete record!')
    }
  },

  /**
   * [Update clause on sql query which is update current record on database]
   * @param  {Array} columns [All columns which is update on databse]
   * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
   */
  update: function (columns) {
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
  },

  /**
   * [Join clause on sql query which is just join another table on sql query]
   * @param  {String} table [The database table which is need to join]
   * @param  {String} equal [The columns ids equals on both databases]
   * @param  {String} type  [Type of join clause (left, inner, outer etc)]
   * @return {QueryBuilder} [Query Builder Creator of sql queries and connect to database]
   */
  join: function (table, equal, type) {
    if (typeof table === 'string' && table.length > 1 &&
    typeof equal === 'string' && equal.length > 1) {
      _join += ` ${type} JOIN ${table} ON ${equal}`
      return this
    } else {
      throw new Error('The table and equal variable is required to be string!')
    }
  },

  /**
   * [Where clause on sql query which is check do column is some equal with param]
   * @param  {String} column         [Column from database table to check do is some equal with param]
   * @param  {String} [param=null]   [Value to check do column from database table is some equal with value]
   * @param  {String} [operator='='] [Operator for comparison the column and parameter]
   * @return {QueryBuilder}          [Query Builder Creator of sql queries and connect to database]
   */
  where: function (column, operator = '=', param = null) {
    if (typeof column === 'string' && typeof operator === 'string') {
      _where = ` WHERE ${column} ${operator.replace(/'"/g, '')} ?`
      if (param && !Array.isArray(param)) {
        _params[column] = param
      }
      return this
    } else {
      throw new Error('The column and operator variable is required to be string!')
    }
  }
}
