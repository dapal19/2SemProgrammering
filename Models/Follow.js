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
  
    async getFølge(user_id) {
  
      let payload = await connectTilDb(`SELECT dbo.follow.user_id as follower_id, dbo.annoncer.* FROM dbo.annoncer
         INNER JOIN dbo.follow ON follow.annonce_id = annoncer.id
        WHERE dbo.follow.user_id = ${user_id}
    `)
        return payload
    }
  
}


module.exports = { Follow }