const { Connection, Request } = require('tedious');
const config = require('./Config.json')

//Klasse for connection til databasen
//https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-nodejs?view=azuresql&tabs=macos

class DatabaseConnect {
    constructor() {
    this.connection = new Connection(config)
    }
    async connectTilDatabase() {
        return new Promise((resolve, reject) => {
            this.connection.on('connect', (err) => {
                    if (err) {
                      reject(err.message);
                      console.log('Kan ikke connecte')
                    } else {
                    console.log('Connected')
                      resolve(this);
            };
        })
        this.connection.connect()
        }
        )}}

async function tilknytDatabase() {
const database1 = new DatabaseConnect()
const database2 = await database1.connectTilDatabase()
return database2
}

tilknytDatabase()

//Vi eksporterer klassen og dermed også den tilhørende metode, så vi kan connecte i andre filer.

module.exports = { DatabaseConnect }