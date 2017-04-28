let common = require('../lib/utilities/Common')
let expect = require('chai').expect

describe('Test Return ? For Params', function () {
  it('should return ?, ? for "title, name"', function () {
    expect(common.returnSymbolParamsCount('title, name')).equal('?, ?')
  })
})
describe('Test Return ? For Params', function () {
  it('should return ? for "title, ', function () {
    expect(common.returnSymbolParamsCount('title, ')).equal('?')
  })
})
describe('Test Return ? For Params', function () {
  it('should return "" for ", ', function () {
    expect(common.returnSymbolParamsCount(', ')).to.throw(new Error('The columns is not recognized!'))
  })
})
describe('Test Return ? For Params', function () {
  it('should return ? for ["title", ""]', function () {
    expect(common.returnSymbolParamsCount(['title', ''])).equal('?')
  })
})
describe('Test Return ? For Params', function () {
  it('should return ?, ?, ? for ["title", "test", "test-2"]', function () {
    expect(common.returnSymbolParamsCount(['title', 'test', 'test-2'])).equal('?, ?, ?')
  })
})

describe('Test Return ? For Params', function () {
  it('should return "" for ["", "", ""]', function () {
    expect(common.returnSymbolParamsCount(['', '', ''])).to.throw(new Error('The columns is not recognized!'))
  })
})

describe('Test Return ? For Params', function () {
  it('should return "" for []', function () {
    expect(common.returnSymbolParamsCount([])).to.throw(new Error('The columns is not recognized!'))
  })
})

describe('Test Return ? For Params', function () {
  it('should return "" for ["", null, undefined]', function () {
    expect(common.returnSymbolParamsCount(['', null, undefined])).to.throw(new Error('The columns is not recognized!'))
  })
})

describe('Test Return ? For Params', function () {
  it('should return "" for ["", " ", ""]', function () {
    expect(common.returnSymbolParamsCount(['', ' ', ''])).to.throw(new Error('The columns is not recognized!'))
  })
})
