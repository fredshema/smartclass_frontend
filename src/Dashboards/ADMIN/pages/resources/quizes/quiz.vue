<template>
  <b-container class="px-3 py-4">
    <b-row no-gutters class="mb-3">
      <b-col cols="12" class="mb-4">
        <b-row no-gutters align-v="center" align-h="between">
          <b-col cols="auto">
            <b-button variant="dark" @click="$router.back()">Back</b-button>
          </b-col>
          <b-col>
            <b-row no-gutters align-v="center" align-h="end">
              <b-button
                variant="dark"
                v-b-modal="'add-question-modal'"
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
      <b-col>
        <p>
          <span class="h5">Quiz:</span>
          <span class="d-inline text-reset">
            {{ quiz.title }}
          </span>
        </p>
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
            <b-badge class="pt-2 pb-2 mx-2">Add question</b-badge> to add them.
          </h6>
        </div>

        <!-- has questions -->
        <b-container fluid v-else>
          <div class="questions">
            <p
              class="question"
              v-for="question in allQuestions"
              :key="question.id"
            >
              {{ question.title }}
            </p>
          </div>
        </b-container>
      </transition>
    </b-row>

    <!-- add question modal -->
    <b-modal id="add-question-modal" title="Add a Question" body-class="pb-0">
      <b-form ref="addQuestionForm" @submit.prevent="addQuestion">
        <b-form-group label="Question Title" label-class="h6" class="mb-4">
          <b-textarea v-model="questionTitle" required />
        </b-form-group>
        <b-form-group class="mb-0 px-1">
          <template #label>
            <b-row no-gutters align-h="between" align-v="end" class="mb-3">
              <b-col><legend class="h6 mb-0">Options</legend></b-col>
              <b-col cols="auto">
                <b-icon-plus-square
                  scale="1.5"
                  class="cursor-pointer"
                  @click="addOption"
                />
              </b-col>
            </b-row>
          </template>
          <b-form-radio-group v-model="correctOption" required>
            <b-form-radio
              v-for="(option, i) in options"
              :key="i"
              :value="option.value"
              class="w-100 custom-option my-1"
              @change="optionsChanged(i)"
            >
              <b-input-group>
                <b-input
                  v-model="option.text"
                  placeholder="Enter option"
                  class="border-0 no-shadow custom-option-input"
                />
                <b-input-group-prepend>
                  <b-icon-x-circle
                    scale="1.25"
                    class="ml-3 cursor-pointer"
                    @click="removeOption(i)"
                  />
                </b-input-group-prepend>
              </b-input-group>
            </b-form-radio>
          </b-form-radio-group>
          <b-button
            type="submit"
            ref="addQuestionBtn"
            class="d-none"
          ></b-button>
        </b-form-group>
      </b-form>
      <template #modal-footer="{ cancel }">
        <b-row no-gutters align-v="center" align-h="end">
          <b-button variant="dark" class="px-3 mx-1" @click="cancel()">
            cancel
          </b-button>
          <b-button
            variant="primary"
            class="text-light px-2 ml-2"
            @click="submitForm"
            :disabled="state.addingQuestion"
          >
            <transition-group name="group-fade">
              <span key="loading" v-if="state.addingQuestion">
                <AppLoading size="xs" />
              </span>
              <span key="text" v-else>Add question</span>
            </transition-group>
          </b-button>
        </b-row>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "admin-individual-quiz",
  data() {
    return {
      state: {
        loadingQuestions: false,
        addingQuestion: false,
      },
      options: [
        {
          text: "",
          value: "on",
        },
      ],
      correctOption: "on",
      questionTitle: "",
      allQuestions: [],
    };
  },
  computed: {
    hasNoQuestion() {
      return this.allQuestions.length < 1 ? true : false;
    },
    quizId() {
      return this.$route.params.id;
    },
    allQuizes() {
      return this.$store.state.admin.quizes;
    },
    quiz() {
      return this.allQuizes.filter((item) => item.id == this.quizId)[0];
    },
  },
  mounted() {
    console.log(this.quiz);
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      this.state.loadingQuestions = true;
      const reqData = {
        action: "getQuestion",
        quizid: this.quizId,
      };
      try {
        const { data } = await this.axios.post("getQuestion", reqData);
        this.allQuestions = data;
        console.log(data);
        this.state.loadingQuestions = false;
      } catch (error) {
        console.log(error);
        this.state.loadingQuestions = false;
      }
    },
    addQuestion() {
      console.log("adding Question....");
      this.state.addingQuestion = true;
      const questionsFormatter = (item, i) => {
        return { optionTitle: item.text, isCorrect: item.value };
      };
      const reqData = {
        action: "addQuestion",
        quizId: this.quizId,
        question: {
          file: "xxx",
          questionTitle: this.questionTitle,
          questionOptions: this.options.map(questionsFormatter),
        },
      };
      this.axios
        .post("insertQuestion", reqData)
        .then((res) => {
          this.state.addingQuestion = false;
          if (res.data && res.data.message) {
            this.$notify({
              title: "SUCCESS!",
              message: res.data.message,
              status: "success",
            });
            this.$bvModal.hide("add-question-modal");
            this.fetchQuestions();
          } else {
            this.$notify({
              title: "ERROR!",
              message: "Something went wrong!",
              status: "danger",
            });
          }
          console.log(res);
        })
        .catch((err) => {
          this.state.addingQuestion = false;
          if (err && err.errorMessage) {
            this.$notify({
              title: "ERROR!",
              message: err.errorMessage,
              status: "danger",
            });
          }
          console.log(err);
        });
      console.log(reqData);
    },
    submitForm() {
      this.$refs["addQuestionBtn"].click();
    },
    addOption() {
      this.options.push({ text: "", value: "incorrect" });
    },
    removeOption(index) {
      if (this.options.length <= 1) return;
      this.$delete(this.options, index);
    },
    optionsChanged(index) {
      const mapper = (item, i) => {
        if (index == i) {
          item.value = "on";
        } else {
          item.value = "incorrect";
        }
        return item;
      };
      this.$set(this, "options", this.options.map(mapper));
      this.$nextTick(() => {
        this.correctOption = "on";
        console.log(this.options);
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

<style lang="scss">
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