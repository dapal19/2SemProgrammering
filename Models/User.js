var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');


const { DatabaseConnect } = require('../Database/DBConfig')

class User {
    constructor(user_id, name, password, status_id, følger) {
        this.user_id = user_id;
        this.name = name;
        this.password = password;
        this.status_id = status_id;
        this.følger = følger;
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
                'SELECT * FROM dbo.users',
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
                this.status_id = column[3].value
                this.følger = column[4].value

                console.log('alle brugere modtaget');
                resolve(this)
            });
            connectTilDatabasen.connection.execSql(request)
        });
    }
    async createBruger() {
        console.log("Vi prøver at lave en bruger")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const request = new Request(
                'INSERT INTO dbo.Users (user_id, name, password, status_id, følger) VALUES (@user_id, @name, @password, @status_id, @følger)',
                (err) => {
                    if (err) {
                        reject(err.message);
                        console.error("Kan ikke indsætte users");
                    } else {
                        console.log(`${rowCount} row(s) inserted`);
                    }
                }
            )
            request.addParameter('user_id', TYPES.Int, this.user_id);
            request.addParameter('name', TYPES.NVarChar, this.name);
            request.addParameter('password', TYPES.NVarChar, this.password);
            request.addParameter('status_id', TYPES.Int, this.status_id);
            request.addParameter('følger', TYPES.NVarChar, this.følger);
            console.log('bruger lavet');

            resolve(this)

            connectTilDatabasen.connection.execSql(request)
        });
    }
   async insert(user_id, name, password, status_id, følger, callback) {
        console.log("Inserting '" + user_id + name + password + status_id + følger + "' into Table...");
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
            'INSERT INTO dbo.Users (user_id, name, password, status_id, følger) VALUES (@user_id, @name, @password, @status_id, @følger)',
            function(err, rowCount, rows) {
            if (err) {
                reject(err);
            } else {
                console.log(rowCount + ' row(s) inserted');
                callback(null, 'Nikita', 'United States');
            }
            });

            srequest.addParameter('user_id', TYPES.Int, this.user_id);
            srequest.addParameter('name', TYPES.NVarChar, this.name);
            srequest.addParameter('password', TYPES.NVarChar, this.password);
            srequest.addParameter('status_id', TYPES.Int, this.status_id);
            srequest.addParameter('følger', TYPES.NVarChar, this.følger);
    
            resolve(this)

            connectTilDatabasen.connection.execSql(srequest)
    })
}










}

async function getUsers() {
    const user1 = new User();
    const user2 = await user1.getAllUsers()
    console.log(user2)
}
getUsers()

async function inst() {
    const bruger1 = new User(user_id = 2, name ='da', password = 213, status_id = 321, følger = 'be');
    const bruger2 = await bruger1.insert(user_id = 2, name ='da', password = 213, status_id = 321, følger = 'be')
    console.log(bruger2)
}

inst()



module.exports = { User }

