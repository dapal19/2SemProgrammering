//Importerer de forskellige libraries
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.static("./Views"));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const connectTilDb = require('../Database/DBConfig')

//Definerer vores PORT ----- GANG GANG 
const PORT = 1000;
app.listen(PORT, () => {
    console.log(`server lytter på http://localhost:${PORT}`);
});

//Definerer vores første endpoint som skal fungere som opretside.
app.get("/", async (req, res) => {
    res.redirect("../opret.html")
})

//POST-request til databasen, der gør at vi kan indsætte data fra brugeren.
app.post("/", async (req, res) => {
    const brugerData = {
        name: req.body.name,
        password: req.body.password,
    };
    let insertUser = await connectTilDb(`INSERT INTO dbo.users (name, password) VALUES ('${brugerData.name}', '${brugerData.password}');`);
    res.send(insertUser)
})


