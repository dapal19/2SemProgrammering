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

    fetch("http://localhost:1000/profil",{
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


var form = document.getElementById("form")

form.addEventListener('submit', function(e) {
    e.preventDefault()
    var password = document.getElementById("password").value
      const user = {
        password: password,
      };
      fetch(`http://localhost:1000/profil`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      window.location.replace('http://localhost:1000/opret.html')
  });

