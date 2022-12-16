const { Server } = require("socket.io");
import makeid from './helper.js';

class Room {
    constructor(roomName) {
        this.roomName = roomName;
        this.code = makeid(6);
        this.users = [];
        this.maxUsers = 4;
        this.server = new Server();
    }

    addUser(user) {
        this.users.push(user);
        user.socket.join(this.server);
    }   
}

export default Room;