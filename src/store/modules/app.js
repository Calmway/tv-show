import swal from "sweetalert2";

export default {
  namespaced: true,
  state: {
    data: [],
    page: 1,
    pageData: null,
    maxSizePerPage: 30,
    requestPage: 1,
    currentShow: null,
  },
  mutations: {
    fullFillSearch(state, data) {
      state.data = [];
      if (Array.isArray(data)) {
        state.data.push(...data);
      } else {
        state.data.push(data);
      }
    },
    fullFillData(state, data) {
      state.data.push(...data);
    },
    changeRequestPage(state, number) {
      state.requestPage = state.requestPage + number;
    },
    fullFillPagedData(state) {
      if (state.page > 1) {
        state.pageData = state.data.slice(
          (state.page - 1) * state.maxSizePerPage + 1,
          state.maxSizePerPage * state.page
        );
      } else {
        state.pageData = state.data.slice(0, state.maxSizePerPage);
      }
    },
    changePage(state, number) {
      if (number && number === state.page) {
        return;
      }
      state.page = number;
      if (state.page > 1) {
        state.pageData = state.data.slice(
          (state.page - 1) * state.maxSizePerPage + 1,
          state.maxSizePerPage * state.page
        );
      } else {
        state.pageData = state.data.slice(0, state.maxSizePerPage);
      }
    },
    setCurrentShow(state, data) {
      state.currentShow = data;
    },
  },

  actions: {
    async getShow({ state, commit }, clear) {
      swal.showLoading();
      const response = await fetch(
        `https://api.tvmaze.com/shows?page=${state.requestPage}`
      );
      const data = await response.json();
      if (data && data.status && data.status >= 400) {
        swal.fire({
          icon: "error",
          title: data.name,
          text: data.message,
        });
        return;
      }
      swal.close();
      if (clear !== undefined && clear) {
        commit("fullFillSearch", data);
      } else {
        commit("fullFillData", data);
      }
      commit("fullFillPagedData");
    },
    async getExactShow({ commit }, id) {
      swal.showLoading();
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      if (data && data.status && data.status >= 400) {
        swal.fire({
          icon: "error",
          title: data.name,
          text: data.message,
        });
        return;
      }
      swal.close();
      await commit("setCurrentShow", data);
    },
    async searchExact({ commit }, query) {
      swal.showLoading();
      const response = await fetch(
        `https://api.tvmaze.com/singlesearch/shows?q=${query}`
      );
      const data = await response.json();
      if (data && data.status && data.status >= 400) {
        swal.fire({
          icon: "error",
          title: data.name,
          text: data.message,
        });
        return;
      }
      swal.close();
      await commit("fullFillSearch", data);
      commit("fullFillPagedData");
    },
  },
};
