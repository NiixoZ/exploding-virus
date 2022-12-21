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
        <button class="button" v-on:click="playCard(0)">Piocher</button>
        <button class="button">Jouer</button>
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

        SocketioService.socket.on('game-my-cards', (cards) => {
            console.log('game-my-cards: ', cards);
            
            document.querySelector('#my-cards').innerHTML = '';
            cards.forEach(c => {
                let li = document.createElement('li');
                li.innerHTML = c.name + ' - ' + c.type;
                document.querySelector('#my-cards').appendChild(li);
            });

        });

        SocketioService.socket.on('game-user-turn', (data) => {
            console.log('game-user-turn: ', data);
            let user = getUserForUUID(data);
            console.log('game-user-turn: ', user);
            document.querySelector('#turn-info').innerHTML = `It is ${user.username}'s turn`;
        });

        SocketioService.socket.on('game-end', (data) => {
            console.log('game-end: ', data);
        });

        SocketioService.socket.on('game-error', (data) => {
            console.log('game-error: ', data);
        });

        document.querySelector('#card-number').innerHTML = '';
        this.$props.users.forEach(u => {
            let li = document.createElement('li');
            li.innerHTML = u.username + ': ' + u.cardsNumber + ' cards';
            document.querySelector('#card-number').appendChild(li);
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

#my-cards {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
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
