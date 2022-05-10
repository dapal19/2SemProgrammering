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
            localStorage.setItem("username", headers.get("name"))
            localStorage.setItem("password", headers.get("password"))
            localStorage.setItem("admin_id", headers.get("admin_id"))
        //funktion der viser at man er logget ind
        location.href='http://localhost:1000/admin.html'
        }
    });
})
       
    
