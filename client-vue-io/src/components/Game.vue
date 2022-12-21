<template>
    <div class="content">
        <div id="room-name">{{ roomName }}</div>
        <div id="turn-info"></div>
        <div>
            Cards number:
            <ul id="card-number"></ul>
        </div>
        <div>
            My Cards:
            <ul id="my-cards"></ul>
        </div>
        <button class="button" v-on:click="pickCard">Piocher</button>
        <button class="button" v-on:click="playCard(0)">Jouer</button>
    </div>
</template>

<script>
import SocketioService from '../services/socketio.service.js';

export default {
    name: 'GameGame',
    props: {
        roomName: {
            type: String,
            required: true
        },
        users: {
            type: Array,
            required: true
        }
    },
    methods: {
        pickCard() {
            SocketioService.socket.emit('user-pick-card', {});
            console.log('user-pick-card');
        },
        playCard(cardNumber) {
            SocketioService.socket.emit('user-play-card', cardNumber);
            console.log('user-play-card: ', cardNumber);
        }
    },
    mounted() {
        let this1 = this;

        function getUserForUUID(uuid) {
            let user = null;
            this1.$props.users.forEach(u => {
                if(u.uuid === uuid) {
                    user = u;
                }
            });
            return user;
        }

        function addCardToList(card) {
            let li = document.createElement('li');
            let spanId = document.createElement('span');
            let spanType = document.createElement('span');
            spanId.innerHTML = card.id;
            spanType.innerHTML = card.type;
            li.classList.add('card', 'bob');
            li.innerHTML = spanId.outerHTML + spanType.outerHTML;
            document.querySelector('#my-cards').appendChild(li);
        }

        function addCardNumber(user) {
            let li = document.createElement('li');
            li.id = user.uuid;
            let spanUsername = document.createElement('span');
            let spanCount = document.createElement('span');
            spanCount.classList.add('card-count');
            spanUsername.innerHTML = user.username;
            spanCount.innerHTML = user.cardsNumber;
            li.classList.add('card', 'bob');
            li.innerHTML = spanUsername.outerHTML + spanCount.outerHTML;
            document.querySelector('#card-number').appendChild(li);
        }

        function addCardToUser(user) {
            let spanCount = document.querySelector(`[id='${user.uuid}'] .card-count`);
            user.cardsNumber++;
            spanCount.innerHTML = user.cardsNumber;
        }

        function removeCardFromUser(user) {
            let spanCount = document.querySelector(`[id='${user.uuid}'] .card-count`);
            user.cardsNumber--;
            spanCount.innerHTML = user.cardsNumber;
        }

        SocketioService.socket.on('game-my-cards', (cards) => {
            console.log('game-my-cards: ', cards);
            
            document.querySelector('#my-cards').innerHTML = '';
            cards.forEach(c => {
                addCardToList(c);
            });
        });


        SocketioService.socket.on('game-user-turn', (data) => {
            console.log('game-user-turn: ', data);
            let user = getUserForUUID(data);
            console.log('game-user-turn: ', user);
            document.querySelector('#turn-info').innerHTML = `It is ${user.username}'s turn`;
        });


        SocketioService.socket.on('game-user-error', (data) => {
            console.log('game-user-error: ', data);
        });


        SocketioService.socket.on('game-user-pick-card', (uuid) => {
            addCardToUser(getUserForUUID(uuid));
        });


        SocketioService.socket.on('game-user-add-card', (card) => {
            addCardToList(card);
        });


        SocketioService.socket.on('game-user-play-card', (data) => {
            console.log('game-user-play-card: ', data.card, data.uuid);
            removeCardFromUser(getUserForUUID(data.uuid));
        });


        document.querySelector('#card-number').innerHTML = '';
        this.$props.users.forEach(u => {
            addCardNumber(u);
        });

        SocketioService.socket.emit('user-in-game-view', {});
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.content {
    width: 100%;
    height: 100%;
}

#my-cards , #card-number {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

#my-cards li {
    width: 10px;
    height: 10px;
    background-color: #3a3a3a;
    color: white;
    padding: 6px;
}

</style>
