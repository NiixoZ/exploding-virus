const Helper = require('./helper.js');

class Room {
    constructor(roomName, io) {
        this.roomName = roomName;
        this.code = Helper.makeid(7);
        this.users = [];
        this.maxUsers = 4;
        this.owner = null;
        this.io = io;
        this.status = 'waiting';
        console.log('Room created: ', this.code);
    }

    addUser(user) {
        if(this.owner === null) {
            this.owner = user;
            this.owner.socket.on('launch-game', () => {
                this.io.to(this.code).emit('game-started');
                this.status = 'started';
                this.launchGame();
            });
        }
        if (this.users.length >= this.maxUsers) {
            user.socket.emit('error', 'Room is full');
            return;
        }

        this.users.push(user);
        user.room = this.code;
        user.socket.join(this.code);
        user.socket.to(this.code).emit('room-new-player', user.username);
    }

    getInfos() {
        let users = [];
        this.users.forEach(user => {
            users.push(user.username);
        });
        return {users : users, roomName : this.roomName, roomCode : this.code};
    }

    launchGame() {
        console.log('Game started: \t', this.code);
    }
}

module.exports = Room;