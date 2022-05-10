const express = require('express')
const app = express()
const formData = require("express-form-data");
const { del } = require('express/lib/application');
app.use(express.json());
app.use(express.static("../Views"));

const connectTilDb = require('../Database/DBConfig')


class Follow {
    constructor(user_id, annonce_id) {
      this.user_id = user_id;
      this.annonce_id = annonce_id;
    }
  
    
    async følg() {
      let payload = await connectTilDb(`INSERT INTO dbo.follow (user_id, annonce_id)
      VALUES ('${this.user_id}', '${this.annonce_id}') `);
      return payload
    }
  
    async getFølge(password) {
  
      let payload = await connectTilDb(`SELECT dbo.users.id as follower_id, dbo.users.password, dbo.annoncer.* FROM dbo.users
      INNER JOIN dbo.follow ON users.id = follow.user_id
      INNER JOIN dbo.annoncer ON follow.annonce_id = annoncer.id
      WHERE password = '${password}' 
    `)
        return payload
    }
  
}


module.exports = { Follow }