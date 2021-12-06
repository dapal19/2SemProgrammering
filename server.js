const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");
const formData = require("express-form-data")
const path = require('path');

const imageUpload = {
    uploadDir: './uploads'
}


app.use(express.json())
app.use(express.static('client'))
app.use("/uploads", express.static("uploads"))
app.use(formData.parse(imageUpload))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
 }); 

app.get('/opretVare', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/opretVare.html"));
 }); 




//opret vare håndtering
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

//alle vare
app.get('/items',(req,res) => {
    fs.readFile('dataBase/vare.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
    })
}); 

//bestemt kategori vare
app.get('/kategori',(req,res) => {
    let vareData = JSON.parse(fs.readFileSync("dataBase/vare.json"))

    for (let i = 0; i < vareData.length; i++) { 
        if(vareData[i].kategori == req.body.kategori) {
            res.send(vareData)
      }
    }
    res.send({msg: "kategori findes ikke"})
}); 



//slet vare
app.delete('/sletvare/:title', (req,res) => {

    let vareData = JSON.parse(fs.readFileSync("dataBase/vare.json"))
 
    for (let i = 0; i < vareData.length; i++) { 

        if(vareData[i].title == req.params.title) {
            fs.unlinkSync(vareData[i].image)
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

app.get('/userList', (req,res) => {
    fs.readFile('dataBase/users.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
    })
}); 

//ved ikke om dette er nødvendigt
/*
app.post('/user', (req,res) => {
    fs.writeFile('dataBase/users.json', JSON.stringify(req.body, null, 4), err => {
        if(err) res.send(err)
        res.send({
            msg: "Succes"
        })
    })
}); 
*/


//lav bruger
app.post('/create', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))

    userData.push(req.body)

    fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
        if(err) res.send(err)
        res.send({
            msg: "Succes"
        })
    })

}); 


app.put('/opdater', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 

        if(userData[i].password == req.body.password) {
            userData[i].username = req.body.username

            fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
                if(err) res.send(err)
            })
            res.send({msg: "succes"})
        } 
    } 
    res.send({msg: "fejl"})
}); 




//slet bruger
app.delete('/delete/:password', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 

        if(userData[i].password == req.params.password) {
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
        if(userData[i].password == req.body.password && userData[i].username == req.body.username) {
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