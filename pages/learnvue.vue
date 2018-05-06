<template>
  <div>
      <h1>hello world</h1>
      <input v-model="msg" type="text">
      <button v-on:click="sendMessage()" >Send SMS</button>
      <h2 v-text="msg"></h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
      return {
          msg: ''
      }
  },
  methods: {
      sendMessage() {
          axios.post('/api/sendmsg');
          console.log("button works", this.msg)
      }
  }
}
</script>

<style lang="sass">

</style>

