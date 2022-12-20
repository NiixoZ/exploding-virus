<!--
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
-->
<template>
    <component :is="currentComponent" v-bind="viewProps" v-on:change-view="changeView"></component>
</template>

<script>
import Lobby from './components/Lobby.vue';
import Room from './components/Room.vue';
import SocketioService from './services/socketio.service.js';
export default {
    name: 'App',
    components: {
        Lobby,
        Room
    },
    data() {
        return {
            currentComponent: Lobby,
            viewProps: {}
        }
    },
    computed: {
        currentProperties: function() {
            if (this.currentComponent === Room) {
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
