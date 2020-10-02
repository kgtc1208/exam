

///    INCOMPLETE CODE



const navBtn = document.querySelector(".nav-btn")
const navBar = document.querySelector(".navbar")
const bars = document.querySelector(".fa-bars")
const favorites = JSON.parse(localStorage.getItem("favorites"))
console.log(favorites.length)

navBtn.addEventListener('click', ()=>{
    navBar.classList.toggle("visible");
    bars.classList.toggle("visible");
})

for(let x=0; x<favorites.length; x++){
    var articleCard = document.createElement("div")
    articleCard.className="article-card"
    document.querySelector(".main").appendChild(articleCard)
    var title = document.createElement("header")
    title.innerHTML = (favorites[x].title.length > 20) ? favorites[x].title.substring(0,21) + "..." : favorites[x].title
    title.className="title"
    articleCard.appendChild(title)
    var body = document.createElement("div")
    body.innerHTML = (favorites[x].body.length > 20) ? favorites[x].body.substring(0,200) + "..." : favorites[x].body
    body.className="preview"
    articleCard.appendChild(body)
}

