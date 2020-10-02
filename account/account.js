const navBtn = document.querySelector(".nav-btn")
const navBar = document.querySelector(".navbar")
const bars = document.querySelector(".fa-bars")
const name = document.getElementById("name")
const save = document.getElementById("save")
const back = document.getElementById("back")
const username = document.getElementById("username")
const email = document.getElementById("email")
const activeUser = JSON.parse(localStorage.getItem('activeUser'))

const update = async()=>{
    response = await fetch(`https://jsonplaceholder.typicode.com/users/${activeUser[0].id}`, {
        method:'PATCH',
        body: JSON.stringify({
        name: name.value,
        username: username.value,
        email: email.value }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
            }
    })
    data = await response.json()
    return data
}

name.value = activeUser[0].name
username.value = activeUser[0].username
email.value = activeUser[0].email

navBtn.addEventListener('click', ()=>{
    navBar.classList.toggle("visible");
    bars.classList.toggle("visible");
})

save.addEventListener('click', async()=>{
    await update().then((v)=> console.log(v))
})

back.addEventListener('click', ()=>{
    window.location.href = "../home/home.html"
})


