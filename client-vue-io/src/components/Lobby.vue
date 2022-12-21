<template>
    <div class="content gap-6">
        <img alt="Virus Logo" src="../assets/logo.png" width="256">
        <InputText label="Username" name="username" />
        <div class="flex flex-row gap-12">
            <div class="flex flex-col gap-6">
                <InputText label="Room Name" name="room-name" />
                <button class="button" id="create-room" @click="createRoom">Create Room</button>
            </div>
            <div class="flex flex-col gap-6">
                <InputText label="Room Code" name="room-code" />
                <button class="button" id="join-room" @click="joinRoom">Join Room</button>
            </div>
        </div>
    </div>
</template>  



<script>
import InputText from './inputs/InputText.vue';
import SocketioService from '../services/socketio.service.js';
import Helper from '../js/helper.js'

export default {
    name: 'GameLobby',
    components: {
        InputText
    },
    methods: {
        async createRoom() {
            SocketioService.roomCode = undefined;
            let usernameInput = document.querySelector('#input-username');
            let roomNameInput = document.querySelector('#input-room-name');
            console.log('Create room button clicked');
            console.log('Username: ' + usernameInput.value);
            console.log('Room name: ' + roomNameInput.value);

            if(usernameInput.value === '' || roomNameInput.value === '') {
                console.log('Username or room name is empty');
                return;
            }

            SocketioService.socket.emit('create-room', {
                username: usernameInput.value,
                roomName: roomNameInput.value
            });

            let this1 = this;
            async function waitForElement(){
                if(SocketioService.roomCode === undefined){
                    setTimeout(waitForElement, 250);
                }
                else {
                    let roomInfos = await Helper.getRoomInfos(SocketioService.roomCode);
                    roomInfos.room_creator = true;
                    this1.$emit('change-view', {"view": 'Room', "props": roomInfos});
                }
            }
            waitForElement();

        },
        async joinRoom() {
            SocketioService.roomCode = undefined;
            let usernameInput = document.querySelector('#input-username');
            let roomCodeInput = document.querySelector('#input-room-code');
            
            let username = usernameInput.value;
            let code = roomCodeInput.value;

            console.log('Join room button clicked');
            console.log('Username: ' + username);
            console.log('Room code: ' + code);

            if(username === '' || code === '') {
                console.log('Username or room name is empty');
                return;
            }

            SocketioService.socket.emit('join-room', {
                username: username,
                roomCode: code
            });

            let roomInfos = await Helper.getRoomInfos(code);
            roomInfos.room_creator = false;
            this.$emit('change-view', {"view": 'Room', "props": roomInfos});
        }
    },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
