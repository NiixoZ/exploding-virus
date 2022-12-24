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
        this.nextUserNeedToPlayTimes = 1;
        this.deck = [];
        this.discardedCards = [];
        this.userInView = 0;
        this.virus = undefined;
        console.log('Room created: ', this.code);
    }


    addUser(user) {
        if(this.owner === null) {
            this.owner = user;
            this.owner.socket.on('user-launch-game', () => {
                if(this.users.length >= 2)
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
            if(this.status === 'started') {
                this1.playerLose(user);
            }
        });

        // If all users are in game view, start the game
        user.socket.on('user-in-game-view', () => {
            console.log('User in game view: ', user.username);
            this1.userInView++;

            if(this1.userInView === this1.users.length) {
                this1.nextUser(1);
                this.deck = Helper.shuffle(this.deck.concat(Cards.bomb));
                this.updateBoardInfos('start', undefined, undefined);
            }

            user.socket.emit('game-my-cards', user.cards);
        });


        user.socket.on('user-pick-card', () => {
            if(this1.status === 'started')
                this1.userPickCard(user);
        });


        user.socket.on('user-play-card', (cardIndex) => {
            if(this1.status === 'started')
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
        let defuse = Cards.defuse.slice();
        this.shuffleCards();
        if(this.status === 'waiting') {
            console.log('Game started: \t', this.code);
            this.status = 'started';
            this.deck = Helper.shuffle(Cards.cards.slice());
            this.users.forEach(user => {
                for(let i = 0; i < 4; i++) {
                    user.addCard(this.deck.shift());
                }
                user.addCard(defuse.shift());
            });
            this.io.to(this.code).emit('game-start', this.getGameInfos());

            this.users.forEach(user => {
                user.socket.emit('game-my-cards', user.cards);
            });
        }
    }


    // User play a card from his hand
    userPlayCard(user, cardId) {
        let card = Cards.getCardForId(cardId);
        console.log('User play card: ', user.username, user.uuid, cardId);
        
        if(card === undefined || card === '' || card === null) {
            user.socket.emit('game-player-error', 'This card doesn\'t exist');
            return;
        }


        if(this.currentUser.uuid !== user.uuid && card.type !== 'nope') {
            user.socket.emit('game-player-error', 'It\'s not your turn');
            return;
        }

        if(this.virus !== undefined && card.type !== 'defuse') {
            user.socket.emit('game-player-error', 'You need to defuse the virus');
            return;
        }

        if(this.virus === undefined && card.type === 'defuse') {
            user.socket.emit('game-player-error', 'No virus to defuse');
            return;
        }

        card = user.removeCard(cardId);
        if(card === null || card === undefined || card === '') {
            user.socket.emit('game-player-error', 'You don\'t have this card');
            return;
        }

        if(card.type === 'skip') {
            this.currentPlayerPlay();
        }
        else if(card.type === 'attack') {
            this.nextUserNeedToPlayTimes++;
            this.currentPlayerPlay();
        }
        else if(card.type === 'favor') {

        }
        else if(card.type === 'shuffle') {
            this.shuffleCards();
        }
        else if(card.type === 'see_the_future') {
            user.socket.emit('game-player-see-the-future', this.deck.slice(0, 3));
        }
        else if(card.type === 'defuse') {
            this.virus = undefined;
            this.currentPlayerPlay();
        }
        else if(card.type === 'nope') {

        }

        this.discardedCards.push(card);

        this.updateBoardInfos('play', card, user);
    }


    // User pick a card from the deck. 
    // If the deck is empty, the game is already over
    userPickCard(user) {
        if(this.currentUser.uuid !== user.uuid) {
            user.socket.emit('game-player-error', 'It\'s not your turn');
            return;
        }

        if(this.virus !== undefined) {
            user.socket.emit('game-player-error', 'You need to defuse the virus');
            return;
        }

        let card = this.deck.shift();
        if(card.type == 'bomb') {
            this.virus = card;
            this.updateBoardInfos('pick', card, user);
            if(!user.hasCardWithType('defuse')) {
                this.playerLose(user);
                this.updateBoardInfos('play', card, user);
            }
        }
        else {
            user.addCard(card);
            this.currentPlayerPlay();
            this.updateBoardInfos('pick', undefined, user);
        }
    }


    nextUser(playTimes) {
        let index = this.users.indexOf(this.currentUser);
        if(index === this.users.length - 1) {
            this.currentUser = this.users[0];
        } else {
            this.currentUser = this.users[index + 1];
        }
        this.io.to(this.code).emit('game-player-turn', this.currentUser.uuid);
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


    currentPlayerPlay(loose = false) {
        this.currentUserNeedToPlayTimes--;
        if(this.currentUserNeedToPlayTimes === 0 || loose) {
            this.nextUser(this.nextUserNeedToPlayTimes);
            this.nextUserNeedToPlayTimes = 1;
        }
    }

    
    playerLose(user) {
        let index = this.users.indexOf(user);
        if(index > -1) {
            this.users.splice(index, 1);
            this.updateBoardInfos('game-player-lose', undefined, user);
            this.currentPlayerPlay(true);
        }
        if(this.users.length === 1) {
            this.gameOver(this.users[0]);
        }
    }


    gameOver(winner) {
        this.status = 'ended';
        this.updateBoardInfos('game-over', undefined, winner);
    }


    updateBoardInfos(type, playedCard, user) {
        let userCards = [];
        this.users.forEach(user => {
            userCards.push({uuid : user.uuid, cardsNumber : user.cards.length});
        });

        // Send board infos to all players
        this.io.to(this.code).emit('game-update-board', 
            {
                updateType:     type,
                deckSize:       this.deck.length,
                discardSize:    this.discardedCards.length, 
                actionPlayer:   user?.uuid,
                playerTurn:     this.currentUser.uuid,
                playedCard:     playedCard, 
                userCards:      userCards
            });

        // Send cards for each players
        this.users.forEach(user => {
            user.socket.emit('game-my-cards', user.cards);
        });
    }


    shuffleCards() {
        this.deck = Helper.shuffle(this.deck);
    }
}

module.exports = Room;