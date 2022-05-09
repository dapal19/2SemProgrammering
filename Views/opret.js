//Henter formen fra HTML
var form = document.getElementById("form")
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    
      const bruger = {
        name:name,
        password: password,
      };

      fetch(`http://localhost:1000/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bruger),
      });
      location.href='http://localhost:1000/login.html'
  });
  
