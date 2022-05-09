
var form = document.getElementById("form1")

form.addEventListener('submit', function (e) {
    e.preventDefault()

    let title = document.getElementById("title").value
    let price = document.getElementById("price").value
    let colour = document.getElementById("colour").value
    let category = document.getElementById("category").value
    let location = document.getElementById("location").value
    let billede = document.getElementById("billede").value

    let payload = {
        title: title,
        price: price,
        location: location,
        colour: colour,
        category: category,
        billede: billede
    }

    console.log(payload)

    fetch("http://localhost:1000/annoncer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            return response
        })
        .then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
})




//Slet annoncer

const deleteSubmit = document.getElementById("deleteSubmit")
//giver knap funktin
deleteSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("hej")

    let oldTitle = document.getElementById("deleteAnnonce").value;

    fetch(`http://localhost:1000/sletAnnonce/${oldTitle}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then((response) => {
            return response
        })
        .then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
})



//opdater vare

//sumbit knap fra form
const ChangeVareSubmit = document.getElementById("ChangeVare")
//giver knap funktion
ChangeVareSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    //henter værdier fra formen
    let title = document.getElementById("changeTitle").value;
    let price = document.getElementById("changePrice").value;
    let location = document.getElementById("changeLocation").value;
    let oldTitle = document.getElementById("oldTitle").value;
    let colour = document.getElementById("colour").value
    let category = document.getElementById("category").value

    //obejkt der skal sendes
    let payload = {
        title: title,
        price: price,
        location: location,
        oldTitle: oldTitle,
        colour: colour,
        category: category
    }

    fetch("http://localhost:1000/opdaterAnnonce", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            'content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch((error) => {
            console.log('error:')
        })
})

//  -----------Få vare
//tabel til vare

//knap til at se vare
//  -----------Få vare
//tabel til vare

//knap til at se vare
let seVare = document.getElementById("seVare2")
//tabel hvor varene skal sættes ind
let list = document.getElementById("list3")

seVare.addEventListener('click', () =>{

    let user_id = localStorage.getItem("user_id")
    console.log(user_id)


    list.innerHTML = `
    <tr>
        <th>Titel</th>
        <th>Pris</th>
        <th>Location</th>
        <th>Kategori</th>
        <th>Farve</th>
        <th>Billede</th>
    <tr/>
    `;



   fetch (`http://localhost:1000/annoncer/${user_id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then(response => response.json())
    .then(annonce => {
        console.log(annonce[1])
        for (i in annonce){
            list.innerHTML += 

            `
        <tr>
            <td> ${annonce[i].title}</td>
            <td> ${annonce[i].price} kr </td>
            <td> ${annonce[i].location}</td>
            <td> ${annonce[i].category}</td>
            <td> ${annonce[i].colour}</td>
        </tr>`
        
        }
    
    })
})




