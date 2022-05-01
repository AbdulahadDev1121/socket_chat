let server = require('express')();
let http = require('http').Server(server);
let io = require('socket.io')(http)

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
    console.log('соединение !');
})

io.on('connection', (msg) => {

    msg.on('disconnect', () => {
        console.log('Сервер отключен !');
    })

    msg.on('created', (e) => {
        msg.broadcast.emit('created', (e))
    })

    msg.on('chat-message', (data) => {
        msg.broadcast.emit('chat-message', (data))
    })

    msg.on('typing', (data) => {
        msg.broadcast.emit('typing', (data))
    })

    msg.on('stopTyping', (data) => {
        msg.broadcast.emit('stopTyping', (data))
    })

    msg.on('joined', (data) => {
        msg.broadcast.emit('joined', (data))
    })

    msg.on('leaved', (data) => {
        msg.broadcast.emit('leaved', (data))
    })
})