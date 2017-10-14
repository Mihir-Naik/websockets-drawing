const
    express = require('express'),
    app = express(),
    PORT = 3000,
    http = require('http'),
    httpServer = http.Server(app),
    socketio = require('socket.io'),
    WS_Server = socketio(httpServer)

app.get('/', (req,res) => {
    res.sendFile('client/index.html', {root: __dirname})
})

WS_Server.on('connection', (socket) => {
    console.log(`a user connected`)
    socket.on('drag', (data) => {
        console.log(data)
        WS_Server.emit('draw', data)
    })
    socket.on('reset', () => {
        WS_Server.emit('clearAll')
    })
})

httpServer.listen(PORT, function(){
    console.log(`Server started on port: ${PORT}`)
})
