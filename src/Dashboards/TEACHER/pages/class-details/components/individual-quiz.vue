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

      <b-container class="px-3 py-4">
        <b-row no-gutters class="mb-3">
          <b-col cols="12" class="mb-4">
            <b-row no-gutters align-v="center" align-h="between">
              <b-col cols="auto">
                <b-button variant="dark" v-b-toggle:[collapseID] >
                  close
                </b-button>
              </b-col>
              <b-col>
                <b-row no-gutters align-v="center" align-h="end">
                  <b-button
                    variant="dark"
                    v-b-modal="'teacher-add-question-modal'"
                    class="mr-1"
                    >Add Question</b-button
                  >
                  <b-button
                    variant="dark"
                    class="ml-1"
                    @click="refresh"
                    :disabled="state.loadingQuestions"
                    >Refresh</b-button
                  >
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row no-gutters align-h="center" align-v="center" class="bg-light">
          <!-- is loading questions -->
          <transition name="group-fade" mode="out-in">
            <div
              class="py-5 w-100 flex-center flex-column"
              v-if="state.loadingQuestions"
            >
              <div class="position-relative">
                <app-loading type="dark" />
              </div>
              <h6 class="mt-3">Loading Questions</h6>
            </div>

            <!-- has no questions -->
            <div class="px-4 py-5" v-else-if="hasNoQuestion">
              <h6>
                This quiz has no questions, click
                <b-badge class="pt-2 pb-2 mx-2">Add question</b-badge> to add
                them.
              </h6>
            </div>

            <!-- has questions -->
            <b-container fluid v-else>
              <div class="questions">
                <p
                  class="question"
                  v-for="question in questions"
                  :key="question.id"
                >
                  {{ question.title }}
                </p>
              </div>
            </b-container>
          </transition>
        </b-row>

        <!-- add question modal -->
        <add-question-quiz
          :quizId="quiz.QuizId"
          @question-added="fetchQuestions"
        />
        <b-row no-gutters align-h="end" class="mt-3">
          <b-button variant="dark" v-b-toggle:[collapseID] class="px-3">
            close
          </b-button>
        </b-row>
      </b-container>
    </b-collapse>
  </b-col>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import AddQuestionQuiz from "./add-question-quiz.vue";
export default {
  name: "individual-quiz-component",
  props: ["quiz"],
  components: { AddQuestionQuiz },
  data() {
    return {
      collapseID: uuidv4(),
      state: { loadingQuestions: true },
      questions: [],
    };
  },
  computed: {
    userID() {
      return this.$store.state.student.teacher.user_id;
    },
    user() {
      return this.$store.state.student.teacher;
    },
    hasNoQuestion() {
      return this.questions.length < 1 ? true : false;
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
          if (Array.isArray(res.data)) this.questions = res.data;
          this.state.loadingQuestions = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loadingQuestions = false;
        });
    },
    refresh() {
      if (this.state.loadingQuestions == false) {
        this.fetchQuestions();
      }
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
.custom-option {
  .custom-control-label {
    width: 100%;
  }

  .custom-option-input {
    position: relative;
    top: -0.36rem;
  }
}

.question {
  border-color: var(--primary) !important;
  margin: 0;
  padding: 15px 40px;
  counter-increment: section;
  position: relative;
  border-left: 2px dashed;
  margin-right: 30px;
  padding-right: 0;
}

.question:before {
  content: counter(section);
  right: 100%;
  margin-right: -25px;
  margin-top: -3px;
  position: absolute;
  border-radius: 50%;
  padding: 3px;
  height: 25px;
  width: 25px;
  background-color: var(--primary);
  text-align: center;
  color: white;
  font-size: 100%;
}
</style>