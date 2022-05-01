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
                this.annoce_id = column[0].value
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
    async createAnnonce() {
        console.log("Vi prøver at lave annoncer i databasen")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const request = new Request(
                'INSERT INTO dbo.Annonce (annoce_id, user_id, titel, pris, billede, farve, dato, lokation, kategori_id) VALUES (@annoce_id, @user_id, @titel, @pris, @billede, @farve, @dato, @lokation, @kategori_id)',
                (err, rowCount) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                    }
                }
            );
            request.addParameter('annoce_id', TYPES.Int, this.annoce_id);
            request.addParameter('user_id', TYPES.Int, this.user_id);
            request.addParameter('titel', TYPES.NVarChar, this.titel);
            request.addParameter('pris', TYPES.Int, this.pris);
            request.addParameter('billede', TYPES.NVarChar, this.billede);
            request.addParameter('farve', TYPES.NVarChar, this.farve);
            request.addParameter('dato', TYPES.DateTime, this.dato);
            request.addParameter('lokation', TYPES.NVarChar, this.lokation);
            request.addParameter('kategori_id', TYPES.Int, this.kategori_id);
            
                resolve(this)

            connectTilDatabasen.connection.execSql(request)
        });
    }
    async opdaterAnnonce() {
        console.log("Vi prøver at opdatere annoncer i databasen")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const request = new Request(
                'UPDATE dbo.Annonce SET user_id = @user_id, titel = @titel, pris = @pris, billede = @billede, farve = @farve, dato = @dato, lokation = @lokation, kategori_id = @kategori_id WHERE annoce_id = @annoce_id',
                (err, rowCount) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                    }
                })
            request.addParameter('annoce_id', TYPES.Int, this.annoce_id);
            request.addParameter('user_id', TYPES.Int, this.user_id);
            request.addParameter('titel', TYPES.NVarChar, this.titel);
            request.addParameter('pris', TYPES.Int, this.pris);
            request.addParameter('billede', TYPES.NVarChar, this.billede);
            request.addParameter('farve', TYPES.NVarChar, this.farve);
            request.addParameter('dato', TYPES.DateTime, this.dato);
            request.addParameter('lokation', TYPES.NVarChar, this.lokation);
            request.addParameter('kategori_id', TYPES.Int, this.kategori_id);
    
                resolve(this)
        
            connectTilDatabasen.connection.execSql(request)
        });
    }
    async sletAnnonce() {
        console.log("Vi prøver at opdatere annoncer i databasen")
        //Instansierer klassen fra DBConfig
        const connectTilDatabasen = new DatabaseConnect()
        try {
            await connectTilDatabasen.connectTilDatabase(); //Vi starter connection via vores metode inden i DBConfig
        } catch (error) {
            console.log("Fejl i connection")
        }
        return new Promise((resolve, reject) => {
            const request = new Request(
                'DELETE FROM dbo.Annonce WHERE annoce_id = @annoce_id',
                (err, rowCount) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        console.log(`${rowCount} row(s) returned`);
                    }
                })
            request.addParameter('annoce_id', TYPES.Int, this.annoce_id);
            
                resolve(this)
        
            connectTilDatabasen.connection.execSql(request)
        });
    }
    
}
async function annoncer() {
    const annonce1 = new Annoncer();
    const annonce2 = await annonce1.alleAnnoncer()
    console.log(annonce2)
}
//annoncer()

async function lavAnnoncer() {
    const annonce11 = new Annoncer(annoce_id = 26, user_id = 1, titel = '3', pris = 2, billede = '3', farve = 'b', dato = 9, lokation = '3', kategori_id = 1);
    const annonce22 = await annonce11.createAnnonce()
    console.log(annonce22)
}
//lavAnnoncer()

async function updateAnnonce() {
    const annonce111 = new Annoncer(annoce_id = 6, user_id = 1, titel = '9', pris = 2, billede = '3', farve = 'b', dato = 9, lokation = '3', kategori_id = 1);
    const annonce222 = await annonce111.opdaterAnnonce()
    console.log(annonce222)
}
//updateAnnonce()

async function sletteMette() {
    const annonce1111 = new Annoncer(annoce_id = 6);
    const annonce2222 = await annonce1111.sletAnnonce()
    console.log(annonce2222)
}
sletteMette()











module.exports = { Annoncer }


