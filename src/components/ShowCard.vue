<template>
  <div class="container">
      <router-link target="_blank" :to="{ name: 'show', params: { showId: show.id } }">
        <img v-if="show && show.image" :src="show.image.medium" alt="" />
      </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["show"],
  computed: {
    ...mapState("app", ["data"]),
  },
  methods: {
  },
  mounted() {},

  watch: {
    show() {
      if (this.show.id === this.data[this.data.length - 1].id) {
        this.$emit("onLast");
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 11px 0;
  cursor: pointer;
}
.container img:hover {
    transform: scale(1.2);
}
</style>