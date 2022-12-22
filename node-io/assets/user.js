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
    }

    removeCard(cardId) {
        // Remove and return the card with the given id
        let card = null;
        this.cards.forEach((c, index) => {
            if(c.id == cardId) {
                card = c;
                this.cards.splice(index, 1);
            }
        });
        return card;
    }
    
}

module.exports = User;