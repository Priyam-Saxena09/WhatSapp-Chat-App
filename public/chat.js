const socket = io()
const params = new URLSearchParams(window.location.search)
const users = document.querySelector(".users")
users.innerHTML = ` <h2>Members in room ${params.get("room")}</h2>`
const name = params.get("name")
const room = params.get("room")
const button = document.querySelector("button")
const messcont = document.querySelector(".mess")
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
button.addEventListener("click",() => {
    const input = document.querySelector("#message").value
    if(input != "")
    {
        button.setAttribute("disabled","disabled") 
        socket.emit("messtoall",input,(error) => {
               if(error)
               {
                  alert("Unable to Send your message");
               }
               else
               {
                   alert("Message is delivered successfully");
               }
               button.removeAttribute("disabled")
               document.querySelector("#message").value = ""
        })
    }
    else
    {
        return
    }
})

socket.on("wel",({message,name}) => {
    const div = document.createElement("div")
    div.className = "onemess"
    div.innerHTML = `<h3>${name} at ${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()} 
                                    ${new Date().getHours()}:${new Date().getMinutes()}</h3>
                    <b>${message}</b>`
    messcont.appendChild(div)                
})

socket.on("entry",({message,name}) => {
    const div = document.createElement("div")
    div.className = "onemess"
    div.innerHTML = `<h3>${name} at ${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()} 
                                    ${new Date().getHours()}:${new Date().getMinutes()}</h3>
                    <b>${message}</b>`
    messcont.appendChild(div)                
})

socket.on("members",({member,room}) => {
    users.innerHTML = ""
    users.innerHTML = `<h2>Members in room ${room}</h2>
                       <hr width="99%"/>`
    for(let i=0;i<member.length;i++)
    {
        const b= document.createElement("b")
        b.innerHTML = `${member[i].name}`
        users.appendChild(b)
    }                   
})

socket.on("mess",({message,name}) => {
    if(!name)
    {
        return
    }
    const div = document.createElement("div")
    div.className = "onemess"
    div.innerHTML = `<h3>${name} at ${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()} 
                                    ${new Date().getHours()}:${new Date().getMinutes()}</h3>
                    <b>${message}</b>`
    messcont.appendChild(div)                
})

socket.emit("join",{name,room},(error) => {
    if(error)
    {
        alert(error)
    }
})