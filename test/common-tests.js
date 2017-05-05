let common = require('../lib/utilities/Common')
let expect = require('chai').expect

describe('Test returnSymbolParamsCount', function () {
  describe('With String', function () {
    it('should return ?, ? for "title, name"', function () {
      expect(common.returnSymbolParamsCount('title, name')).equal('?, ?')
    })
    it('should return ? for "title, ', function () {
      expect(common.returnSymbolParamsCount('title, ')).equal('?')
    })
    it('should throw for ", ', function () {
      expect(common.returnSymbolParamsCount(', ')).assert()
        .throw(new Error('The columns is not recognized!'))
    })
  })
  describe('With Array', function () {
    it('should return ? for ["title", ""]', function () {
      expect(common.returnSymbolParamsCount(['title', ''])).equal('?')
    })
    it('should return ?, ?, ? for ["title", "test", "test-2"]', function () {
      expect(common.returnSymbolParamsCount(['title', 'test', 'test-2'])).equal('?, ?, ?')
    })
    it('should throw for ["", "", ""]', function () {
      expect(common.returnSymbolParamsCount(['', '', ''])).assert()
        .throw(new Error('The columns is not recognized!'))
    })
    it('should throw for []', function () {
      expect(common.returnSymbolParamsCount([])).assert()
        .throw(new Error('The columns is not recognized!'))
    })
    it('should throw for ["", null, undefined]', function () {
      expect(common.returnSymbolParamsCount(['', null, undefined])).assert()
        .throw(new Error('The columns is not recognized!'))
    })
    it('should throw for ["", " ", ""]', function () {
      expect(common.returnSymbolParamsCount(['', ' ', '']))
        .throw(new Error('The columns is not recognized!'))
    })
  })
})
