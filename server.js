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

//opret vare med middleware formData
app.post('/item', formData.parse(imageUpload), (req,res) => {
    //definere body'en fra requestet
    let {title, price, kategori, local} = req.body;
    //gør bileldet kan vises 
    let image = req.files.image.path.replace('\\', '/');

    let productData = JSON.parse(fs.readFileSync("dataBase/vare.json"))

    //tilføjer vare til array
    productData.push({title, price, kategori, image, local})
 
    fs.writeFile('dataBase/vare.json', JSON.stringify(productData, null, 4), err => {
        if(err) res.send(err)
 
    })
    //sender tilbage til html siden
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
 
    //loop igennem vare array
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


//opdater vare
app.put('/opdaterVare', (req,res) => {

    let vareData = JSON.parse(fs.readFileSync("dataBase/vare.json"))
 
    for (let i = 0; i < vareData.length; i++) { 

        if(vareData[i].title == req.body.oldTitle) {
            
            vareData[i].title = req.body.title
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
        if(err) {
            res.send(err)
        } else {
        res.send(data)
        }
    })
}); 


//lav bruger
app.post('/create', (req,res) => {

    //hent json fil med user array fra database
    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))


    //tilføjer bruger til array
    userData.push(req.body)
    res.status(201).send(req.body)

    //overskriv json fil med user array fra database med nyt bruger til array'et
    fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
        if(err) res.send(err)
    })
}); 


app.put('/opdater', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 

        //leder efter password
        if(userData[i].password == req.body.oldPassword) {

            //sætter nyt username og password
            userData[i].username = req.body.username
            userData[i].password = req.body.password

            fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
                if(err) res.send(err)
            })
            res.sendStatus(200)
        } 
    } 
    res.sendStatus(400)
}); 




//slet bruger
app.delete('/delete/:password', (req,res) => {


    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    //loop igennem userData array
    for (let i = 0; i < userData.length; i++) { 

        //finder der hvor password matcher med sendte password
        if(userData[i].password == req.params.password) {

            //sletter bruger, på position i og 1 object
            userData.splice(i, 1)
            res.status(201)

            fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
                if(err) res.send(err)
                res.status(200).json({
                    msg: "Succes"
                })
            })
        }
    }
}); 




//login
app.post('/login', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))

    for (let i = 0; i < userData.length; i++) { 

        //leder efter bruger med username og password
        if(userData[i].password == req.body.password && userData[i].username == req.body.username) {

            //sætter headers til username og password fra body
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