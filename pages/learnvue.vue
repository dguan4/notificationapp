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
          console.log(this.msg)
          axios.post('/api/sendmsg', { 'msg': this.msg })
            .then(res => {
                console.log("this works", res)
            })
            .catch(err => console.error(err))
      }
  }
}
</script>

<style lang="sass">

</style>

