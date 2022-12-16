<template>
    <div class="content gap-6">
        <img alt="Virus Logo" src="../assets/logo.png" width="256">
        <InputText label="Username" name="username" />
        <div class="flex flex-row gap-12">
            <div class="flex flex-col gap-6">
                <InputText label="Room Name" name="room-name" />
                <button id="create-room" @click="createRoom">Create Room</button>
            </div>
            <div class="flex flex-col gap-6">
                <InputText label="Room Code" name="room-code" />
                <button id="join-room" @click="joinRoom">Join Room</button>
            </div>
        </div>
    </div>
</template>  

<script>
import InputText from './inputs/InputText.vue';
import SocketioService from '../services/socketio.service.js';

export default {
    name: 'WebLobby',
    components: {
        InputText
    },
    created() {
        SocketioService.setupSocketConnection();
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
    methods: {
        createRoom() {
            let usernameInput = document.querySelector('#input-username');
            let roomNameInput = document.querySelector('#input-room-name');
            console.log('Create room button clicked');
            console.log('Username: ' + usernameInput.value);
            console.log('Room name: ' + roomNameInput.value);

            SocketioService.socket.emit('create-room', {
                username: usernameInput.value,
                roomName: roomNameInput.value
            });
        },
        joinRoom() {
            let usernameInput = document.querySelector('#input-username');
            let roomCodeInput = document.querySelector('#input-room-code');
            console.log('Join room button clicked');
            console.log('Username: ' + usernameInput.value);
            console.log('Room code: ' + roomCodeInput.value);
            SocketioService.socket.emit('join-room', {
                username: usernameInput.value,
                roomCode: roomCodeInput.value
            });
        }
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
