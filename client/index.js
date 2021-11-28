document.addEventListener("DOMContentLoaded", function(){

    let submit = document.getElementById("submit")

    submit.addEventListener("click", (e) =>{
        e.preventDefault();

        let username = document.getElementById("username").value;

        var uniq = 'id' + Date.now().toString(36)
        let newUser = {
      id: uniq,
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
        alert("succes" + data.msg)
        })
        .catch((error) => {
        console.log('error:', error)
        })
    })

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
            allUsers.innerHTML += "<p> Username: " + element.user + " id: " + element.id + "</p>"
        });
    })
    .catch((error) => {
        console.log('error: ', error)
    })

    })

});
