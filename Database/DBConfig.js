var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('./Config.json')
// Create connection to database
class DatabaseConfig {
  constructor() {
    this.sqlConnection = new Connection(config)
  }
  startDatabase() {
    return new Promise((resolve, reject) => {
      this.sqlConnection.on('connect', (err) => {
        if (err) {
          console.log("Connection failed")
          reject(err)
          throw err;
        } else {
          console.log("Connected")
          resolve();
        }
      })
      this.sqlConnection.connect();
    })
  }
}


module.exports = DatabaseConfig;

module.exports = new DatabaseConfig().startDb

