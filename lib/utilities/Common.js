/**
 * [checkTheParams description]
 * @param  {String} params [description]
 * @return {Array}         [description]
 */
function convertStringToArray (params) {
  if (typeof params !== 'string') {
    throw new Error('The columns is not recognized!')
  } else if (!new RegExp(/[0-9a-zA-Z]/g).test(params)) {
    throw new Error('The columns is not recognized!')
  }
  return params.trim().split(', ')
}

/**
 * [Generate ? symbol for sql query for every parameter]
 * @param  {Object} columns [List of all parameters on sql query]
 * @return {String}        [Correct syntax for query builder of parameters]
 */
exports.returnSymbolParamsCount = (columns) => {
  if (!Array.isArray(columns)) {
    columns = convertStringToArray(columns)
  }

  columns = columns.filter((x) => { if (x) return x.trim() })

  if (columns.length === 0) {
    throw new Error('The columns is not recognized!')
  }

  let length = columns.length + 1
  let symbols = Array(length).join('?, ')
  return symbols.slice(0, -2)
}
