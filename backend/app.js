//Importerer de forskellige libraries
const express = require('express')
const app = express()
const formData = require("express-form-data")
app.use(express.json());
app.use(express.static("./Views"));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const connectTilDb = require('../Database/DBConfig')
//Definerer vores PORT GANG GANG 
const PORT = 1000;
app.listen(PORT, () => {
    console.log(`server lytter på http://localhost:${PORT}`);
});
//Definerer vores første endpoint som skal fungere som opretside.
app.get("/", async (req, res) => {
    res.redirect("../opret.html")
})
//POST-request til databasen, der gør at vi kan indsætte data fra brugeren.
app.post("/", async (req, res) => {
    const brugerData = {
        name: req.body.name,
        password: req.body.password,
    };
    let insertUser = await connectTilDb(`INSERT INTO dbo.users (name, password) VALUES ('${brugerData.name}', '${brugerData.password}');`);
    res.send(insertUser)
})
//Definerer routen for login som skal blive brugt efter brugeren har brugt opretsiden
app.get('/login', async (req, res) => {
    res.redirect('../login.html')
  })
//--------BRUGER POST --> TIL LOGIN  ------------------
app.post('/login', async (req,res) => {
    let payload = {
      name: req.body.name,
      password: req.body.password,
    };
    let result = await connectTilDb(`SELECT * FROM dbo.users
    WHERE name='${payload.name}' AND password='${payload.password}'`);
    if(!result['1']){
      res.status(999).send(payload);
      console.log("fail");
    } else {
      res.setHeader("username", payload.name)
      res.setHeader("password", payload.password)
      res.status(200).send(true);
    }
  });

    //Get-request til main-site, hvor vi vil samle mange af sitets funktionaliteter.
app.get("/mainsite", async (req, res) => {
    res.redirect('mainsite.html')
})
  //DELETE reqeust for at slette en bruger.
  app.delete("/profil", async (req, res) => {
    const findId = {
      password: req.body.password
    }
    let deleteId = await connectTilDb(`DELETE FROM dbo.users WHERE password = '${findId.password}' `)
    res.send(deleteId)
    res.redirect('opret.html')
  });
  app.get("/mainsite", async (req, res) => {
    res.redirect('mainsite.html')
  })
  //Router til opdater siden
  app.get("/profil", async (req, res) => {
    res.redirect('profil.html')
  })
  //Put request så vi kan opdatere en bruger.
  app.put("/profil", async (req, res) => {
    const userUpdate = {
    name: req.body.name,
    password: req.body.password,
    oldname: req.body.oldname,
    oldpassword: req.body.oldpassword,
  }
  console.log(userUpdate)
  let updateUser = await connectTilDb(`UPDATE dbo.users SET name = '${userUpdate.name}', password = '${userUpdate.password}'
    WHERE name = '${userUpdate.oldname}' AND password = '${userUpdate.oldpassword}'`)
  res.send(updateUser)
  });
//Slet din egen profil, hvorefter brugeren redirectes ud til opret siden.
  app.delete("/profil", async (req, res) => {
    const findPassword = {
      password: req.body.password
    }
    let deletePassword = await connectTilDb(`DELETE FROM dbo.users WHERE password = '${findPassword.password}' `)
    res.send(deletePassword)
  });
//Varer Endpoints --> Get Req for varer
  app.get('/annoncer', (req,res) => {
    res.redirect("/annoncer.html");
 }); 
//Upload billede til mappe "uploads"
const imageUpload = {
    uploadDir: './uploads'
}
 //opret annonce
 app.post("/annoncer", async (req, res) => {
    const payload = {
      title: req.body.title,
      price: req.body.price,
      location: req.body.location,
      category: req.body.category,
      colour: req.body.colour,
      billede: req.body.billede
    };
    console.log(payload);

    let storeProduct = await connectTilDb(
      `INSERT INTO dbo.annoncer (title, price, location, category, colour, billede) VALUES (
          '${payload.title}', '${payload.price}', '${payload.location}', '${payload.category}', 
          '${payload.colour}', '${payload.billede}');`
    );
    if(!storeProduct['1']){
      res.json({error: 'Product not found'});
    } else {
      res.json({storeProduct: storeProduct});
    }
  })

  //-----------------seAnnnonce---------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------- -------------------------------

  app.get("/mainsite", async (req, res) =>{
    let payload = {
      location: req.body.location,
      price1: req.body.price1,
      price2: req.body.price2,
      age: req.body.age,
      category: req.body.category,
      colour: req.body.colour
    }
      let antal = await connectTilDb(`SELECT dbo.annoncer.*, dbo.users.status, dbo.users.name, age = DATEDIFF(DAY, created_at, CURRENT_TIMESTAMP) 
      FROM dbo.annoncer 
      LEFT JOIN dbo.users ON annoncer.user_id = users.id
      WHERE 
      location =(CASE WHEN '${payload.location}' = '' THEN location ELSE '${payload.location}' END)
      AND
      price BETWEEN (CASE WHEN '${payload.price1}' = '' THEN 0 ELSE '${payload.price1}' END) AND (CASE WHEN '${payload.price2}' = '' THEN price ELSE '${payload.price2}' END)
      AND
      DATEDIFF(DAY, created_at, CURRENT_TIMESTAMP)   = (CASE WHEN '${payload.age}' = '' THEN DATEDIFF(DAY, created_at, CURRENT_TIMESTAMP)  ELSE '${payload.age}' END)
      AND
      category = (CASE WHEN '${payload.category}' = '' THEN category ELSE '${payload.category}' END)
      AND
      colour = (CASE WHEN '${payload.colour}' = '' THEN colour ELSE '${payload.colour}' END)
      ORDER BY status ASC
      `
      );
      
      if(!antal['1']){
        res.json({error: 'Product not found'});
        res.send(error);
      } else {
        res.json(antal);
      }
      
  })
  
  
  



  



//___________ADMIN_______________RIP_______________

app.get("/admin", async (req, res) => {
  res.redirect('admin.html')
})

//Put request så vi kan opdatere en bruger.
  app.put("/adminOpdater", async (req, res) => {


    const payload = {
    name: req.body.name,
    password: req.body.password,
    id: req.body.id,
    adminPassword: req.body.adminPassword,
  }
  
  let admin = await connectTilDb(`SELECT * FROM dbo.admin WHERE password = '${payload.adminPassword}'`)
    if(!admin['1']){
      res.json({error: 'wrong password'});
    } else {
      let updateUser = await connectTilDb(`UPDATE dbo.users SET name = '${payload.name}', password = '${payload.password}'
    WHERE id = '${payload.id}'`)
  res.send(updateUser)
    }

  console.log(payload)
});
  
app.delete("/admin", async (req, res) => {
  const payload = {
  id: req.body.id,
  adminPassword: req.body.adminPassword,
}

let admin = await connectTilDb(`SELECT * FROM dbo.admin WHERE password = '${payload.adminPassword}'`)
  if(!admin['1']){
    res.json({error: 'wrong password'});
  } else {
    connectTilDb(`DELETE FROM dbo.users WHERE id = '${payload.id}'`)
res.send("hej")
  }

console.log(payload)
});



