const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const port = process.env.PORT;
const { adduser,getUsersinoneroom,removeuser,finduser } = require("./userlist")
const app = express()
app.use(express.static("public"))
const server = http.createServer(app)
const io = socketio(server)

io.on("connection",(socket) => {
    //console.log("New Client")
    socket.on("join",({name,room},cb) => {
        const user = adduser(socket.id,name,room)
        if(!user)
        {
           return cb("User is already online");
        }
        socket.join(user.room)
        socket.emit("wel",{message:"Welcome",name:user.name})
        socket.broadcast.to(user.room).emit("entry",{message:`${user.name} has joined`,name:user.name})
        io.to(user.room).emit("members",{
            "member":getUsersinoneroom(user.room),
            "room":user.room
        })
        cb(undefined)
    })

    socket.on("messtoall",(mess,cb) => {
        const user = finduser(socket.id)
        if(!mess || !user)
        {
            return cb("Empty message")
        }
        io.emit("mess",{message:mess,name:user.name})
        cb(undefined)
    })

    socket.on("disconnect",() => {
        const user = removeuser(socket.id)
        socket.broadcast.to(user.room).emit("entry",{message:`${user.name} has left`,name:user.name})
        io.to(user.room).emit("members",{
            "member":getUsersinoneroom(user.room),
            "room":user.room
        })
    
    })
})

server.listen(port,() => {
    console.log("Server is running on Port " + port)
})