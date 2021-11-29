const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");


app.use(express.json())

app.use(express.static('client'))

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

        if(userData[i].id == req.body.id) {
            userData[i].user = req.body.user

            fs.writeFile('dataBase/users.json', JSON.stringify(userData, null, 4), err => {
                if(err) res.send(err)
                res.status(200).json({
                    msg: "Succes"
                })
            })
      }
    }
    res.send({msg: "kunne ikke finde nogen bruger"})
 
}); 

//slet bruger
app.delete('/delete/:id', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 

        if(userData[i].id == req.params.id) {
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
 

// Start Server
app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 });

