var Connection = require('tedious').Connection;
var Request = require('tedious').Request
const config = require('./Config.json')

async function connectTilDb (sql) {
  return new Promise((resolve, reject) => {
    var connection = new Connection(config)
    connection.on('connect', function (err) {
      if (err) {
        reject(err);
      } else {
        request = new Request(sql, function (err) {
          if (err) {
            reject(err);
          }
        })
        connection.execSql(request)
        var counter = 1
        response = {}
        request.on('row', function (columns) {
          response[counter] = {}
          columns.forEach(function (column) {
            response[counter][column.metadata.colName] = column.value
          });
          counter += 1
        });
        request.on('requestCompleted', () => {
          resolve(response)
          console.log('vierker')
        });
      }
    });
    connection.connect()
  });
}
module.exports = connectTilDb

console.log(connectTilDb)