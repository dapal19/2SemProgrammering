//Login 
//Knap til login
let login = document.getElementById("login")
login.addEventListener("click", (e) =>{
    e.preventDefault()
    //Værdier fra form
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    //Oplysninger der skal sendes til serveren
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
        //Håndterer promise fra fetch med then
        .then((response) => {

        //Hvis oplsyningerne ikke findes sendes en alert
        if (response.status === 403) {
             alert("brugeren findes ikke!");
        }   
        //Ellers gemmes response i localstorage
        else {
            headers = response.headers
            localStorage.setItem("username", headers.get("username"))
            localStorage.setItem("password", headers.get("password"))
            location.href='http://localhost:4000/Mainsite.html'
        //Funktion der viser at man er logget ind
            loginDisplay()
        }})})
        
