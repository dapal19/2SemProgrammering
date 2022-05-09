//  -----------Få vare
//tabel til vare
//knap til at se vare
let filtrer = document.getElementById("sVare1")
//tabel hvor varene skal sættes ind
let list = document.getElementById("annoncerList")

filtrer.addEventListener('click', () =>{

     //henter værdier fra formen
     let price1 = document.getElementById("price1").value;
     let price2 = document.getElementById("price2").value;
     let age = document.getElementById("age").value;
     let location = document.getElementById("location").value
     let colour = document.getElementById("colour").value
     let category = document.getElementById("category").value
     
     //obejkt der skal sendes
     let payload = {
             price1: price1,
             price2: price2,
             location: location,
             age: age,
             colour: colour,
             category: category,
     }

     list.innerHTML = `
    <tr>
        <th>Titel</th>
        <th>Pris</th>
        <th>Location</th>
        <th>Kategori</th>
        <th>Farve</th>
        <th>Since_Posted</th>
        <th>User</th>
        <th>Følg?</th>
    <tr/>
    `;

   console.log(payload)


   fetch ('http://localhost:1000/mainsite', {
        method: 'GET',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(antal => {
        console.log(antal[1])
        for (i in antal){
            list.innerHTML += 

            `
        <tr>
            <td> ${antal[i].title}</td>
            <td> ${antal[i].price} </td>
            <td> ${antal[i].location} </td>
            <td> ${antal[i].category} </td>
            <td> ${antal[i].colour} </td>
            <td> ${antal[i].age} </td>
            <td> ${antal[i].name} </td>
            <td> <button id="følg"> se vare </button> </td>
        </tr>`
        let følg = document.getElementById("følg")

            følg.addEventListener('click', () =>{
            følgLogik()
        })
    }
    })
    .catch(error => {error.message = "hej"})

})


