document.addEventListener("DOMContentLoaded", function(){

    //lav bruger
    let submit = document.getElementById("submit")

    submit.addEventListener("click", (e) =>{
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let newUser = {
            password: password,
            user: username
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
            allUsers.innerHTML += "<p> Username: " + element.user + ", Password: " + element.password + "</p>"
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
            id: password,
            user: username
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

});
