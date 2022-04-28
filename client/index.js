//Opret en bruger
//Knap til formen lav bruger
let submit = document.getElementById("submit")
//knappen tildeles en funktion
submit.addEventListener("click", (e) =>{
    e.preventDefault();
    //Henter input værdier fra formen
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //Bruger obejct på baggrund af input værider 
    let newUser = {
        password: password,
        username: username
     }
    //Sender request
    fetch("/create",{
        method: "POST",
        body: config(newUser),
        headers: {
            'content-Type': 'mssql'
            },
        }).then(response => response.json())
        .catch((err) => {
        console.log('error:', err)
    })
})
//Knap der redirecter over til login-siden efter man har oprettet profil
document.getElementById("submit").addEventListener("click", ()=>{
        location.href='http://localhost:4000/Login.html'
    })
//Knap der redirecter over til login-siden, hvis man allerede har en profil.
document.getElementById("login").addEventListener("click", ()=>{
        location.href='http://localhost:4000/Login.html'
    })

