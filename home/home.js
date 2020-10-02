const navBtn = document.querySelector(".nav-btn")
const navBar = document.querySelector(".navbar")
const bars = document.querySelector(".fa-bars")
const saveMsg = document.querySelector(".save-msg")

const getPosts = async() => {
    postResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    posts = await postResponse.json()
    return posts
}

const showMsg = (e)=>{
    saveMsg.classList.remove("save-msg-hide")
    saveMsg.classList.add("save-msg-hide")
}

getPosts().then((v)=>{
    for(let x=0; x<10; x++){
        var articleCard = document.createElement("div")
        articleCard.className="article-card"
        articleCard.setAttribute("key", v[x].id)
        articleCard.setAttribute("userid", v[x].userId)
        document.querySelector(".main-content").appendChild(articleCard)
        var title = document.createElement("header")
        title.innerHTML = (v[x].title.length > 20) ? v[x].title.substring(0,21) + "..." : v[x].title
        title.className="title"
        articleCard.appendChild(title)
        var body = document.createElement("div")
        body.innerHTML = (v[x].body.length > 20) ? v[x].body.substring(0,200) + "..." : v[x].body
        body.className="preview"
        articleCard.appendChild(body)
    }

    for(let x=0; x<3; x++){
        var n = Math.floor(Math.random() * 20)
        var topArticle = document.createElement("div")
        topArticle.className = "top-article"
        topArticle.setAttribute("key", v[n].id)
        topArticle.setAttribute("userid", v[n].userId)
        document.querySelector(".top-content").appendChild(topArticle)
        var title = document.createElement("h2")
        title.className="top-title"
        title.innerHTML = (v[n].title.length > 20) ? v[n].title.substring(0,21) + "..." : v[n].title
        topArticle.appendChild(title)
    }

})

const articleCard = document.getElementsByClassName("article-card")
const topArticle = document.getElementsByClassName("top-article")

const getPhotos = async() => {
    photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos')
    photos = await photosResponse.json()
    return photos
}

const getAtts = (e)=>{
    localStorage.setItem('postId', e.target.getAttribute('key'))
    localStorage.setItem('authorId', e.target.getAttribute('userId'))
    localStorage.setItem('photo', e.target.getAttribute('articlePhoto'))
    window.location.href = '../blog/blog.html'
}

getPhotos().then((v)=>{
    for(let x=0; x<articleCard.length; x++){
        var articlePhoto = document.createElement("img")
        articlePhoto.setAttribute("src", v[x].thumbnailUrl)
        articleCard[x].setAttribute("articlePhoto", v[x].thumbnailUrl)
        target = document.getElementsByClassName("preview")
        target[x].parentNode.insertBefore(articlePhoto,target[x])
        articleCard[x].onclick = getAtts
    }

    for(let x=0; x<topArticle.length; x++){
        var n = Math.floor(Math.random() * 20)
        var topPhoto = document.createElement("img")
        topPhoto.setAttribute("src", v[n].thumbnailUrl)
        topArticle[x].setAttribute("articlePhoto", v[n].thumbnailUrl)
        topPhoto.className = "top-photo"
        topArticle[x].appendChild(topPhoto)
        topArticle[x].onclick = getAtts
    }
})

navBtn.addEventListener('click', ()=>{
    navBar.classList.toggle("visible");
    bars.classList.toggle("visible");
})