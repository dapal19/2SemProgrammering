const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs")


app.use(express.json())

app.use(express.static('client'))

app.get('/', (req,res) => {
   res.sendFile(path.join(__dirname, "/client/index.html"));
}); 



app.post('/user', (req,res) => {

    console.log(req.body)

    res.send({ msg: "hello"})
 }); 
 

// Start Server
app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 });

