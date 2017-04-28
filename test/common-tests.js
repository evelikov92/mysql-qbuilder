let returnSymbolParamsCount = require('../lib/utilities/Common').returnSymbolParamsCount
let expect = require('chai').expect

describe('Test Return ? For Params', function () {
  it('should return ?, ? for "title, name"', function () {
    expect(returnSymbolParamsCount('title, name')).equal('?, ?')
  })
})
describe('Test Return ? For Params', function () {
  it('should return ? for "title, ', function () {
    expect(returnSymbolParamsCount('title, ')).equal('?')
  })
})
describe('Test Return ? For Params', function () {
  it('should return ? for ["title", ""]', function () {
    expect(returnSymbolParamsCount(['title', ''])).equal('?')
  })
})
describe('Test Return ? For Params', function () {
  it('should return ?, ?, ? for ["title", "test", "test-2"]', function () {
    expect(returnSymbolParamsCount(['title', 'test', 'test-2'])).equal('?, ?, ?')
  })
})
