class User {

    constructor(socket, username) {
        this.socket = socket;
        this.username = username;
        this.room = null;
    }

    joinRoom(room) {
        this.room = room;
        this.socket.join(room);
    }
    
}

module.exports = User;