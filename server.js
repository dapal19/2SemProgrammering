//const { response } = require("express");
const express = require("express");
var app = express();
const port = 2000;
const fs = require("fs");
const formData = require("express-form-data")
const path = require('path');
const cors = require("cors")


const userRouter = require("./Routes/userRoutes")
const {User} = require('./Models/User')
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
//middleware
new User().getAllUsers

app.use(express.static('client'))
app.use("/uploads", express.static("uploads"))

app.get('/users/:id', (req,res) => {
    const allUsers = new User(req.params.id)
    res.send(JSON.parse({User: allUsers}))
})


