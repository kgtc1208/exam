const navBtn = document.querySelector(".nav-btn")
const navBar = document.querySelector(".navbar")
const bars = document.querySelector(".fa-bars")
const title = document.querySelector(".title")
const photo = document.querySelector(".article-photo")
const body = document.querySelector(".body")
const main = document.querySelector(".main-hide")
const input = document.querySelector(".comment-input")
const inputBtn = document.querySelector(".comment-btn")
const loading = document.querySelector(".loading")
const spinIcon = document.querySelector(".fa-stroopwafel")
const author = document.querySelector(".author")
const postId = localStorage.getItem("postId")
const authorId = localStorage.getItem("authorId")
const articlePhoto = localStorage.getItem("photo")
const activeUser = JSON.parse(localStorage.getItem('activeUser'))
const star = document.querySelector(".fa-star")
const msg = document.querySelector(".save-msg-hide")
var favorites = []

const getPostInfo = async()=>{
    response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    post = await response.json()
    return post
}

getPostInfo().then((v)=>{
    title.innerHTML = v.title
    photo.setAttribute("src", articlePhoto)
    body.innerHTML = v.body
})

const getAuthor = async()=>{
    response = await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`)
    authorInfo = await response.json()
    return authorInfo
}

getAuthor().then((v)=>{
    author.innerHTML = "By: " + v.name
})

const getComments = async()=>{
    response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    comments = await response.json()
    return comments
}

getComments().then((v)=>{
    for(let x=0; x<v.length; x++){
        var comment = document.createElement("div")
        comment.className = "comment"
        document.querySelector(".comments").appendChild(comment)
        var email = document.createElement("div")
        email.innerHTML = v[x].email + " says:"
        email.className = "email"
        comment.appendChild(email)
        var commentContent = document.createElement("p")
        commentContent.innerHTML = v[x].body
        commentContent.className = "comment-content"
        comment.appendChild(commentContent)
    }

    const display = ()=>{
        main.classList.remove("main-hide")
        main.classList.add("main")
        loading.classList.remove("loading")
        loading.classList.add("loading-hide")
        spinIcon.classList.remove("fa-stroopwafel")
        spinIcon.classList.add("fa-stroopwafel-hide")
    }
    display()

    star.addEventListener('click', ()=>{
        star.classList.toggle("saved")
        msg.innerHTML = (star.getAttribute("class") === "far fa-star")? "Removed from Favorites":"Added to Favorites"
        msg.classList.remove("save-msg-hide")
        msg.classList.add("save-msg")
        setTimeout(()=>{
        msg.classList.add("save-msg-hide")
        msg.classList.remove("save-msg")
        }, 1000)
    
        if(star.getAttribute("class") !== "far fa-star"){
            if(!JSON.parse(localStorage.getItem("favorites"))){
                favorites.push({title:title.innerHTML, photo: photo.innerHTML, body:body.innerHTML})
                localStorage.setItem("favorites", JSON.stringify(favorites))
            }else{
                favorites = JSON.parse(localStorage.getItem("favorites"))
                favorites.push({title:title.innerHTML, photo: photo.innerHTML, body:body.innerHTML})
                localStorage.setItem("favorites", JSON.stringify(favorites))
            }
        }else{
            var f = favorites.filter(favorite => {
                favorite.title === title.innerHTML
            })

            favorites = JSON.parse(localStorage.getItem("favorites"))
            i = favorites.indexOf(f)

            favorites.splice(i, 1)
            localStorage.setItem("favorites", JSON.stringify(favorites))

            
        }

    })
    
})

navBtn.addEventListener('click', ()=>{
    navBar.classList.toggle("visible");
    bars.classList.toggle("visible");
})

inputBtn.addEventListener('click', ()=>{
    let cmmnt = input.value

    if(cmmnt.length !==0){
        var comment = document.createElement("div")
        comment.className = "comment"
        document.querySelector(".comments").appendChild(comment)
        var email = document.createElement("div")
        email.innerHTML = activeUser[0].email + " says:"
        email.className = "email"
        comment.appendChild(email)
        var commentContent = document.createElement("p")
        commentContent.innerHTML = cmmnt
        commentContent.className = "comment-content"
        comment.appendChild(commentContent)
    }
})

