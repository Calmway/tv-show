<template>
  <div class="container">
    <div class="col-12">
      <input
        class="form-control me-2"
        v-model="searchInput"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn btn-outline-success" style="margin-inline-end: 15px;" @click="search">Search</button
      ><button class="btn btn-outline-secondary" @click="showAll">Show all</button>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-3" v-for="(show, index) in pageData" :key="index">
          <show-card @onLast="getMore()" :show="show" />
        </div>
      </div>
    </div>
    <div class="col-12">
      <span
        class="pagination"
        :class="index == page ? 'active' : ''"
        v-for="index in maxLength"
        :key="index"
        @click="changePage(index)"
        >{{ index }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import showCard from "@/components/ShowCard";
export default {
  name: "Home",
  components: {
    showCard,
  },
  data() {
    return {
      searchInput: null,
    };
  },
  computed: {
    ...mapState("app", ["data", "pageData", "page"]),
    maxLength() {
      return Math.round(this.data.length / 30) + 1;
    },
  },
  methods: {
    ...mapActions("app", ["getShow", "searchExact"]),
    changePage(event) {
      this.$store.commit("app/changePage", event);
    },
    async getMore() {
      if (!this.searchInput) {
        this.$store.commit("app/changeRequestPage", 1);
        await this.getShow();
      }
    },
    search() {
      if (this.searchInput) {
        this.searchExact(this.searchInput);
      } else {
        return;
      }
    },
    async showAll() {
      this.searchInput = null;
      this.$store.commit("app/changePage", 1);
      if (this.page > 1) {
        this.$store.commit("app/changeRequestPage", -1);
      }
      await this.getShow(true);
    },
  },
};
</script>

<style scoped>
.container {
    padding: 15px;
}
input.form-control {
    display: inline-block;
    max-width: 200px;
}
.pagination {
  padding: 5px;
  border: 1px solid #bebebe;
  cursor: pointer;
  margin: 3px;
  display: inline-block;
}
.pagination:hover {
  background: #bebebe;
}
.pagination.active {
  background: aquamarine;
}
</style>