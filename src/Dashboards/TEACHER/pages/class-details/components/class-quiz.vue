<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button
        variant="dark"
        class="mx-1"
        @click="$bvModal.show('teacher-add-quiz-modal')"
      >
        Add Quiz
      </b-button>
      <b-button variant="dark" class="ml-1" @click="fetchQuizes">
        Refresh
      </b-button>
    </b-row>
    <b-row
      no-gutters
      v-if="state.loading"
      align-h="center"
      class="py-5 flex-column"
    >
      <AppLoading type="dark" />
      <p class="text-center mt-3">Loading Quizes</p>
    </b-row>
    <b-row no-gutters v-else-if="quizes.length > 0">
      <one-quiz v-for="(quiz, i) in quizes" :key="i" :quiz="quiz" />
    </b-row>
    <b-row no-gutters align-h="center" class="py-5" v-else>
      No Quizes available at the moment, try again later!
    </b-row>
    <add-quiz :classID="classID" @quiz-added="fetchQuizes" />
  </section>
</template>

<script>
import AddQuiz from "./add-quiz.vue";
import OneQuiz from "./individual-quiz.vue";
export default {
  name: "course-quiz-tab",
  components: {
    OneQuiz,
    AddQuiz,
  },
  data() {
    return {
      quizes: [],
      state: { loading: true },
    };
  },
  computed: {
    user() {
      return this.$store.state.teacher.data;
    },
    classID() {
      return this.$route.params.classID;
    },
  },
  beforeMount() {
    // if (!Array.isArray(this.quizez))
    this.fetchQuizes();
    // else this.state.loading = false;
  },
  methods: {
    fetchQuizes() {
      this.state.loading = true;
      const reqData = {
        action: "getQuiz",
        subjectName: this.user.subjectName,
        userId: this.user.user_id,
        userType: "teacher",
        level: this.classID,
      };
      this.axios
        .post("quiz", reqData)
        .then((res) => {
          console.log(res);
          if (res.data && res.data.length && res.data.length > 0) {
            this.quizes = res.data;
          }
          this.state.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>