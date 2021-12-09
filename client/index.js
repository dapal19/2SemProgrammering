
//lav bruger

//knap til formen lav bruger
let submit = document.getElementById("submit")

//knappen tildeles en funktion
submit.addEventListener("click", (e) =>{
    e.preventDefault();

    //henter input værdier fra formen
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //Bruger obejct p baggrund af input værider 
    let newUser = {
        password: password,
        username: username
     }

    //Sender request
    fetch("/create",{
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            'content-Type': 'application/json'
            },
        }).then(response => response.json())
        .catch((err) => {
        console.log('error:', err)
    })
})



//liste over brugere
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

//opdater bruger
const ChangeUserSubmit = document.getElementById("ChangeUserSubmit")

ChangeUserSubmit.addEventListener("click", (e) =>{
    e.preventDefault();

    let oldPassword = document.getElementById("oldPassword").value;
    let username = document.getElementById("changeUserName").value;
    let password = document.getElementById("changeUserPassword").value;

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


//slet bruger
const deleteSubmit = document.getElementById("deleteSubmit")

deleteSubmit.addEventListener("click", (e) =>{
    e.preventDefault();

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



//login 
let login = document.getElementById("login")

login.addEventListener("click", (e) =>{
    e.preventDefault();

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let loginUser = {
      username: username,
      password: password
    };


    fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(loginUser),
        headers: {
            "Content-Type": "application/json",
        },
        })
        //håndtere promise fra fetch med then
        .then((response) => {

        //hvis oplsyningerne ikke findes sendes en alert
            if (response.status === 403) {
             alert("brugeren findes ikke!");
            }   
            
        //ellers gemmes response i localstorage
            else {
            headers = response.headers
            localStorage.setItem("username", headers.get("username"))
            localStorage.setItem("password", headers.get("password"))
        //funktion der viser at man er logget ind
            loginDisplay()
            }
        });
    });








const h2 = document.querySelector('h2')
const a2 = document.querySelector('ha')

//log ud
document.getElementById("logOut").addEventListener("click", () => {
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    loginDisplay();
})



//hvad skal der vises når man logger ind
function loginDisplay(){
    if (localStorage.getItem("username")){
        let username = localStorage.getItem("username")
        h2.textContent= 'velkommen ' + username
    } else {
        h2.textContent = 'hvem er du?'
 }
}
document.onload = loginDisplay()


//opret vare sti
document.getElementById("opretVareKnap").addEventListener("click", ()=>{
    if (localStorage.getItem("username")){
        location.href='http://localhost:4000/opretVare'
    } else {
        alert("Husk at log ind!")
    }
})



//vare indstillinger
let seVare = document.getElementById("seVare")
let list = document.getElementById("list")
let formKategori = document.getElementById("kategori")


seVare.addEventListener('click', async () =>{
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
            if (e.kategori === formKategori.value) {
                list.innerHTML += `
            <tr>
                <td> ${e.title}</td>
                <td> ${e.price}</td>
                <td> ${e.kategori}</td>
                <td> <img src="${e.image}" style=height: 50px;width:50px;</td>
            </tr>
            `} 
        });
    })
});


