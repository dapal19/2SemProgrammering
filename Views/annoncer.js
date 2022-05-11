//Opret en anonce

let form = document.getElementById("submitForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let user_id = localStorage.getItem("user_id")

    //formData representeret i key-values
    const dataForm = new FormData(form)
    console.log(dataForm)

    fetch(`http://localhost:1000/item/${user_id}`, {
        method: 'POST',
        body: dataForm
    }) 
})




//Slet annoncer


const deleteSubmit = document.getElementById("deleteSubmit")


deleteSubmit.addEventListener("click", (e) =>{
    e.preventDefault();
    
    let oldTitle = document.getElementById("deleteAnnonce").value;
    let user_id = localStorage.getItem("user_id")

    fetch(`http://localhost:1000/sletAnnonce/${oldTitle}/${user_id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then((response) => {
        return response
    })
     .catch((err) =>{
         console.log(err)
    })
})
    

//opdater vare

//sumbit knap fra form
const ChangeVareSubmit = document.getElementById("ChangeVare")
//giver knap funktion
ChangeVareSubmit.addEventListener("click", (e) =>{
    e.preventDefault();

    //henter værdier fra formen
    let title = document.getElementById("changeTitle").value;
    let price = document.getElementById("changePrice").value;
    let location = document.getElementById("changeLocation").value;
    let oldTitle = document.getElementById("oldTitle").value;
    let colour = document.getElementById("colour").value
    let category = document.getElementById("category").value
    let user_id = localStorage.getItem("user_id")
    
    //obejkt der skal sendes
    let payload = {
            title: title,
            price: price,
            location: location,
            oldTitle: oldTitle,
            colour: colour,
            category: category,
            user_id: user_id
    }

    fetch("http://localhost:1000/opdaterAnnonce",{
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            'content-Type': 'application/json'
        },
        }) 
        .then((response) => {
            //Hvis oplsyningerne ikke findes sendes en alert
            if (response.status === 999) {
                 alert("Varen findes ikke!");
            }  else {
                alert("VAren er opadteret, har du udfyldt alle felter?")
            }

        })
        .catch((error) => {
        console.log(error)
    })
})

















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
            <td> <img src="${annonce[i].billede}" width="193" height="130";</td>
        </tr>`
        
        }
    
    })
})




