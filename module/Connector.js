const mysql = require('mysql')

module.exports = (dbSetting) => {
  let connection = mysql.createConnection({
    host: dbSetting.hostname,
    user: dbSetting.username,
    password: dbSetting.password,
    database: dbSetting.database
  })

  return connection
}
