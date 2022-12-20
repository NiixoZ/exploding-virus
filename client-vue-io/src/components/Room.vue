<template>
    <div class="content">
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
            SocketioService.socket.emit('launch-game');
            console.log('launch-game');
        },
    },
    mounted() {
        SocketioService.socket.on('room-new-player', (data) => {
            document.querySelector('#players').innerHTML += `<li class="bob">${data}</li>`;
            console.log('room-new-player: ', data);
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
