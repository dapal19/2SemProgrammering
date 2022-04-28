//login

/*

let login = document.getElementById("login")

login.addEventListener("click", (e) =>{
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password= document.getElementById("loginPassword").value;

    const loginUser = {
      password: password,
      username: username
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

    localStorage.setItem("password", header.get("password"))
    localStorage.setItem("username", header.get("username"))
  }

});

});

app.post('/login', (req,res) => {
    loginUser = JSON.parse(JSON.stringify(req.body))
    loginUsername = loginUser.user
    loginPassword = loginUser.password

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))

    if (loginUsername in userData) {
        var userInfo = userData[loginUsername]
        if(loginPassword === userInfo.password) {
            res.setHeader("user", userInfo.user)
            res.setHeader("password", userInfo.password)
            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }
    }else res.sendStatus(403)
})




/*app.post('/login', (req,res) => {

    let userData = JSON.parse(fs.readFileSync("dataBase/users.json"))
 
    for (let i = 0; i < userData.length; i++) { 
        if(userData[i].password == req.params.loginPassword && userData[i].user == req.params.loginUsername) {
                res.status(200).send(true);
        } 
    }
})
*/
