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
  return symbols.slice(0, -2)
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
    if (table.length > 0 && !Array.isArray(table)) {
      _from = ` FROM ${table}`
      _table = table
      return this
    } else {
      throw new Error('The table variable is required to be string!')
    }
  },
  table: function (table) {
    if (table.length > 0 && !Array.isArray(table)) {
      _table = table
      return this
    } else {
      throw new Error('The table variable is required to be string!')
    }
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
        return this
      } else {
        throw new Error('The columns is empty!')
      }
    } else {
      throw new Error('The columns is required to be array!')
    }
  },
  delete: function () {
    if (_table) {
      _delete = `DELETE FROM ${_table}`
      _option = 'delete'
      return this
    } else {
      throw new Error('Is need to enter in which table is need to delete record!')
    }
  },
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
  }
}
