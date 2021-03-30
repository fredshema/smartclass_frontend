<template>
  <b-modal
    id="teacher-add-question-modal"
    title="Add a Question"
    body-class="pb-0"
  >
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
        <b-button type="submit" ref="addQuestionBtn" class="d-none"></b-button>
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
</template>

<script>
export default {
  name: "teacher-add-question-modal",
  props: ["quizId"],
  data() {
    return {
      state: { addingQuestion: false },
      options: [
        {
          text: "",
          value: "on",
        },
      ],
      correctOption: "on",
      questionTitle: "",
    };
  },
  methods: {
    addQuestion() {
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
            this.$bvModal.hide("teacher-add-question-modal");
            this.$emit("question-added");
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
    submitForm() {
      this.$refs["addQuestionBtn"].click();
    },
  },
};
</script>

<style>
</style>