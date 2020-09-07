var users = []
const adduser = (id,name,room) => {
    const fin = users.find((user) => {
        return user.name == name && user.room == room
    })
    if(!fin)
    {
        const user = {id,name,room}
        users.push(user)
        return user
    }
    else
    {
        return undefined
    }
}

const getUsersinoneroom = (room) => {
    const fin = users.filter((users) => {
        return users.room == room
    })

    return fin
}

const removeuser = (id) => {
    const fin = users.findIndex((user) => {
        return user.id == id 
    })

    const user = users[fin]
    users.splice(fin,1)
    return user
}

const finduser = (id) => {
    const fin = users.find((user) => {
        return user.id == id
    })

    return fin
}

module.exports = {
    adduser:adduser,
    getUsersinoneroom:getUsersinoneroom,
    removeuser:removeuser,
    finduser:finduser
}