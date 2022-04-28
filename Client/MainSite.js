//Liste over brugere (kun til at visulisere bruger funktioner)
const getAllUsers = document.getElementById("getAllUsers")
const allUsers = document.getElementById("allUsers")
getAllUsers.addEventListener("click", (e) =>{
    e.preventDefault();
    fetch("/userList", {
        method: "GET",
        headers: {
            'content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        allUsers.innerHTML = ""
        data.forEach(element => {
            allUsers.innerHTML += "<p> Username: " + element.username + ", Password: " + element.password + "</p>"
        });
    })
    .catch((err) => {
        console.log('error: ', err)
    })
})
//Slet bruger
//Henter knap 
const deleteSubmit = document.getElementById("deleteSubmit")
//Giver knap funktin
deleteSubmit.addEventListener("click", (e) =>{
    location.href='http://localhost:4000/Login.html'
    e.preventDefault();
    //Henter password fra form
    let password = document.getElementById("deleteUser").value;
    fetch("/delete/" + password,{
        method: "DELETE",
        headers: {
            'content-Type': 'application/json'
        },
        }) .then(response => response.json())
        .then(data => {
        console.log(data)
         })
        .catch((error) => {
     console.log('error:', error)
    })
})
//Log ud fra sitet
document.getElementById("logOut").addEventListener("click", () => {
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    loginDisplay();
})
document.getElementById("logOut").addEventListener("click", ()=>{
        location.href='http://localhost:4000/Login.html'
    })
//Text fra html
const h2 = document.querySelector('h2')
const a2 = document.querySelector('ha')
//Hvad skal der vises når man logger ind
function loginDisplay(){
    //Tjekker om der er bruger i localstroage
    if (localStorage.getItem("username")){
        //henter værdien til username key
        let username = localStorage.getItem("username")
        //sætter h2 til følgende text
        h2.textContent= 'Velkommen til sitet ' + username + "!"
    } else {
        //hvis ikke logget in skal følgende vises
        h2.textContent = 'hvem er du?'
 }
}
//Når doucment bliver loaded kører funktionen
document.onload = loginDisplay()
    //Knap til siden for at oprette vare
document.getElementById("opretVareKnap").addEventListener("click", ()=>{
    //Hvis username findes i localstorage sendes brugeren videre
    if (localStorage.getItem("username")){
        location.href='http://localhost:4000/opretVare.html'
    //Hvis bruger ikke findes skal de logge ind
    } else {
        alert("Husk at log ind!")
    }
})
//henter knap til at se vare
let seVare = document.getElementById("seVare")
//refere til html tabel
let list = document.getElementById("list")
//refere til select menu til valg af kategori
let formKategori = document.getElementById("kategori")

//giver knappen en funktion
seVare.addEventListener('click', async () =>{
    //tilgår tabel element i html og laver tabel overskrifer
    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Kategori</th>
        <th>imageUpload</th>
    <tr/>
    `;
    
    await fetch ('http://localhost:4000/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res)=> {        
        res.forEach(e => {
        //laver tabel linjer for objekter der har specifikt kategori
            if (e.kategori === formKategori.value) {
                list.innerHTML += `
            <tr>
                <td> ${e.title}</td>
                <td> ${e.price} kr </td>
                <td> ${e.kategori}</td>
                <td> <img src="${e.image}" width="193" height="130";</td>
            </tr>
            `} 
        });
    })
//Opdater bruger
//Henter knap til form
const ChangeUserSubmit = document.getElementById("ChangeUserSubmit")
ChangeUserSubmit.addEventListener("click", (e) =>{
    e.preventDefault();

    //henter værdier fra form
    let oldPassword = document.getElementById("oldPassword").value;
    let username = document.getElementById("changeUserName").value;
    let password = document.getElementById("changeUserPassword").value;

    //objekt der sendes
    let updatedUser = {
        oldPassword: oldPassword,
        password: password,
        username: username
    }

    fetch("/opdater",{
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
});
