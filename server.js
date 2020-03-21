const express = require('express')
const http = require('http')
const srv = express()

const socket = require('socket.io')

const server = http.createServer(srv)

const io = socket(server)

srv.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('Connection made from ' + socket.id)
})

server.listen('4615', () => {
    console.log('Serever started at http://localhost:4615')
})