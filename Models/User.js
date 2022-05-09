var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

const { DatabaseConnect } = require('../Database/DBConfig')

class User {
    constructor(id, name, password, status_id, følger) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.status_id= status_id;
        this.følger = følger;
    }
async createBruger(payload) {
        console.log("Vi prøver at lave en bruger")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
return new Promise((resolve, reject) => {
const sql = 'INSERT INTO dbo.users (id, name, password, status_id, følger) VALUES (@id, @name, @password, @status_id, @følger)'
const request = new Request(sql,(err) => {
    if (err) {
    reject(err);
        console.log('Kan ikke tilføje bruger');
        }})
            request.addParameter('id', TYPES.Int, payload.id);
            request.addParameter('name', TYPES.VarChar, payload.name);
            request.addParameter('password', TYPES.VarChar, payload.password);
            request.addParameter('status_id', TYPES.Int, payload.status_id);
            request.addParameter('følger', TYPES.VarChar, payload.følger);
            
            request.on('requestCompleted', (row) => { 
                console.log('Bruger indsat', row)
                resolve('User inserted', row)
            })
            connectTilDatabasen.connection.execSql(request)
    })}

































/*


    async insert(payload) {
        console.log("Vi prøver at lave en bruger")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const srequest = new Request(
                'INSERT INTO dbo.users (user_id, name, password, status) VALUES (@user_id, @name, @password, @status)',
                function (err, rowCount, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(rowCount + ' row(s) inserted');
                        callback(null, 'Nikita', 'United States');
                    }
                });

            srequest.addParameter('user_id', TYPES.Int, payload);
            srequest.addParameter('name', TYPES.NVarChar, payload);
            srequest.addParameter('password', TYPES.NVarChar, this.password);
            srequest.addParameter('status', TYPES.Int, this.status);
            

            resolve(this)

            connectTilDatabasen.connection.execSql(srequest)
        })
    }

    async getAllUsers() {
        console.log("Vi prøver at hente alle brugere i databasen")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const request = new Request(
                'SELECT * FROM [dbo].[Users]',
                (err, rowCount) => {
                    if (err) {
                        reject(err.message);
                        console.error("Kan ikke hente users");
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                    }
                }
            );
            request.on('row', (column) => {
                this.user_id = column[0].value
                this.name = column[1].value
                this.password = column[2].value
                this.status = column[3].value

                console.log('alle brugere modtaget');
                resolve(this)
            });
            connectTilDatabasen.connection.execSql(request)
        });
    } 







*/
}




/*async function inst() {
    const bruger1 = new User(user_id = 2, name ='da', password = 213, status_id = 321, følger = 'be');
    const bruger2 = await bruger1.insert(user_id = 2, name ='da', password = 213, status_id = 321, følger = 'be')
    console.log(bruger2)
}
*/



module.exports = { User }

