const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");
const formData = require("express-form-data")


app.use(express.json())

app.use(express.static('client'))
app.use("/uploads", express.static("uploads"))



const options = {
    uploadDir: './uploads'
}

app.use(formData.parse(options)); 

const products = [];

app.get('/opretVare', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/opretVare.html"));
 }); 

//opret vare håndtering
app.post('/item', (req,res) => {

    let {title, price, kategori} = req.body;
    let thumbnail = req.files.thumbnail.path.replace('\\', '/');

    products.push({title, price, kategori, thumbnail})
    console.log(products);
    res.redirect('/opretVare.html')
}); 







 //profil håndtering

app.get('/', (req,res) => {
   res.sendFile(path.join(__dirname, "/client/index.html"));
}); 

app.get('/userList', (req,res) => {
    fs.readFile('dataBase/users.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
    })
}); 

app.post('/user', (req,res) => {
    fs.writeFile('dataBase/users.json', JSON.stringify(req.body, null, 4), err => {
        if(err) res.send(err)
        res.send({
            msg: "Succes"
        })
    })
}); 

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
      }
    }
    res.send({msg: "kunne ikke finde nogen bruger"})
 
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

        console.log(req.body)

        for (let i = 0; i < userData.length; i++) { 
            if(userData[i].password == req.body.password && userData[i].username == req.body.username) {
                res.setHeader("username", req.body.username)
                res.setHeader("password", req.body.password)
                res.status(200).send(true);
            } 
        } 
})

//vare routes

//opret vare



// Start Server
app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 });