export default {
  namespaced: true,
  state: () => ({
    studentID: null,
    studentData: null,
    selectedCourse: null,
  }),
  mutations: {
    setStudentID(state, id) {
      state.studentID = id;
    },
    setStudentData(state, studentData) {
      state.studentData = studentData;
      console.log("data set");
    },
  },
  actions: {
    setStudentID(ctx, payload) {
      ctx.commit("setStudentID", payload);
    },

    setStudentData(ctx, payload) {
      ctx.commit("setStudentData", payload);
    },
  },
  getters: {},
};
