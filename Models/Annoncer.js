const { Connection, Request, TYPES } = require("tedious");
const { DatabaseConnect } = require('../Database/DBConfig')

class Annoncer {
    constructor(annoce_id, user_id, titel, pris, billede, farve, dato, lokation, kategori_id) {
        this.annoce_id = annoce_id;
        this.user_id = user_id;
        this.titel = titel;
        this.pris = pris
        this.billede = billede
        this.farve = farve
        this.dato = dato
        this.lokation = lokation
        this.kategori_id = kategori_id
    }    
}








module.exports = { Annoncer }


