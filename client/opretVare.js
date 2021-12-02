let form = document.getElementById("submitForm");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);

    await fetch('http://localhost:4000/item', {
        method: 'POST',
        body: dataForm
    })
})




let refresh = document.getElementById("refresh")
let list = document.getElementById("list")
refresh.addEventListener('click', async () =>{
    list.innerHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Kategori</th>
        <th>Image</th>
    <tr/>
    `;

    await fetch ('http://localhost:4000/items', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((res)=> {
        console.log(res)

        res.forEach((e) => {
            list.innerHTML += `
            <tr>
                <td> ${e.title}</td>
                <td> ${e.price}</td>
                <td> ${e.kategori}</td>
                <td> <img src="${e.thumbnail}" style=height: 50px;width:50px;</td>
            </tr>
            `;
        });
    })
});






//slet vare

  const deleteSubmit = document.getElementById("deleteSubmit")

  deleteSubmit.addEventListener("click", (e) =>{
      e.preventDefault();

      let title = document.getElementById("deleteVare").value;

   fetch("/sletvare/" + title,{
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
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(updatedVare)
        }) .then(response => response.json())
       .then(data => {
        console.log(data)
       })
        .catch((error) => {
        console.log('error:', error)
        })
    })