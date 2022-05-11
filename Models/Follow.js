const connectTilDb = require('../Database/DBConfig')


class Follow {
    constructor(user_id, annonce_id) {
      this.user_id = user_id;
      this.annonce_id = annonce_id;
    }
  
    //følg en anonce
    async følg() {
      let payload = await connectTilDb(`INSERT INTO dbo.follow (user_id, annonce_id)
      VALUES ('${this.user_id}', '${this.annonce_id}') `);
      return payload
    }
  
    //få de annoncer man følger
    async getFølge(user_id) {
  
      let payload = await connectTilDb(`
        SELECT dbo.follow.user_id as follower_id, dbo.annoncer.* FROM dbo.annoncer
         INNER JOIN dbo.follow ON follow.annonce_id = annoncer.id
        WHERE dbo.follow.user_id = ${user_id}
    `)
        return payload
    }
  
}

//eksportere klassen
module.exports = { Follow }