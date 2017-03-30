const mysql = require('mysql')
const qBuilder = require('./QueryBuilder')

let query = ''
let params = []

module.exports = (dbSetting) => {
  let connection = mysql.createConnection({
    host: dbSetting.hostname,
    user: dbSetting.username,
    password: dbSetting.password,
    database: dbSetting.database
  })

  connection.connect()

  return {
    makeQuery: () => {
      return qBuilder
    },
    prepare: () => {
      query = qBuilder.prepare()
    },
    setParameters: (params) => {
      qBuilder.setParameters(params)
    },
    getParameters: () => {
      params = qBuilder.getParameters()
    },
    execute: () => {
      // connection.query(query)
    },
    get: () => {

    }
  }
}
