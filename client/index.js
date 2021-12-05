document.addEventListener("DOMContentLoaded", function(){

    //lav bruger
    let submit = document.getElementById("submit")

    submit.addEventListener("click", (e) =>{
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let newUser = {
            password: password,
            username: username
     }
        console.log(newUser)

        fetch("/create",{
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }) .then(response => response.json())
        .then(data => {
        console.log(data)
        })
        .catch((error) => {
        console.log('error:', error)
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
    .catch((error) => {
        console.log('error: ', error)
    })

    })

    //opdater bruger
    const ChangeUserSubmit = document.getElementById("ChangeUserSubmit")

    ChangeUserSubmit.addEventListener("click", (e) =>{
        e.preventDefault();

        let username = document.getElementById("changeUserName").value;
        let password = document.getElementById("changeUserPassword").value;

        let updatedUser = {
            password: password,
            username: username
     }

        fetch("/opdater",{
            method: "PUT",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        }) .then(response => response.json())
       .then(data => {
        console.log(data)
       })
        .catch((error) => {
        console.log('error:', error)
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

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const loginUser = {
      username: username,
      password: password
    };

console.log(loginUser)
fetch("http://localhost:4000/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(loginUser),
})
  .then((response) => {
    if (response.status === 403) {
      alert("Oplysninger forkert");
  } else {
    headers = response.headers
    localStorage.setItem("username", headers.get("username"))
    localStorage.setItem("password", headers.get("password"))
    loginDisplay()
  }

    });

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
        location.href='http://localhost:4000/opretVare.html'
    } else {
        alert("Log In!")
 }
})



//vare indstillinger

let refresh = document.getElementById("refresh")
let list = document.getElementById("list")
let kategori4 = document.getElementById("kategori")
let test = "bil"
refresh.addEventListener('click', async () =>{
    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Kategori</th>
        <th>Image</th>
    <tr/>
    `;
    
    await fetch ('http://localhost:4000/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res)=> {
        console.log(res)
        

        res.forEach(e => {
            if (e.kategori === kategori4.value) {
                list.innerHTML += `
            <tr>
                <td> ${e.title}</td>
                <td> ${e.price}</td>
                <td> ${e.kategori}</td>
                <td> <img src="${e.thumbnail}" style=height: 50px;width:50px;</td>
            </tr>
            `} 
        });
    })
});











/*
let refresh = document.getElementById("refresh")
let list = document.getElementById("list")
let kategori = document.getElementById("kategori")

refresh.addEventListener('click', async () =>{
    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Kategori</th>
        <th>Image</th>
    <tr/>
    `;

    await fetch ('http://localhost:4000/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res)=> {
        console.log(res)

        res.forEach((e) => {
            list.innerHTML += `
            <tr>
                <td> ${e.title}</td>
                <td> ${e.price}</td>
                <td> ${e.kategori}</td>
                <td> <img src="${e.thumbnail}" style=height: 50px;width:50px;</td>
            </tr>
            `;
        });
    })
});
*/
