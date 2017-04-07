module.exports.select = ''
module.exports.from = ''
module.exports.orderBy = ''
module.exports.groupBy = ''
module.exports.limit = ''
module.exports.skip = ''
module.exports.join = ''
module.exports.insert = ''
module.exports.delete = ''
module.exports.update = ''
module.exports.table = ''
module.exports.union = ''
module.exports.count = ''
module.exports.where = ''

module.exports.command = ''
module.exports.option = ''
module.exports.params = []

module.exports.prepare = function () {
  if (this.option === 'select') {
    this.command = this.select + this.from +
      this.join + this.groupBy + this.where +
      this.orderBy + this.limit + this.skip
  } else if (this.option === 'insert') {
    this.command = this.insert
  } else if (this.option === 'update') {
    this.command = this.update + this.where + this.limit + this.skip
  } else if (this.option === 'delete') {
    this.command = this.delete + this.where + this.limit + this.skip
  } else {
    this.command = this.where + this.limit + this.skip
  }

  this.select = ''
  this.from = ''
  this.join = ''
  this.where = ''
  this.groupBy = ''
  this.orderBy = ''
  this.limit = ''
  this.skip = ''
  this.insert = ''
  this.update = ''
  this.delete = ''
}
