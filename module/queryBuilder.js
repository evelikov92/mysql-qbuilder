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

function returnSymbolParamsCount (columns) {
  let length = columns.length
  let symbols = Array(length).join('?, ')
  let v = symbols.slice(0, -2)
  return v
}

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
      _from = ` FROM ${table}`
    } else {
      throw new Error('The table variable is required to be string!')
    }
    return this
  },
  table: function (table) {
    if (table.length > 0) {
      _table = table
    } else {
      throw new Error('The table variable is required to be string!')
    }
    return this
  },
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
  add: function (columns) {
    if (Array.isArray(columns)) {
      let symbols = returnSymbolParamsCount(columns)
      if (symbols.length > 0) {
        _insert = 'INSERT INTO `' + _table + '` ( ' + symbols + ' ) VALUES ( ' + symbols + ' )'
        _option = 'insert'
      } else {
        throw new Error('The columns is empty!')
      }
    } else {
      throw new Error('The columns is required to be array!')
    }

    return this
  }
}
