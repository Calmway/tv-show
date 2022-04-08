<template>
  <div class="container" v-if="currentShow">
    <div class="row">
      <div class="col-7">
        <img
          style="height: 90vh"
          v-if="currentShow.image && currentShow.image.original"
          :src="currentShow.image.original"
          alt=""
        />
      </div>
      <div class="col-5">
        <h1 v-if="currentShow.name">{{ currentShow.name }}</h1>
        <p v-if="currentShow.language">Language: {{currentShow.language}}</p>
        <p v-if="currentShow.summary" v-html="currentShow.summary"></p>
        <p v-if="currentShow.premiered">Started from: {{currentShow.premiered}}</p>
        <p v-if="currentShow.rating && currentShow.rating.average">Average rating: {{currentShow.rating.average}}</p>
        <a v-if="currentShow.officialSite" :href="currentShow.officialSite">{{currentShow.officialSite}}</a>
        <div v-if="currentShow.network">
          <p v-if="currentShow.network.country">Country: {{currentShow.network.country.name}}</p>
          <a v-if="currentShow.network.officialSite" :href="currentShow.network.officialSite">{{currentShow.network.name}}</a>
        </div>
        <div v-if="currentShow.schedule && currentShow.schedule.days">
          Days: <span v-for="day in currentShow.schedule.days" :key="day">{{day}}</span>
          <p>Time: {{currentShow.schedule.time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("app", ["currentShow"]),
  },
  methods: {
    ...mapActions("app", ["getExactShow"]),
  },
  async mounted() {
    if (this.$route.params && this.$route.params.showId) {
      await this.getExactShow(this.$route.params.showId);
    }
  },
};
</script>

<style scoped>
.container {
  padding: 50px;
}
</style>