const mysql = require('mysql')
const qBuilder = require('./QueryBuilder')

let _query = ''
let _params = []

module.exports = (dbSetting) => {
  let connection = mysql.createConnection({
    host: dbSetting.hostname,
    user: dbSetting.username,
    password: dbSetting.password,
    database: dbSetting.database
  })

  return {
    makeQuery: () => {
      return qBuilder
    },
    prepare: () => {
      _query = qBuilder.prepare()
    },
    setParameters: (params) => {
      _params = params
      qBuilder.setParameters(params)
    },
    getParameters: () => {
      _params = qBuilder.getParameters()
    },
    execute: () => {
      // connection.query(_query)
    },
    get: () => {

    },
    connectToDatabase: () => {
      connection.connect()
    },
    endConnection: () => {
      connection.end()
    }
  }
}
