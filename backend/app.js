//Importerer de forskellige libraries
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.static("./Views"));


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
        status_id: req.body.status_id,
    };
    let insertUser = await executeSQL(`INSERT INTO dbo.users (id, name, password, status_id, følger) VALUES ('${brugerData.id}', '${brugerData.name}', '${brugerData.password}', '${brugerData.status_id}','${brugerData.følger}'); `);
    res.send(insertUser)
})


