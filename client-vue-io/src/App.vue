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
  <Lobby />
</template>

<script>
import SocketioService from './services/socketio.service.js';
import Lobby from './components/Lobby.vue';

export default {
  name: 'App',
  components: {
    Lobby
  },
  created() {
    SocketioService.setupSocketConnection();
  }
}
</script>

<style>
body {
  display: flex;
  width: 100vw;
  min-height: 100vh;
}
</style>
