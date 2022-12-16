const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

app.get('/', (req, res) => {
    res.send('<h1>C\'est juste le serveur Socket bro.</h1>');
});

io.on('connection', (socket) => {
    console.log('A user connected, socketId: ', socket.id);

    socket.on('disconnect', () => {
        console.log('A user disconnected, socketId: ', socket.id);
    });


    socket.on('setup_username', (username) => {
        socket.username = username;
        console.log('username: ', socket.username);
    });


    socket.on('join-room', (params) => {
        if (params.roomName === '' || params.roomName === undefined || params.roomName === null) {
            socket.emit('error', 'Room name is required');
            return;
        }
        if (params.username === '' || params.username === undefined || params.username === null) {
            socket.emit('error', 'Username is required');
            return;
        }

        socket.join(params.roomName);
        console.log('username: ', params.username);
        console.log('roomName: ', params.roomName);
        socket.to(params.roomName).emit('new-user', params.username);
    });


    socket.on('create-room', (params) => {
        if (params.roomName === '' || params.roomName === undefined || params.roomName === null) {
            socket.emit('error', 'Room name is required');
            return;
        }
        if (params.username === '' || params.username === undefined || params.username === null) {
            socket.emit('error', 'Username is required');
            return;
        }

        socket.join(params.roomName);
        console.log('username: ', params.username);
        console.log('roomName: ', params.roomName);
        socket.to(params.roomName).emit('new-user', params.username);
    });

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});