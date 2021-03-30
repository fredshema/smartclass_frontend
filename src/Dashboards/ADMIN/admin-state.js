export default {
  namespaced: true,
  state: () => ({
    data: null,
    quizes: [],
  }),
  mutations: {
    mutateAdminData(state, param) {
      state.data = param;
    },
    mutateQuiz(state, param) {
      state.quizes = param;
    },
  },
  actions: {
    setAdminData(ctx, payload) {
      ctx.commit("mutateAdminData", payload);
    },
    SET_ADMIN_QUIZ(ctx, payload) {
      ctx.commit("mutateQuiz", payload);
    },
  },
  getters: {},
};
