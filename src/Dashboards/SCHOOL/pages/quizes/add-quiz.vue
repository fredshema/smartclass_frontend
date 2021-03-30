<template>
  <b-modal id="school-add-quiz-modal" title="Add Quiz" body-class="pb-0">
    <b-form ref="addQuizForm" @submit.prevent="addQuiz">
      <b-form-group label="Quiz Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
      </b-form-group>

      <b-form-group label="Subject" label-class="h6" class="mb-4">
        <template #label>
          <b-container fluid>
            <b-row align-v="end">
              <b-col cols="auto" class="p-0">
                <p class="h6 p-0 col-form-label mb-0">Subject</p>
              </b-col>
              <b-col>
                <b-button
                  size="sm"
                  variant="light"
                  pill
                  @click="fetchSubjects"
                  :disabled="state.loadingSubjects"
                >
                  <b-icon-arrow-repeat
                    icon="arrow-repeat"
                    :animation="state.loadingSubjects ? 'spin' : 'none'"
                    font-scale="1.25"
                  />
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <b-form-select
          :disabled="!subjectsAvailable"
          v-model="subject"
          required
        >
          <template #first>
            <b-form-select-option value="" disabled>
              Select Subject
            </b-form-select-option>
            <b-form-select-option
              v-for="sub in subjects"
              :key="sub.id"
              :value="sub"
            >
              {{ sub.title }}
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group class="mb-4">
        <template #label>
          <b-container fluid>
            <b-row align-v="end">
              <b-col cols="auto" class="p-0">
                <p class="h6 p-0 col-form-label mb-0">Level</p>
              </b-col>
              <b-col>
                <b-button
                  size="sm"
                  variant="light"
                  pill
                  @click="fetchLevels"
                  :disabled="state.loadingLevels"
                >
                  <b-icon-arrow-repeat
                    icon="arrow-repeat"
                    :animation="state.loadingLevels ? 'spin' : 'none'"
                    font-scale="1.25"
                  />
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <b-form-select :disabled="!levelsAvailable" v-model="level" required>
          <template #first>
            <b-form-select-option value="" disabled>
              Select Level
            </b-form-select-option>
            <b-form-select-option
              v-for="lev in levels"
              :key="lev.id"
              :value="lev"
            >
              {{ lev.title }}
            </b-form-select-option>
          </template>
        </b-form-select>
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
  name: "school-add-quiz-modal",
  data() {
    return {
      state: {
        addingQuiz: false,
        loadingSubjects: false,
        loadingLevels: false,
      },
      title: "",
      subject: "",
      subjects: [],
      level: "",
      levels: [],
    };
  },
  computed: {
    subjectsAvailable() {
      if (Array.isArray(this.subjects) && this.subjects.length > 0) return true;
      return false;
    },
    levelsAvailable() {
      if (Array.isArray(this.levels) && this.levels.length > 0) return true;
      return false;
    },
    user() {
      return this.$store.state.school.data;
    },
  },
  mounted() {
    this.fetchSubjects();
    this.fetchLevels();
  },
  methods: {
    async addQuiz() {
      this.state.addingQuiz = true;
      let reqData = {
        action: "addQuiz",
        title: this.title,
        level: this.level.id,
        subject: this.subject.id,
        userId: this.user.user_id,
        school: this.user.school
      };
      try {
        const { data } = await this.axios.post("insertQuiz", reqData);
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
    async fetchSubjects() {
      this.state.loadingSubjects = true;
      const reqData = { action: "getSubjects" };
      try {
        const { data } = await this.axios.post("getElements", reqData);
        this.subjects = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      this.state.loadingSubjects = false;
    },
    async fetchLevels() {
      this.state.loadingLevels = true;
      const reqData = { action: "getLevels" };
      try {
        const { data } = await this.axios.post("getElements", reqData);
        this.levels = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      this.state.loadingLevels = false;
    },
    clearModal() {
      this.$bvModal.hide("school-add-quiz-modal");
      this.state.addingQuiz = false;
      this.state.loadingSubjects = false;
      this.state.loadingLevels = false;
      this.title = "";
      this.subject = "";
      this.subjects = [];
      this.level = "";
      this.levels = [];
    },
  },
};
</script>

<style>
</style>