
//------LOGIN-----

//login 
//knap til login
let login = document.getElementById("submit")
login.addEventListener("click", (e) =>{
    e.preventDefault();

    let name = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let payload = {
      name: name,
      password: password
    };


    fetch("http://localhost:1000/loginBruger", {
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
            localStorage.setItem("user_id", headers.get("user_id"))
            location.href='http://localhost:1000/mainsite.html'
        //funktion der viser at man er logget ind
        }
    });
})

  