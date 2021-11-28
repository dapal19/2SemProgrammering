const express = require("express");
const app = express();
const port = 4000;

app.get('/', (req, res) =>{
    res.send('hello world')

})


// Start Server
app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 });

