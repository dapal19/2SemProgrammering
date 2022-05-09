var changeUserInfo = document.getElementById("changeUserInfo")
// Listening on all id in the update.html
// using preventDefault, so the submit dosen't execute when the HTML page opens 
changeUserInfo.addEventListener('click', function(e) {
    e.preventDefault()
    //Henter værdier fra form
    let oldname= document.getElementById("oldname").value;
    let oldpassword = document.getElementById("oldpassword").value;
    let name = document.getElementById("newname").value;
    let password = document.getElementById("newpassword").value;
    //Objekt der sendes
    
    let updatedUser = {
        oldname: oldname,
        oldpassword: oldpassword,
        name: name,
        password: password,
    }

    fetch("http://localhost:1000/opdater",{
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
            'content-Type': 'application/json'
        },
        }) 
        .catch((err) => {
        console.log('error:', err)
    })
})


//----- slet bruger
var form = document.getElementById("form")

form.addEventListener('submit', function(e) {
    e.preventDefault()
    var password = document.getElementById("password").value

    
      const user = {
        password: password,
      };


      fetch(`http://localhost:1000/mainsite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      window.location.replace('http://localhost:1000/opret.html')
  });





///----HVEM FØLGER DU?-----
//knap til at se vare
let seVare = document.getElementById("seVare")
//tabel hvor varene skal sættes ind
let list = document.getElementById("list")

seVare.addEventListener('click', () =>{

    password = localStorage.getItem("password")

    payload = {
        password: password
    }

    list.innerHTML = `
    <tr>
        <th>Titel</th>
        <th>Pris</th>
        <th>Location</th>
        <th>Kategori</th>
        <th>Farve</th>
        <th>Billede</th>
    <tr/>
    `;
  
   fetch ('http://localhost:1000/whoFollow', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        },
    })
  
    .then(response => response.json())
    .then(annonce => {
        console.log(annonce[1])
        for (i in annonce){
            list.innerHTML += 

            `
        <tr>
            <td> ${annonce[i].title}</td>
            <td> ${annonce[i].price} kr </td>
            <td> ${annonce[i].location}</td>
            <td> ${annonce[i].category}</td>
            <td> ${annonce[i].colour}</td>
        </tr>`
        
        }
    
    })
})