const express = require('express')
const http = require('http')
const srv = express()

const socket = require('socket.io')

const server = http.createServer(srv)

const io = socket(server)

srv.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('Connection made from ' + socket.id)
    socket.on('login', (data) => {
        socket.join(data.username)
        socket.emit('logged_in')
        io.emit('add_user', {
            name: data.username
        })
    })
    socket.on('msg_send', (data) => {
        if(data.to){
            io.to(data.to).emit('msg_rcvd', data)
        }else{
            io.emit('msg_rcvd', data)
        }
    })
})

server.listen('4615', () => {
    console.log('Serever started at http://localhost:4615')
})