const express = require('express')
const app = express()
const formData = require("express-form-data");
const { del } = require('express/lib/application');
app.use(express.json());
app.use(express.static("../Views"));

const connectTilDb = require('../Database/DBConfig')



class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    async lavUser() {
      let insertUser = await connectTilDb(`INSERT INTO dbo.users (name, password) VALUES ('${this.name}', '${this.password}');`)
      return insertUser
    }
  
    async deleteUser() {
      let deleteUser = await connectTilDb(`DELETE FROM dbo.users WHERE password = '${this.password}' `)
      return deleteUser
    }
  
  
    async updateUser(oldInfo) {
      let result = await connectTilDb(`UPDATE dbo.users SET name = '${this.name}', password = '${this.password}'
      WHERE name = '${oldInfo.name}' AND password = '${oldInfo.password}'`)
    }
  

    async loginUser() {
        let user = await connectTilDb(`SELECT * FROM dbo.users
        WHERE name='${this.name}' AND password='${this.password}'`)
        return user
      }
  
  }




module.exports = { User }

