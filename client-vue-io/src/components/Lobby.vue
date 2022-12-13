<template>
    <div class="content gap-6">
    <img alt="Virus Logo" src="../assets/logo.png" width="256">
    <InputText label="Username" name="username" />
    <div class="flex flex-row gap-12">
      <div class="flex flex-col gap-6">
        <InputText label="Room Name" name="room-name" />
        <button class="">Create Room</button>
      </div>
      <div class="flex flex-col gap-6">
        <InputText label="Room Code" name="room-code" />
        <button>Join Room</button>
      </div>
    </div>
  </div>
</template>  

<script>
import InputText from './inputs/InputText.vue';

export default {
  name: 'Lobby',
  components: {
    InputText
  }
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
