export default {
  namespaced: true,
  state: () => ({
    data: null,
    quizes: [],
  }),
  mutations: {
    mutateSchoolData(state, param) {
      state.data = param;
    },
    mutateQuiz(state, param) {
      state.quizes = param;
    },
  },
  actions: {
    setSchoolData(ctx, payload) {
      ctx.commit("mutateSchoolData", payload);
    },
    SET_SCHOOL_QUIZ(ctx, payload) {
      ctx.commit("mutateQuiz", payload);
    },
  },
  getters: {},
};
