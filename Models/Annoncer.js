const { Connection, Request } = require("tedious");

const { DatabaseConnect } = require('../Database/DBConfig')

class Annoncer {
    constructor(annonce_id, user_id, titel, pris, billede, farve, dato, lokation, kategori) {
        this.annonce_id = annonce_id;
        this.user_id = user_id;
        this.titel = titel;
        this.pris = pris
        this.billede = billede
        this.farve = farve
        this.dato = dato
        this.lokation = lokation
        this.kategori = kategori
    }
    async alleAnnoncer() {
        console.log("Vi prøver at hente alle annoncer i databasen")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const request = new Request(
                'SELECT * FROM dbo.annonce',
                (err, rowCount) => {
                    if (err) {
                        reject(err.message);
                        console.error("Kan ikke hente annoncer");
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                    }
                }
            );
            request.on('row', (column) => {
                this.annonce_id = column[0].value
                this.user_id = column[1].value
                this.titel = column[2].value
                this.pris = column[3].value
                this.billede = column[4].value
                this.farve = column[5].value
                this.dato = column[6].value
                this.lokation = column[7].value
                this.kategori = column[8].value

                console.log('alle annoncer modtaget');
                resolve(this)
            });
            connectTilDatabasen.connection.execSql(request)
        });
    }
}
async function annoncer() {
    const annonce1 = new Annoncer();
    const annonce2 = await annonce1.alleAnnoncer()
    console.log(annonce2)
}
annoncer()

module.exports = { Annoncer }


