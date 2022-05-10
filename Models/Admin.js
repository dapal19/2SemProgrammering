const express = require('express')
const app = express()
const formData = require("express-form-data");
const { del } = require('express/lib/application');
app.use(express.json());
app.use(express.static("../Views"));

const connectTilDb = require('../Database/DBConfig')



class Admin {
    constructor(name, password) {
      this.name = name;
      this.password = password;
    }
    async adminLogin() {
      let admin = await connectTilDb(`SELECT * FROM dbo.admin
    WHERE name='${this.name}' AND password='${this.password}'`);
      return admin
    };
  
    async deleteUser(id) {
      let deleUser = connectTilDb(`DELETE FROM dbo.users WHERE id = '${id}'`)
        return deleUser
    }
  
  
    async upgradeUser(status, id) {
      let admin = await connectTilDb(`UPDATE dbo.users SET status = '${status}'
         WHERE id = '${id}'`)
      return admin
    }
  
  
  
  
  
    async adminUpdateUser(name, password, id) {
      let admin =  await connectTilDb(`UPDATE dbo.users SET name = '${name}', password = '${password}'
        WHERE id = '${id}'`)
        return admin
    }
  
  
  
  
    async userStats() {
      let admin =  await connectTilDb(`SELECT COUNT(id) as total_annoncer
        FROM dbo.annoncer`)
        return admin
       
    }
  
  
  
  
    async annoncePrUser() {
      let admin = await connectTilDb(`SELECT user_id, COUNT(title) as antal_annoncer FROM dbo.annoncer
            GROUP BY user_id
            ORDER BY antal_annoncer DESC`)
        return admin
  
    }
    
  }

  module.exports = { Admin }
  
