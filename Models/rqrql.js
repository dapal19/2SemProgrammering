var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

const { DatabaseConnect } = require('../Database/DBConfig')


async function Insert(name, location, callback) {console.log("Vi prøver at hente alle brugere i databasen")
//Instansierer klassen fra DBConfig
const connectTilDatabasen = new DatabaseConnect()
try {
    await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
} catch (error) {
    console.log("Fejl i connection")
}
return new Promise((resolve, reject) => {
    console.log("Inserting '" + name + "' into Table...");
    request = new Request(
        'INSERT INTO dbo.Users (user_id, name, password, status_id, følger) VALUES (@user_id, @name, @password, @status_id, @følger);',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) inserted');
            callback(null, 'Nikita', 'United States');
        }
        });
        request.addParameter('user_id', TYPES.Int, this.user_id);
        request.addParameter('name', TYPES.NVarChar, this.name);
        request.addParameter('password', TYPES.NVarChar, this.password);
        request.addParameter('status_id', TYPES.Int, this.status_id);
        request.addParameter('følger', TYPES.NVarChar, this.følger);

    // Execute SQL statement
    connection.execSql(request);
}