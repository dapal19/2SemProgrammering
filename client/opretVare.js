
/*
    let form = document.getElementById("submitForm");


    form.addEventListener('submit', async (e) => {
    e.preventDefault();


    const formData = new FormData(form);

    await fetch("http://localhost:4000/item", {
        method: "POST",
        body: formData
    })
    .then((res) => res.json())
    .then((res)=> {
        console.log(res)
    })
    });



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

    await fetch ("http://localhost:4000/items", {
        method: "GET"
    })
    .then((res) => res.json())
    .then((res)=> {
        console.log(res)
    })
});

*/