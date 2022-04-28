const { rows } = require('mssql');
var connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

const DatabaseConfig = require('../Database/DBConfig')

class User {
    constructor(user_id, name, password, status_id, følger) {
        this.user_id = user_id;
        this.name = name;
        this.password = password;
        this.status_id = status_id;
        this.følger = følger;
    }
    async getAllUsers() {
        console.log('getalluser starter')
        let db = new DatabaseConfig()
        try {
            console.log('ss')
            await db.startDatabase(); //start db connection
        } catch (error) {
            console.log("Error connecting to the database", error.message)
        }
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM dbo.users'
            console.log('Ss')
            const request = new Request(sql, (err) => {
                if (err) {
                    reject(err)
                    console.log(err)
                }
            });
            request.on('requestCompleted', () => {
                console.log('All Users Reached');
                resolve(request)
            });
            db.sqlConnection.execSql(request)
        });
    }}

   module.export = new User().getAllUsers












module.exports = { User }
