const Helper = require('./helper.js');
const Cards = require('./cards.js');

class Room {
    constructor(roomName, io) {
        this.roomName = roomName;
        this.code = Helper.makeid(7);
        this.users = [];
        this.maxUsers = 5;
        this.owner = null;
        this.io = io;
        this.status = 'waiting';
        this.currentUser = null;
        this.currentUserNeedToPlayTimes = 0;
        this.deck = [];
        this.userInView = 0;
        console.log('Room created: ', this.code);
    }

    addUser(user) {
        if(this.owner === null) {
            this.owner = user;
            this.owner.socket.on('user-launch-game', () => {
                this.launchGame();
            });
        }
        if (this.users.length >= this.maxUsers) {
            user.socket.emit('error', 'Room is full');
            return;
        }


        let this1 = this;
        user.socket.on('disconnect', () => {
            console.log('User disconnected: ', user.username);
            this1.users.splice(this1.users.indexOf(user), 1);
            this1.io.to(this1.code).emit('room-player-left', user.username);
        });

        // If all users are in game view, start the game
        user.socket.on('user-in-game-view', () => {
            console.log('User in game view: ', user.username);
            this1.userInView++;

            if(this1.userInView === this1.users.length) {
                this1.nextUser(1);
                this.deck = Helper.shuffle(this.deck.concat(Cards.bomb));
            }

            user.socket.emit('game-my-cards', user.cards);
        });


        user.socket.on('user-pick-card', () => {
            this1.userPickCard(user);
        });


        user.socket.on('user-play-card', (cardIndex) => {
            this1.userPlayCard(user, cardIndex);
        });


        this.users.push(user);
        user.room = this.code;
        user.socket.join(this.code);
        user.socket.to(this.code).emit('room-player-join', user.username);
    }
    

    getLobbyInfos() {
        let users = [];
        this.users.forEach(user => {
            users.push(user.username);
        });
        return {users : users, roomName : this.roomName, roomCode : this.code};
    }


    getGameInfos() {
        let users = [];
        this.users.forEach(user => {
            users.push({username : user.username, uuid : user.uuid, cardsNumber : user.cards.length});
        });
        return {users : users, currentUser: this.currentUser?.uuid, roomName : this.roomName, roomCode : this.code, deckSize: this.deck.length};
    }


    launchGame() {
        if(this.status === 'waiting') {
            console.log('Game started: \t', this.code);
            this.status = 'started';
            this.deck = Helper.shuffle(Cards.cards.slice());
            this.users.forEach(user => {
                for(let i = 0; i < 5; i++) {
                    user.addCard(this.deck.shift());
                }
            });
            this.io.to(this.code).emit('game-start', this.getGameInfos());
        }
    }


    userPlayCard(user, cardIndex) {
        if(this.currentUser.uuid !== user.uuid) {
            user.socket.emit('game-user-error', 'It\'s not your turn');
            return;
        }
        if(cardIndex < user.card.length >= cardIndex) {
            user.socket.emit('game-user-need-replay', 'Invalid card index');
            return;
        }
        user.removeCard(cardIndex);
        this.io.to(this.code).emit('game-user-play-card', {user: user.uuid, card: cardIndex});
    }


    // User pick a card from the deck. 
    // If the deck is empty, the game is already over
    userPickCard(user) {
        if(this.currentUser.uuid !== user.uuid) {
            user.socket.emit('game-user-error', 'It\'s not your turn');
            return;
        }

        let card = this.deck.shift();
        user.addCard(card);

        this.currentUserNeedToPlayTimes--;
        if(this.currentUserNeedToPlayTimes === 0) {
            this.nextUser(1);
        }
    }

    nextUser(playTimes) {
        let index = this.users.indexOf(this.currentUser);
        if(index === this.users.length - 1) {
            this.currentUser = this.users[0];
        } else {
            this.currentUser = this.users[index + 1];
        }
        this.io.to(this.code).emit('game-user-turn', this.currentUser.uuid);
        this.currentUserNeedToPlayTimes = playTimes;

        // TODO
    }

    getUserForUUID(uuid) {
        let user = null;
        this.users.forEach(u => {
            if(u.uuid === uuid) {
                user = u;
            }
        });
        return user;
    }

    shuffleCards() {
        this.cards = Helper.shuffle(this.cards);
    }
}

module.exports = Room;