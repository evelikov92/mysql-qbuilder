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

module.exports = {
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
  from: function (table) {
    if (table.length > 0) {
      _table = ` FROM ${table}`
    } else {
      throw new Error('The table variable is required to be string!')
    }
    return this
  },
  addSelect: function (columns) {
    
  }
}
