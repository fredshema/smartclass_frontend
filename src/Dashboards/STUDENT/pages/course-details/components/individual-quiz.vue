<template>
  <b-col cols="12" id="quiz">
    <b-row no-gutters align-v="center">
      <b-col>
        <h6 class="mb-0" v-b-toggle:[collapseID]>
          {{ quiz.title }}
        </h6>
      </b-col>
      <b-col cols="auto">
        <b-button
          v-b-toggle:[collapseID]
          class="text-reset text-decoration-none no-outline"
          variant="link"
        >
          <b-icon-caret-down-square-fill />
        </b-button>
      </b-col>
    </b-row>
    <b-collapse :id="collapseID">
      <div class="border-top mb-4 mt-3"></div>

      <app-quiz v-if="questions" :questions="questions" :quizID="quiz.QuizId" />

      <b-row no-gutters align-h="end" class="mt-3">
        <b-button variant="dark" class="px-3" v-b-toggle:[collapseID]>
          close
        </b-button>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import AppQuiz from "../../../../../components/quiz-component/app-quiz.vue";
export default {
  name: "individual-quiz-component",
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
  components: { AppQuiz },
  data() {
    return {
      collapseID: uuidv4(),
      state: { loadingQuestions: true },
      questions: null,
    };
  },
  computed: {
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
  },
  beforeMount() {
    if (!Array.isArray(this.questions)) this.fetchQuestions();
    else this.state.loadingQuestions = false;
  },
  methods: {
    fetchQuestions() {
      this.state.loadingQuestions = true;
      const reqData = {
        action: "getQuestions",
        QuizId: this.quiz.QuizId,
      };
      this.axios
        .post("quiz", reqData)
        .then((res) => {
          console.log(res);
          this.questions = res.data;
          this.state.loadingQuestions = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loadingQuestions = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#quiz {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}
button {
  svg {
    transition: 250ms linear;
  }
  &.not-collapsed svg {
    transform: rotate(180deg);
  }
  &.collapsed svg {
    transform: rotate(360deg);
  }
}
.reserved-space {
  height: 300px;
  width: 100%;
  border: 1px solid;
}
</style>