
let form = document.getElementById("submitForm");
let username = localStorage.getItem("username")

document.getElementById('local').setAttribute('value', localStorage.getItem('username'));

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataForm = new FormData(form)

    await fetch('http://localhost:4000/item', {
        method: 'POST',
        body: dataForm
    }) 
})


let seVare = document.getElementById("seVare")
let list = document.getElementById("list")
let localusername = localStorage.getItem("username")


seVare.addEventListener('click', async () =>{
    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Kategori</th>
        <th>imageUpload</th>
    <tr/>
    `;

    await fetch ('http://localhost:4000/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res)=> {
        res.forEach(e => {
            if (e.local === localusername) {
                list.innerHTML += `
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
 
const ChangeVareSubmit = document.getElementById("ChangeVare")

ChangeVareSubmit.addEventListener("click", (e) =>{
    e.preventDefault();

    let title = document.getElementById("changeTitle").value;
    let price = document.getElementById("changePrice").value;
    let kategori = document.getElementById("changeKategori").value;
        

    let updatedVare = {
            title: title,
            price: price,
            kategori: kategori
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

