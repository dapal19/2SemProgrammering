//Opdater bruger
//Henter knap til form
const ChangeUserSubmit = document.getElementById("ChangeUserSubmit")
//Giver knappen en funktion
ChangeUserSubmit.addEventListener("click", (e) =>{
    e.preventDefault();
    //Henter værdier fra form
    let oldPassword = document.getElementById("oldPassword").value;
    let username = document.getElementById("changeUserName").value;
    let password = document.getElementById("changeUserPassword").value;
    //Objekt der sendes
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

