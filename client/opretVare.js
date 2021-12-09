
//henter localStroage value til key'en username
let username = localStorage.getItem("username")


//henter formen
let form = document.getElementById("submitForm");
//sætter hidden element "local" i formen til den value som key'en "username" har i localstorage
document.getElementById('local').setAttribute('value', localStorage.getItem('username'));

//giver formen en funktion når den "submittes"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //formData representeret i key-values
    const dataForm = new FormData(form)

    fetch('http://localhost:4000/item', {
        method: 'POST',
        body: dataForm
    }) 
})



//knap til at se vare
let seVare = document.getElementById("seVare")
//tabel hvor varene skal sættes ind
let list = document.getElementById("list")
//henter værdien til "username" i localstorage
let localusername = localStorage.getItem("username")

//funktion der udføres når der trykkes på knappen for at se vare
seVare.addEventListener('click', () =>{
    //ændre HTML i tabellen "list"
    //tr - table row
    //th - table head - forneden defineres et table row med følgende headers
    list.innerHTML = `
    <tr>
        <th>Titel</th>
        <th>Pris</th>
        <th>Kategori</th>
        <th>Billede</th>
    <tr/>
    `;

    fetch ('http://localhost:4000/items', {
        method: 'GET'
    })
    //laver response om til json
    .then((res) => res.json())
    .then((res)=> {
        //udføre funktion for hvert element i array'et fra res
        res.forEach(e => {
            //tjekker om varen er brugeren egen - sammenligner med local storage 
            if (e.local === localusername) {
                list.innerHTML += 
                //td - tabel celle. Laver tabel celle for hvert element på et tr
                `
            <tr>
                <td> ${e.title}</td>
                <td> ${e.price}</td>
                <td> ${e.kategori}</td>
                <td> <img src="${e.image}" style=height: 50px;width:50px;</td>
            </tr>
            `} 
        });
    })
});






//slet vare



const deleteSubmit = document.getElementById("deleteSubmit")

deleteSubmit.addEventListener("click", (e) =>{
      e.preventDefault();

      let deleteTitle = document.getElementById("deleteVare").value;

   fetch("/sletvare/" + deleteTitle,{
      method: "DELETE",
      headers: {
          'content-Type': 'application/json'
    },
    }) .then(response => response.json())
      .catch((error) => {
   console.log('error:', error)
      })
})


//opdater vare

//sumbit knap fra form
const ChangeVareSubmit = document.getElementById("ChangeVare")
ChangeVareSubmit.addEventListener("click", (e) =>{
    e.preventDefault();

    //henter værider fra formen
    let title = document.getElementById("changeTitle").value;
    let price = document.getElementById("changePrice").value;
    let kategori = document.getElementById("changeKategori").value;
    let oldTitle = document.getElementById("oldTitle").value;
    
    //obejkt der skal sendes
    let updatedVare = {
            title: title,
            price: price,
            kategori: kategori,
            oldTitle: oldTitle
    }


    fetch("/opdaterVare",{
        method: "PUT",
        body: JSON.stringify(updatedVare),
        headers: {
            'content-Type': 'application/json'
        },
        }) 
        .then(response => response.json())
        .catch((error) => {
        console.log('error:', error)
    })
})

