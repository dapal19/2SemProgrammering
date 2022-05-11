//Importerer de forskellige libraries
const express = require('express')
const app = express()
app.use(express.json());

//henter DB
const connectTilDb = require('../Database/DBConfig')


class Annonce {
    constructor(title, price, location, category, colour, user_id, billede) {
      this.title = title;
      this.price = price;
      this.location = location;
      this.category = category;
      this.colour = colour;
      this.user_id = user_id;
      this.billede = billede;
  
    }
    //kan sætte titlen til ønsket værdi
    setTitle(title) {
      this.title = title;
    }

    //kan sættte user_id til ønsket værdi
    setUserID(user_id) {
      this.user_id = user_id;
    }
  
    //Kan lave en annonce
    async lavAnnonce() {
      await connectTilDb(`INSERT INTO dbo.annoncer (title, price, location, category, colour, user_id, billede) VALUES (
            '${this.title}', '${this.price}', '${this.location}', '${this.category}', 
            '${this.colour}', '${this.user_id}', '${this.billede}');`)
    }
  
    //slette sin egen annonce
    async delAnnonce() {
      let result = await connectTilDb(`DELETE FROM dbo.annoncer WHERE title = '${this.title}' AND user_id = '${this.user_id}' `);
      return result
    }
  
    //opdatere sin egen anonce
    async opdaterAnnonce(oldTitle) {
      let annonce = await connectTilDb(`UPDATE dbo.annoncer 
      SET title='${this.title}', price='${this.price}', location='${this.location}'
      , colour='${this.colour}', category='${this.category}'
      WHERE title = '${oldTitle}' AND user_id = '${this.user_id}'`)
      return annonce
    }
  
    //se de annocner man selv har lavet
    async personligAnnon() {
      let annoncer = await connectTilDb(`SELECT * FROM dbo.annoncer WHERE user_id = '${this.user_id}'`);
      return annoncer
    }
  
    //filteret til mainsite
    async filter(price1, age) {
      let filter = await connectTilDb(`SELECT dbo.annoncer.*, dbo.users.status, dbo.users.name, age = DATEDIFF(DAY, created_at, CURRENT_TIMESTAMP) 
      FROM dbo.annoncer 
      LEFT JOIN dbo.users ON annoncer.user_id = users.id
      WHERE 
      location =(CASE WHEN '${this.location}' = '' THEN location ELSE '${this.location}' END)
      AND
      price BETWEEN (CASE WHEN '${price1}' = '' THEN 0 ELSE '${price1}' END) AND (CASE WHEN '${this.price}' = '' THEN price ELSE '${this.price}' END)
      AND
      DATEDIFF(DAY, created_at, CURRENT_TIMESTAMP)   = (CASE WHEN '${age}' = '' THEN DATEDIFF(DAY, created_at, CURRENT_TIMESTAMP)  ELSE '${age}' END)
      AND
      category = (CASE WHEN '${this.category}' = '' THEN category ELSE '${this.category}' END)
      AND
      colour = (CASE WHEN '${this.colour}' = '' THEN colour ELSE '${this.colour}' END)
      ORDER BY status ASC
      `
      );
      return filter
    }
}

//ekpsortere klassen
module.exports = { Annonce }


