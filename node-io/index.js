const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8081']
    }
});

const Room = require('./assets/room.js');
const User = require('./assets/user.js');
let rooms = [];
let users = [];

function getRoom(roomCode) {
    return rooms.find(room => room.code == roomCode);
}

app.get('/', (req, res) => {
    res.send('<h1>C\'est juste le serveur Socket bro.</h1>');
});

app.get('/room', (req, res) => {
    if(req.query.roomCode !== '' || req.query.roomCode !== undefined || req.query.roomCode !== null) {
        let room = getRoom(req.query.roomCode);
        if(room !== undefined) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Content-Type', 'application/json');
            res.send(room.getLobbyInfos());
            return;
        }
    }
    res.send('Room not found');
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
        if (params.roomCode === '' || params.roomCode === undefined || params.roomCode === null) {
            socket.emit('error', 'Room name is required');
            return;
        }
        if (params.username === '' || params.username === undefined || params.username === null) {
            socket.emit('error', 'Username is required');
            return;
        }

        console.log('username: ', params.username);
        console.log('roomCode: ', params.roomCode);

        let user = new User(socket, params.username, io);
        let room = getRoom(params.roomCode);
        room.addUser(user)
        users.push(user);
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

        console.log('username: ', params.username);
        console.log('roomName: ', params.roomName);
        console.log('socket_id: ', socket.id);

        let user = new User(socket, params.username, io);
        let room = new Room(params.roomName, io);
        room.addUser(user);
        users.push(user);
        rooms.push(room);

        socket.emit('room-created-code', room.code);
    });

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});