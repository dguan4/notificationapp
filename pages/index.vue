<template>
  <div>
      <div>
        <h1>hello world</h1>
        <input v-model="msg" type="text">
        <button v-on:click="sendMessage()" >Send SMS</button>
        <h2 v-text="msg"></h2>
      </div>
      <div>
          <h2>test</h2>
          <button v-on:click="getCalendar()">Calendar</button>
          <button v-on:click="authorize()">Authorize</button>
          <input v-model="authenticationCode" type="text">
          <button v-on:click="sendAuthorize()">Send Auth Token</button>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      msg: "",
      authenticationCode: ''
    };
  },
  methods: {
    sendMessage() {
      console.log(this.msg);
      axios
        .post("/api/sendmsg", { msg: this.msg })
        .then(res => {
          console.log("this works", res);
        })
        .catch(err => console.error(err));
    },
    getCalendar () {
        console.log(this.msg)
        axios
            .get('/api/getcalendar')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },
    authorize () {
        axios
            .get('/gettoken')
            .then(res => console.log(res))
            .catch(err => console.error(err))
    },
    sendAuthorize() {
        axios
            .post('/sendAuth', this.authenticationCode)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
  }
};
</script>

<style lang="sass">

</style>

