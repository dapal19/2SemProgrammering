//-----------OPDATER BRUGER--------
//henter knap til at opdatere
var changeUserInfo = document.getElementById("changeUserInfo")


//opdater en bruger som admin
//giver den funktion
changeUserInfo.addEventListener('click', function(e) {
    e.preventDefault()
    //Henter værdier fra form
    let id= document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let adminPassword = localStorage.getItem("password")
    
    //Objekt der sendes
    let payload = {
        id: id,
        name: name,
        password: password,
        adminPassword: adminPassword
    }

    fetch("http://localhost:1000/adminOpdater",{
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            'content-Type': 'application/json'
        },
        }) 
        .catch((err) => {
        console.log('error:', err)
    })
})




//--------------------------SLET EN BRUGER-----
//henter from
var formSlet = document.getElementById("formslet")

//giver funktion til form
formSlet.addEventListener('submit', function(e) {
    e.preventDefault()
    let id = document.getElementById("userid").value
    let adminPassword = localStorage.getItem("password")

      const payload = {
        id: id,
        adminPassword: adminPassword,
      };
      fetch(`http://localhost:1000/adminDelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  });


//--------ADMIN OPGRADER-----------------------------

  var opgraderUser = document.getElementById("form23")
 

  opgraderSubmit.addEventListener('click', function(e) {
      e.preventDefault()
      //Henter værdier fra form
      let id= document.getElementById("userId").value;
      let status= document.getElementById("status").value;
  
      let adminPassword = localStorage.getItem("password")
      //Objekt der sendes
      
      let payload = {
          id: id,
          status: status,
          adminPassword: adminPassword
      }
  
      fetch("http://localhost:1000/adminOpgrader",{
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
              'content-Type': 'application/json'
          },
          }) 
          .catch((err) => {
          console.log('error:', err)
      })
  })
  
  
  //---------------SE ADMIN STATS - I ALT ANNONCER-------------------------------------------------
  
  document.getElementById("hejhej").addEventListener('click', () =>{
    
      document.getElementById("p1").innerHTML = "Vent venligst";
      let adminPassword = localStorage.getItem("password")

      let payload = {
          adminPassword: adminPassword
      }
  
     fetch ('http://localhost:1000/adminStats', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
              'Content-Type': 'application/json'
          },
      })
    
      .then(response => response.json())
      .then(antal => {
          console.log(antal[1].total_annoncer)
          document.getElementById("p1").innerHTML = "Antal annoncer: " + antal[1].total_annoncer;
      })
  })
  
  
  ///----STAT PR BRUGER------------
  //knap til at se vare
  let seStat = document.getElementById("seStat")
  //tabel hvor varene skal sættes ind
  let listStat = document.getElementById("listStat")
  
  seStat.addEventListener('click', () =>{
    
    let adminPassword = localStorage.getItem("password")

      let payload = {
          adminPassword: adminPassword
      }
      
      //LAVER TABEL
      listStat.innerHTML = `
      <tr>
          <th>Bruger</th>
          <th>Antal Annoncer</th>
      <tr/>
      `;
    
     fetch ('http://localhost:1000/adminStats2', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
              'Content-Type': 'application/json'
          },
      })
    
      .then(response => response.json())
      .then(antal => {
          console.log(antal[1])
          for (i in antal){
              listStat.innerHTML += 
  
              `
          <tr>
              <td> ${antal[i].user_id}</td>
              <td> ${antal[i].antal_annoncer} </td>
          </tr>`
          
          }
      
      })
  })