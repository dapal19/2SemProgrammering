//Login 
//Knap til login
let login = document.getElementById("submit")
login.addEventListener("click", (e) =>{
    e.preventDefault()
    //Værdier fra form
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    //Oplysninger der skal sendes til serveren
    let loginUser = {
      name: name,
      password: password
    };
    fetch("http://localhost:1000/login", {
        method: "POST", 
        body: JSON.stringify(loginUser),
        headers: {
            "Content-Type": "application/json",
        },
        })
        //Håndterer promise fra fetch med then
        .then((response) => {
        //Hvis oplsyningerne ikke findes sendes en alert
        if (response.status === 400) {
             alert("brugeren findes ikke!");
        }   
        //Ellers gemmes response i localstorage
        else {
            headers = response.headers
            localStorage.setItem("name", headers.get("name"))
            localStorage.setItem("password", headers.get("word"))
            location.href='http://localhost:1000/mainsite.html'
        //Funktion der viser at man er logget ind

            loginDisplay()
            
        }})})
  