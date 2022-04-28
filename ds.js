
app.get('/userList', function getAllUsers (req, res) {
    var sql = require("mssql");
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from dbo.users', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });
});
//lav bruger
//app.post('/create',)


const createUser = new Promise ((resolve, reject) => {
    var sql = require("mssql");
    const sql1 = 'INSERT INTO dbo.users (user_id, name, password, status_id, følger) VALUES (@user_id, @name, @password, @status_id, @følger)'
    const request = new equest (sql, (err) => {
        if (err) {
            reject(err)
            console.log(err)
        }
    })
    request.addParameter('user_id', TYPES.int, this.user_id)
    request.addParameter('name', TYPES.VarChar, this.name)
    request.addParameter('user_id', TYPES.VarChar, this.password)
    request.addParameter('user_id', TYPES.int, this.status_id)
    request.addParameter('user_id', TYPES.VarChar, this.følger)

    request.on('requestCompleted', () => {
        console.log('User created');
        resolve('User created')
    })
    db.sqlConnect.execute(request)
})




/*

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
*/

module.exports = app

//routes

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/index.html"));
 }); 


app.get('/opretVare', (req,res) => {
    res.sendFile(path.join(__dirname, "/client/opretVare.html"));
 }); 






//vare endpoints

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
        //sender data fra databasen
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
            //slet objekt i database
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
 
    //loop igennem user data
    for (let i = 0; i < vareData.length; i++) { 

        //leder efter der hvor oldTitle er det samme som den nuværende
        if(vareData[i].title == req.body.oldTitle) {
            
            //sætter nye values
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






//opdater bruger
app.put('/opdater', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    //loop igennem array
    for (let i = 0; i < userData.length; i++) { 

        //leder efter bestemt password 
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

            //sletter bruger, på position i og 1 objekt
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

    //loop igennem array
    for (let i = 0; i < userData.length; i++) { 

        //leder efter bruger med det indtastede username og password fra klient
        if(userData[i].password == req.body.password && userData[i].username == req.body.username) {

            //sætter headers til username og password fra body
            res.setHeader("username", req.body.username)
            res.setHeader("password", req.body.password)
            res.status(200).send(true);
        } 
    } 
})


app.listen(port, () => {
    console.log(`Server lytter på port ${port}`);
 })