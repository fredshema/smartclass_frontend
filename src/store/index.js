import Vue from "vue";
import Vuex from "vuex";

import student from "../Dashboards/STUDENT/student-state";
import teacher from "../Dashboards/TEACHER/teacher-state";
import admin from "../Dashboards/ADMIN/admin-state";
import school from "../Dashboards/SCHOOL/school-state";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cancelTokens: [],
  },
  mutations: {
    ADD_CANCEL_TOKEN(state, token) {
      state.cancelTokens.push(token);
    },
    CLEAR_CANCEL_TOKENS(state) {
      if(state.cancelTokens.length < 1) return;
      state.cancelTokens = [];
    },
  },
  actions: {
    CANCEL_PENDING_REQUESTS(context) {
      // Cancel all request where a token exists
      context.state.cancelTokens.forEach((request, i) => {
        if (request.cancel) {
          request.cancel();
        }
      });
      // Reset the cancelTokens store
      context.commit("CLEAR_CANCEL_TOKENS");
    },
  },
  getters: {
    cancelTokens(state) {
      return state.cancelTokens;
    },
  },
  modules: {
    student,
    teacher,
    admin,
    school
  },
});
