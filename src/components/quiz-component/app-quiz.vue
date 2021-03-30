<template>
  <section class="quiz-container">
    <!--questionBox-->
    <div class="questionBox">
      <!-- transition -->
      <transition
        :duration="{ enter: 500, leave: 300 }"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        mode="out-in"
      >
        <!--qusetionContainer-->
        <div
          class="questionContainer"
          v-if="questionIndex < questions.length"
          :key="questionIndex"
        >
          <header>
            <!--progress-->
            <div class="progressContainer">
              <progress
                class="progress is-info is-small"
                :value="
                  ((questionIndex / questions.length) * 100) | fixedNumber
                "
                max="100"
              >
                {{ ((questionIndex / questions.length) * 100) | fixedNumber }}%
              </progress>
              <p>
                {{ ((questionIndex / questions.length) * 100) | fixedNumber }}%
                complete
              </p>
            </div>
            <!--/progress-->
          </header>

          <!-- questionTitle -->
          <h5 class="titleContainer title">
            {{ questions[questionIndex].title }}
          </h5>

          <!-- quizOptions -->
          <div class="optionContainer">
            <div
              class="option"
              v-for="(response, index) in questions[questionIndex].options"
              @click.once="selectOption(response)"
              :class="{
                'is-selected': isSelected(response),
              }"
              :key="index"
            >
              {{ index | charIndex }}. {{ response.opt }}
            </div>
          </div>

          <!--quizFooter: navigation and progress-->
          <footer class="questionFooter">
            <!--pagination-->
            <nav class="pagination" role="navigation" aria-label="pagination">
              <!-- back button -->
              <b-button
                variant="secondary"
                pill
                class="px-4"
                v-on:click="prev"
                :disabled="questionIndex < 1"
              >
                Back
              </b-button>

              <!-- next button -->
              <b-button
                pill
                variant="primary"
                class="px-4 text-white"
                :class="userResponses[questionIndex] == null ? '' : 'is-active'"
                @click.once="next"
                :disabled="questionIndex >= questions.length"
              >
                {{ userResponses[questionIndex] == null ? "Skip" : "Next" }}
              </b-button>
            </nav>
            <!--/pagination-->
          </footer>
          <!--/quizFooter-->
        </div>
        <!--/questionContainer-->

        <!--quizCompletedResult-->
        <div
          v-if="questionIndex >= questions.length"
          :key="questionIndex"
          class="quizCompleted text-center py-5"
        >
          <!--resultTitleBlock-->
          <h4 class="title mt-3">
            Quiz completed
            <h5 class="title mt-3" v-if="score">
              <br />
              YOU SCORED <br />

              <span class="mt-2 d-block">
                {{ score.score }} / {{ score["total marks"] }}</span
              >
            </h5>
          </h4>

          <br />
          <b-button
            variant="primary"
            class="px-4 mt-3 text-white"
            pill
            @click="submit"
            :disabled="state.submiting"
            v-if="!score"
          >
            <transition-group name="group-fade">
              <span key="loading" v-if="state.submiting">
                <AppLoading size="xs" />
              </span>
              <span key="text" v-else>Submit</span>
            </transition-group>
          </b-button>
          <!--/resultTitleBlock-->
        </div>
        <!--/quizCompetedResult-->
      </transition>
    </div>
    <!--/questionBox-->
  </section>
  <!--/container-->
</template>

<script>
export default {
  name: "app-quiz-component",
  props: ["questions", "quizID"],
  data() {
    return {
      userResponses: Array(this.questions.length).fill(null),
      isActive: false,
      questionIndex: 0,
      state: { submiting: false },
      score: null,
    };
  },
  filters: {
    charIndex: function (i) {
      return String.fromCharCode(97 + i);
    },
    fixedNumber(num) {
      return Number(num).toFixed();
    },
  },
  computed: {
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
  },
  methods: {
    submit() {
      if (this.state.submiting) return;
      this.state.submiting = true;
      const reqData = {
        action: "CheckQuiz",
        quizID: this.quizID,
        studentID: this.userID,
        solutions: this.userResponses,
      };

      this.axios
        .post("quiz", reqData)
        .then((res) => {
          this.score = res.data;
          this.state.submiting = false;
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            title: "ERROR!",
            message: err.errorMessage || "something went wrong",
            status: "danger",
          });
          this.state.submiting = false;
        });
    },
    selectOption(response) {
      this.$set(this.userResponses, this.questionIndex, {
        selectedOptions: response.id,
        questionID: this.questions[this.questionIndex].QuestionId,
        corrent: response.corrent,
      });
    },
    next() {
      if (this.questionIndex < this.questions.length) this.questionIndex++;
    },
    prev() {
      if (this.questions.length > 0) this.questionIndex--;
    },
    isSelected(response) {
      if (!response) return false;
      if (!this.userResponses[this.questionIndex]) return false;
      if (this.userResponses[this.questionIndex].selectedOptions != response.id)
        return false;
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
$trans_duration: 0.3s;
$primary_color: var(--primary);

.button {
  transition: $trans_duration;
}
.title,
.subtitle {
  font-weight: normal;
}

.questionBox {
  background: #0000000d;
  position: relative;
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;

  header {
    background: rgba(0, 0, 0, 0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h1 {
      font-weight: bold;
      margin-bottom: 1rem !important;
    }
    .progressContainer {
      width: 60%;
      margin: 0 auto;
      > progress {
        margin: 0 auto;
        border-radius: 5rem;
        overflow: hidden;
        border: none;

        color: $primary_color;
        &::-moz-progress-bar {
          background: $primary_color;
        }
        &::-webkit-progress-value {
          background: $primary_color;
        }
      }
      > p {
        margin: 0;
        margin-top: 0.5rem;
      }
    }
  }
  .titleContainer {
    text-align: left;
    margin: 0 auto;
    padding: 1.5rem;
    font-size: 1rem;
  }

  .quizForm {
    display: block;
    white-space: normal;
    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.85);
        border: transparent 1px solid;

        &.is-selected {
          border-color: rgba(black, 0.25);
          background-color: white;
        }
        &:hover {
          border-color: rgba(black, 0.25);
          background-color: ghostwhite;
        }
        &:active {
          transform: scaleX(0.9);
        }
      }
    }

    .questionFooter {
      background: rgba(0, 0, 0, 0.025);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      align-self: flex-end;

      .pagination {
        margin: 15px 25px;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
}

@media screen and (min-width: 769px) {
  .questionBox {
    align-items: center;
    justify-content: center;

    .questionContainer {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
}
@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}
.zoomOut {
  -webkit-animation-name: zoomOut;
  animation-name: zoomOut;
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>