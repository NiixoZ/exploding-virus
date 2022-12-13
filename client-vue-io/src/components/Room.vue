<template>
  <div class="content">
    <h1>Ceci est une room {{roomId}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Room',
  props : {
    roomId: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
