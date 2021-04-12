export default {
    namespaced: true,
    state: () => ({
      data: null,
    }),
    mutations: {
      setMentorData(state, mentorData) {
        state.data = mentorData;
      },
    },
    actions: {
      setMentorData(ctx, payload) {
        ctx.commit("setMentorData", payload);
      },
    },
    getters: {},
  };
  