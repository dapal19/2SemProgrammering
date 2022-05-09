//------LOGIN-----

//login 
//knap til login
let login = document.getElementById("login")
login.addEventListener("click", (e) =>{
    e.preventDefault();

    let name = document.getElementById("loginAdminUsername").value;
    let password = document.getElementById("loginAdminPassword").value;

    let payload = {
      name: name,
      password: password
    };


    fetch("http://localhost:1000/loginAdmin", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
        })
       //håndtere promise fra fetch med then
       .then((response) => {

        //hvis oplsyningerne ikke findes sendes en alert
        if (response.status === 404) {
             alert("brugeren findes ikke!");
        }   
            
        //ellers gemmes response i localstorage
        else {
            headers = response.headers
            localStorage.setItem("username", headers.get("username"))
            localStorage.setItem("password", headers.get("password"))
            localStorage.setItem("admin_id", headers.get("admin_id"))
        //funktion der viser at man er logget ind
        }
    });
})





var changeUserInfo = document.getElementById("changeUserInfo")
// Listening on all id in the update.html
// using preventDefault, so the submit dosen't execute when the HTML page opens 
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




var formSlet = document.getElementById("formslet")

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




  var opgraderUser = document.getElementById("form23")
  // Listening on all id in the update.html
  // using preventDefault, so the submit dosen't execute when the HTML page opens 
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
  
  
  ///----STAT PR BRUGER
  //knap til at se vare
  let seStat = document.getElementById("seStat")
  //tabel hvor varene skal sættes ind
  let listStat = document.getElementById("listStat")
  
  seStat.addEventListener('click', () =>{
    
    let adminPassword = localStorage.getItem("password")

      let payload = {
          adminPassword: adminPassword
      }
  
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