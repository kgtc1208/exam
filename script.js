

///    EMAILS FROM THE API CAN BE USED TO LOGIN, NO PASSWORD NEEDED



localStorage.clear()
const emailField = document.getElementById("email")
const loginBtn = document.getElementById("login-btn")
const errMsg = document.getElementById("error-msg")
const txt = document.getElementById("welcome")
const txtSplit = txt.textContent.split("")
txt.textContent=""

for(let i=0; i < txtSplit.length; i++){
    txt.innerHTML += "<span>" + txtSplit[i] + "</span>"
}

let char = 0
let timer = setInterval(onTick, 50)

function onTick(){
    const span = txt.querySelectorAll('span')[char];
    span.classList.add("light")
    char++
    if(char === txtSplit.length){
        complete()
        return
    }
}

function complete(){
    clearInterval(timer)
    timer = null
}

const getUsers = async () => {
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/')
    const user = await userResponse.json()
    return user
} 

loginBtn.addEventListener("click", async () =>{
    const users = await getUsers().then((v)=> v)
    const filteredUsers = users.filter(user => user.email === emailField.value)
    
    if(filteredUsers.length === 1){
        localStorage.setItem('activeUser', JSON.stringify(filteredUsers))
        window.location.href = "home/home.html"
    }else{
        errMsg.classList.remove("err-msg")
        errMsg.classList.add("disp-err-msg")
    }
})









