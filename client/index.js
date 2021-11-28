document.addEventListener("DOMContentLoaded", function(){

    let button = document.getElementById("apiButton")

    button.addEventListener("click",()=>{

        console.log('hej')
    })

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

        fetch("/user",{
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
});
