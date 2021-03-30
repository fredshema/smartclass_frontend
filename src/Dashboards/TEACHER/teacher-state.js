export default {
  namespaced: true,
  state: () => ({
    data: null,
    classes: null,
  }),
  mutations: {
    mutateTeacherData(state, param) {
      state.data = param;
      console.log("data set");
    },
    mutateClasses(state, param) {
      state.classes = param;
    },
  },
  actions: {
    setTeacherData(ctx, payload) {
      ctx.commit("mutateTeacherData", payload);
    },
    setClassesData(ctx, payload) {
      ctx.commit("mutateClasses", payload);
    },
  },
  getters: {},
};
