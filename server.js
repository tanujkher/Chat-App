const express = require('express')
const http = require('http')
const srv = express()

const socket = require('socket.io')

const SERVER_PORT = process.env.PORT || 4615

const server = http.createServer(srv)

const io = socket(server)
const users = {}
const names = []

srv.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('Connection made from ' + socket.id)
    socket.on('login', (data) => {
        if(users[data.username]){
            if(users[data.username] == data.password){
                socket.join(data.username)
                socket.emit('logged_in')
                io.emit('add_user', {
                    names: names
                })
            }else{
                socket.emit('login_failed')
            }
        }else{
            names.push(data.username)
            users[data.username] = data.password
            socket.join(data.username)
            io.to(data.username).emit('msg_rcvd', {
                msg: 'Hi new user. Hope you enjoy your chat experience with us',
                user:'abcID',
                from: 'Team Chat App'
            })
            socket.emit('logged_in')
            io.emit('add_user', {
                names: names
            })
        }
    })
    socket.on('msg_send', (data) => {
        if(data.to){
            io.to(data.to).emit('msg_rcvd', data)
        }else{
            io.emit('msg_rcvd', data)
        }
    })
})

server.listen(SERVER_PORT, () => {
    console.log(`Server started at http://localhost:${SERVER_PORT}`)
})