//Importerer de forskellige libraries
const express = require('express')
const app = express()
app.use(express.json());

//henter connection til DB
const connectTilDb = require('../Database/DBConfig')



class Admin {
    constructor(name, password) {
      this.name = name;
      this.password = password;
    }

    //admin login
    async adminLogin() {
      let admin = await connectTilDb(`SELECT * FROM dbo.admin
    WHERE name='${this.name}' AND password='${this.password}'`);
      return admin
    };
  
    //delete en bruger
    async deleteUser(id) {
      let deleUser = connectTilDb(`DELETE FROM dbo.users WHERE id = '${id}'`)
        return deleUser
    }
  
    //opgrader en bruger
    async upgradeUser(status, id) {
      let admin = await connectTilDb(`UPDATE dbo.users SET status = '${status}'
         WHERE id = '${id}'`)
      return admin
    }
  
    //opdater en bruger
    async adminUpdateUser(name, password, id) {
      let admin =  await connectTilDb(`UPDATE dbo.users SET name = '${name}', password = '${password}'
        WHERE id = '${id}'`)
        return admin
    }
  
    //hvor mange annocner der er i alt
    async userStats() {
      let admin =  await connectTilDb(`SELECT COUNT(id) as total_annoncer FROM dbo.annoncer`)
        return admin
       
    }
  
  
  //hvor mange annnocner der er pr bruger
    async annoncePrUser() {
      let admin = await connectTilDb(`
            SELECT user_id, COUNT(id) as antal_annoncer FROM dbo.annoncer
            GROUP BY user_id
            ORDER BY antal_annoncer DESC`)
        return admin
  
    }
    
  }


  //eksportere klassen
  module.exports = { Admin }
  
