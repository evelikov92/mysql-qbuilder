/**
 * [Generate ? symbol for sql query for every parameter]
 * @param  {Array} columns [List of all parameters on sql query]
 * @return {String}        [Correct syntax for query builder of parameters]
 */
exports.returnSymbolParamsCount = (columns) => {
  let length = columns.length + 1
  let symbols = Array(length).join('?, ')
  return symbols.slice(0, -2)
}
