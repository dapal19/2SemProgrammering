const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");
const formData = require("express-form-data")
const path = require('path');

//opload billede til mappe "uploads"
const imageUpload = {
    uploadDir: './uploads'
}

//middleware
app.use(express.json())
app.use(express.static('client'))
app.use("/uploads", express.static("uploads"))


//routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
 }); 

app.get('/opretVare', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/opretVare.html"));
 }); 



//vare requestes

//opret vare
app.post('/item', formData.parse(imageUpload), (req,res, next) => {
    let {title, price, kategori, local} = req.body;
    let image = req.files.image.path.replace('\\', '/');

    let productData = JSON.parse(fs.readFileSync("dataBase/vare.json"))

    productData.push({title, price, kategori, image, local})
 
    fs.writeFile('dataBase/vare.json', JSON.stringify(productData, null, 4), err => {
        if(err) res.send(err)
 
    })
    res.sendFile(path.join(__dirname, "/client/opretVare"));
        res.send()
}); 

//få alle vare
app.get('/items',(req,res) => {
    fs.readFile('dataBase/vare.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
    })
}); 

//slet vare
app.delete('/sletvare/:title', (req,res) => {

    let vareData = JSON.parse(fs.readFileSync("dataBase/vare.json"))
 
    for (let i = 0; i < vareData.length; i++) { 

        if(vareData[i].title == req.params.title) {
            //slet billede
            fs.unlinkSync(vareData[i].image)
            //slet i database
            vareData.splice(i, 1)

            fs.writeFile('dataBase/vare.json', JSON.stringify(vareData, null, 4), err => {
                if(err) res.send(err)
                res.status(200).json({
                    msg: "Succes"
                })
            })
        }
    }
}); 


//opadter vare
app.put('/opdaterVare', (req,res) => {

    let vareData = JSON.parse(fs.readFileSync("dataBase/vare.json"))
 
    for (let i = 0; i < vareData.length; i++) { 

        if(vareData[i].title == req.body.title) {
            
            vareData[i].kategori = req.body.kategori
            vareData[i].price = req.body.price

            fs.writeFile('dataBase/vare.json', JSON.stringify(vareData, null, 4), err => {
                if(err) res.send(err)
            })
        }
    }
    res.send({msg: "vare findes ikke"})
}); 


//profil håndtering

//få alle brugere
app.get('/userList', (req,res) => {
    fs.readFile('dataBase/users.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
    })
}); 


//lav bruger
app.post('/create', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))

    //tilføjer bruger til array
    userData.push(req.body)

    fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
        if(err) res.send(err)
    })
}); 


app.put('/opdater', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 

        //leder efter password
        if(userData[i].password == req.body.password) {
            userData[i].username = req.body.username

            fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
                if(err) res.send(err)
            })
        } 
    } 
    res.send({msg: "fejl"})
}); 




//slet bruger
app.delete('/delete/:password', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 

        if(userData[i].password == req.params.password) {
            //sletter bruger
            userData.splice(i, 1)

            fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
                if(err) res.send(err)
                res.status(200).json({
                    msg: "Succes"
                })
            })
        }
    }
}); 


app.post('/login', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))

    for (let i = 0; i < userData.length; i++) { 

        //leder efter bruger med username og password
        if(userData[i].password == req.body.password && userData[i].username == req.body.username) {

            //gemmer i localstorage
            res.setHeader("username", req.body.username)
            res.setHeader("password", req.body.password)
            res.status(200).send(true);
        } 
    } 
})


// Start Server
app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 });