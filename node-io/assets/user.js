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
        this.io.to(this.room).emit('game-user-pick-card', this.uuid);
        this.socket.emit('game-user-add-card', card);
    }

    removeCard(cardIndex) {
        // Remove and return the card at the specified index
        let card = this.cards.splice(cardIndex, 1);
        this.io.to(this.room).emit('game-user-remove-card', this.uuid);
        this.socket.emit('game-remove-card', cardIndex);
        return card[0];
    }
    
}

module.exports = User;