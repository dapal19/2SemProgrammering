//henter DB
const connectTilDb = require('../Database/DBConfig')



class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
  
    //sæt password til ønsket værdi
    setPassword(password) {
      this.password = password;
    }
  
    //lav en bruger
    async lavUser() {
      let insertUser = await connectTilDb(`INSERT INTO dbo.users (name, password) VALUES ('${this.name}', '${this.password}');`)
      return insertUser
    }
  
    //slet en bruger
    async deleteUser() {
      let deleteUser = await connectTilDb(`DELETE FROM dbo.users WHERE password = '${this.password}' `)
      return deleteUser
    }
  
    //opdater en bruger
    async updateUser(oldInfo) {
      let result = await connectTilDb(`UPDATE dbo.users SET name = '${this.name}', password = '${this.password}'
      WHERE name = '${oldInfo.name}' AND password = '${oldInfo.password}'`)
    }
  
    //login med sin bruger
    async loginUser() {
        let user = await connectTilDb(`SELECT * FROM dbo.users
        WHERE name='${this.name}' AND password='${this.password}'`)
        return user
      }
  
  }

//eksporter klassen
module.exports = { User }

