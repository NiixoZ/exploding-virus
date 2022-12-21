const {makeid} = require("./helper");

class User {

    constructor(socket, username, io) {
        this.socket = socket;
        this.username = username;
        this.uuid = makeid(12);
        this.io = io;
        this.room = null;
        this.cards = [];
    }

    joinRoom(room) {
        this.room = room;
        this.socket.join(room);
    }

    leaveRoom() {
        this.socket.leave(this.room);
        this.room = null;
    }

    addCard(card) {
        this.cards.push(card);
        this.io.to(this.room).emit('game-user-get-card', this.uuid);
        this.socket.emit('game-add-card', card);
    }

    removeCard(cardIndex) {
        this.cards.splice(cardIndex, 1);
        this.io.to(this.room).emit('game-user-remove-card', this.uuid);
        this.socket.emit('game-remove-card', cardIndex);
    }
    
}

module.exports = User;