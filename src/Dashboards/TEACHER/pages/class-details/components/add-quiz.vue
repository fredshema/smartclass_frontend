<template>
  <b-modal id="teacher-add-quiz-modal" title="Add Quiz" body-class="pb-0">
    <b-form ref="addQuizForm" @submit.prevent="addQuiz">
      <b-form-group label="Quiz Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button type="submit" ref="addQuizBtn" class="d-none"></b-button>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-row no-gutters align-v="center" align-h="end">
        <b-button variant="dark" class="px-3 mx-1" @click="clearModal">
          cancel
        </b-button>
        <b-button
          variant="primary"
          class="text-light px-2 ml-2"
          @click="submitForm"
          :disabled="state.addingQuiz"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingQuiz">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Quiz</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "teacher-add-quiz-modal",
  props: ["classID"],
  data() {
    return {
      state: {
        addingQuiz: false,
      },
      title: "",
      subject: "",
      subjects: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.teacher.data;
    },
  },
  mounted() {},
  methods: {
    async addQuiz() {
      this.state.addingQuiz = true;
      let reqData = {
        action: "addQuiz",
        title: this.title,
        level: this.classID,
        subject: this.user.subject,
        userId: this.user.user_id,
      };
      if (this.user.school) reqData.school = this.user.school;
      try {
        const getURL = () => {
          console.log(reqData,this.user);
          if (this.user.school) {
            return this.axios.post("insertSquiz", reqData);
          } else {
            return this.axios.post("insertQuiz", reqData);
          }
        };
        const { data } = await getURL();
        this.state.addingQuiz = false;
        if (data) {
          this.clearModal();
          this.$emit("quiz-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Quiz added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message: data.message || "Something went wrong while adding Quiz.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingQuiz = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add Quiz! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addQuizBtn"].click();
    },
    clearModal() {
      this.$bvModal.hide("teacher-add-quiz-modal");
      this.state.addingQuiz = false;
      this.title = "";
    },
  },
};
</script>

<style>
</style>