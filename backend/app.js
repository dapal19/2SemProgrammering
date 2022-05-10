//Importerer de forskellige libraries
const express = require('express')
const app = express()
const formData = require("express-form-data");
const { del } = require('express/lib/application');
const res = require('express/lib/response');
app.use(express.json());
app.use(express.static("../Views"));

const connectTilDb = require('../Database/DBConfig')


const { User } = require('../Models/User.js')
const { Annonce } = require('../Models/Annoncer.js')
const { Admin } = require('../Models/Admin.js')
const { Follow } = require('../Models/Follow.js')

//Definerer vores PORT GANG GANG 
const PORT = 1000;
app.listen(PORT, () => {
  console.log(`server lytter på http://localhost:${PORT}`);
});

//Get-request til main-site, hvor vi vil samle mange af sitets funktionaliteter.
app.get("/mainsite", async (req, res) => {
  res.redirect('mainsite.html')
})


//Router til opdater siden
app.get("/profil", async (req, res) => {
  res.redirect('profil.html')
})

//Definerer vores første endpoint som skal fungere som opretside.
app.get("/", async (req, res) => {
  res.redirect("../opret.html")
})


//Definerer routen for login som skal blive brugt efter brugeren har brugt opretsiden
app.get('/login', async (req, res) => {
  res.redirect('../login.html')
})

//Varer Endpoints --> Get Req for varer
app.get('/annoncer', (req, res) => {
  res.redirect("/annoncer.html");
});


app.get("/admin", async (req, res) => {
  res.redirect('admin.html')
})

//---------BRUGER ENDPOINS----------
//laver er ny bruger
app.post("/nyBruger", async (req, res) => {

  const nyUser = new User(req.body.name, req.body.password)

  await nyUser.lavUser()

  res.send("det lykkdes")

})

//sletter en bruger
app.delete("/deleteBruger", async (req, res) => {

  const delUser = new User("ligemeget", req.body.password)

  await delUser.deleteUser()

  res.send("hej")
});


//opdater bruger
app.put("/updateBruger", async (req, res) => {

  let oldInfo = {
    name: req.body.oldname,
    password: req.body.oldpassword
  }

  let newUser = new User(req.body.name, req.body.password)

  await newUser.updateUser(oldInfo)

});




//--------LOGIN  ------------------

//bruger login
app.post('/loginBruger', async (req, res) => {

  let payload = {
    name: req.body.name,
    password: req.body.password,
  };

  let user = await connectTilDb(`SELECT * FROM dbo.users
  WHERE name='${payload.name}' AND password='${payload.password}'`);

  //

  if (!user['1']) {
    res.status(404).send('Brugeren findes ikke');
  } else {
    res.setHeader("username", payload.name)
    res.setHeader("password", payload.password)
    res.setHeader("user_id", user[1]["id"])
    res.status(200).send(true);
  }
});






//////------ANONCER ENDPOINTS HER-------

//opret annonce
app.post("/lavAnnonce", async (req, res) => {

  const nyAnnonce = new Annonce(req.body.title, req.body.price, req.body.location, req.body.category, req.body.colour, req.body.user_id, req.body.billede)

  await nyAnnonce.lavAnnonce()


})

//slet annonce
app.delete("/sletAnnonce/:title/:user_id", async (req, res) => {

  let delAnnonce = new Annonce()

  delAnnonce.setTitle(req.params.title)
  delAnnonce.setUserID(req.params.user_id)

  await delAnnonce.delAnnonce()


})


//Opdater annnonce
app.put("/opdaterAnnonce", async (req, res) => {

  let oldTitle = req.body.oldTitle

  let upAnnocne = new Annonce(req.body.title, req.body.price, req.body.colour, req.body.location, req.body.category, req.body.user_id)

  await upAnnocne.opdaterAnnonce(oldTitle)


})




//---------ANNONCE TABELLER--------

//se brugers personlige vare
app.get("/annoncer/:user_id", async (req, res) => {

  const payload = new Annonce()
  payload.setUserID(req.params.user_id)


  res.json(await payload.personligAnnon())

})


//Annonce filter
app.post("/filter", async (req, res) => {

  let price1 = req.body.price1
  let age = req.body.age

  const filterAnnonce = new Annonce("hej", req.body.price2, req.body.colour, req.body.location, req.body.category, 123)

  res.json(await filterAnnonce.filter(price1, age))
})




///------------follow ----------

//følg annonce
app.post("/follow", async (req, res) => {

  let payload = new Follow(req.body.user_id,req.body.annonce_id)

  res.json(await payload.følg())

})


//se annonce som følges
app.post("/whoFollow", async (req, res) => {
  
  let follow = new Follow()

    password = req.body.password,


    res.json(await follow.getFølge(password))

})





//------------ADMIN-----------


//login admin
app.post('/loginAdmin', async (req, res) => {
  let adminLog = new Admin(req.body.name, req.body.password)

  let result = await adminLog.adminLogin()

  if (!result['1']) {
    res.status(404).send('Brugeren findes ikke');
  } else {
    res.setHeader("name", result[1].name)
    res.setHeader("password", result[1].password)
    res.setHeader("admin_id", result[1].id)
    res.status(200).send(true);
  }

});


//slet en bruger som admin
app.delete("/adminDelete", async (req, res) => {

    const admin = new Admin()
  
    id = req.body.id,

    admin.deleteUser(id)

})


//opgrder en bruger
app.put("/adminOpgrader", async (req, res) => {

   const admin = new Admin()

    let id = req.body.id
    let status = req.body.status

  await admin.upgradeUser(status,id)
  
})



//Admin - opdatere en bruger.
app.put("/adminOpdater", async (req, res) => {

  username = req.body.name
  password = req.body.password
  id = req.body.id

  const admin = new Admin()

  admin.adminUpdateUser(username, password, id)

});




//------STATS----ADMIN------------
//i alt annoncer
app.post("/adminStats", async (req, res) => {
  const admin = new Admin()

  res.json(await admin.userStats())

})

//se annoncer pr bruger
app.post("/adminStats2", async (req, res) => {
  const admin = new Admin()

  res.json(await admin.annoncePrUser())

})





