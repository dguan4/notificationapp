<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nuxtproject
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <input v-model="url" type="text" name="url" />
      <button v-on:click="runScript()">Run Script</button>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'

export default {
  data () {
    return {
      url: ''
    }
  },
  components: {
    AppLogo
  },
  methods: {
    runScript() {
      axios.get(this.url)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.err(err);
        })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
