<template>
  <router-view></router-view>
</template>

<script>

import { mapActions } from "vuex";
export default {
  name: 'App',
  methods: {
    ...mapActions("app", ["getShow"]),
  },
  async mounted() {
    await this.getShow(false);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
