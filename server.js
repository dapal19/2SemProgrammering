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



// Start Server
app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 });

