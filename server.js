//const { response } = require("express");
const express = require("express");
var app = express();
const port = 2000;
const fs = require("fs");
const formData = require("express-form-data")
const path = require('path');
const cors = require("cors")
url = require('url')

const userRouter = require("./Routes/userRoutes")
const {User} = require('./Models/User')
const { Annoncer } = require('./Models/Annoncer')
const { Connection, Request, TYPES } = require('tedious');
// Modules
const config = require('./Database/DBConfig')

//USES
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 })
//opload billede til mappe "uploads"
const imageUpload = {
    uploadDir: './uploads'
}

app.use(express.static('client'))
app.use("/uploads", express.static("uploads"))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
 }); 


//Henter alle users -> Kan bruges til admin
app.get('/users', async (req,res) => {    
    const user1 = new User
    const user2 = await user1.getAllUsers()
    res.send(user2)
})

//Henter alle annoncer
app.get('/annoncer', async (req,res) => {    
    const annonce1 = new Annoncer
    const annonce2 = await annonce1.alleAnnoncer()
    res.send(annonce2)
})







