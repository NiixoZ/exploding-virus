<template>
    <div class="content">
        <h1>Ceci est la room: {{ roomName }}</h1>
        <h1>Le Code de la room: {{ roomCode }}</h1>
        <h1>Les utilisateurs:</h1>
        <ul id="players">
            <li v-for="(user, index) in users"  v-bind:key="index">{{ user }}</li>
        </ul>
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
        }
    },
    methods: {
        launchGame() {
            SocketioService.socket.emit('launch-game', {
                roomCode: this.$props.roomCode
            });
        },
    },
    mounted() {
        SocketioService.socket.on('room-new-player', (data) => {
            document.querySelector('#players').innerHTML += `<li>${data}</li>`;
            console.log('room-new-player: ', data);
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
}
</style>
