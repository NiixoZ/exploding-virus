<template>
    <component :is="currentComponent" v-bind="viewProps" v-on:change-view="changeView"></component>
</template>

<script>
import Lobby from './components/Lobby.vue';
import Room from './components/Room.vue';
import Game from './components/Game.vue';
import SocketioService from './services/socketio.service.js';
export default {
    name: 'App',
    components: {
        Lobby,
        Room,
        Game
    },
    data() {
        return {
            currentComponent: Lobby,
            viewProps: {}
        }
    },
    computed: {
        currentProperties: function() {
            if (this.currentComponent === Room || this.currentComponent === Game) {
                return this.viewProps;
            }
            return {};
        }
    },
    methods: {
        changeView: function(data) {
            this.currentComponent = data.view;
            this.viewProps = data.props;
        }
    },
    created() {
        SocketioService.setupSocketConnection();
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
}
</script>

<style>
body {
    display: flex;
    width: 100vw;
    min-height: 100vh;
}
</style>
