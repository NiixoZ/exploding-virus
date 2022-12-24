<template>
    <div class="content justify-center">
        <div>
            <div class="font-bold">Room</div>
            <div class="bob flex-grow text-center">{{ roomName }}</div>
        </div>

        <div>
            <div class="font-bold">Code</div>
            <div class="bob flex-grow text-center">{{ roomCode }}</div>
        </div>

        <div>
            <div class="font-bold">Users</div>
            <ul id="players" class="gap-2 flex flex-col">
                <li class="bob" v-for="(user, index) in users"  v-bind:key="index">{{ user }}</li>
            </ul>
        </div>

        <button class="button" v-if="room_creator" @click="launchGame">Launch Game</button>
        <button class="button-inactive" v-else inactive>Launch Game</button>
    </div>
</template>

<script>
import SocketioService from '../services/socketio.service.js';

export default {
    name: 'GameRoom',
    props: {
        roomName: {
            type: String,
            required: true
        },
        roomCode: {
            type: String,
            required: true
        },
        users: {
            type: Array,
            required: true
        },
        room_creator: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        launchGame() {
            SocketioService.socket.emit('user-launch-game');
            console.log('user-launch-game');
        },
    },
    mounted() {
        SocketioService.socket.on('room-player-join', (data) => {
            document.querySelector('#players').innerHTML += `<li class="bob">${data}</li>`;
            console.log('room-player-join: ', data);
        });

        SocketioService.socket.on('room-player-left', (data) => {
            console.log(document.querySelector('#players').innerHTML);
            document.querySelector('#players').innerHTML = document.querySelector('#players').innerHTML.replace(`<li class="bob">${data}</li>`, '');
        });

        SocketioService.socket.on('game-start', (data) => {
            console.log('start-game', data);
            this.$emit('change-view', {"view": 'Game', "props": data});
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
