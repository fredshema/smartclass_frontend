<template>
  <b-modal
    id="student-submit-assignments-modal"
    title="Submit Assignment"
    body-class="pb-0"
  >
    <b-form ref="submitAssignmentForm" @submit.prevent="submitAssignment">
      <b-form-group label="Assignment Title" label-class="h6" class="mb-4">
        <b-form-input :value="title" trim required readonly />
      </b-form-group>

      <b-form-group label="Assignment File">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".docx, .pdf, .ppt"
          required
        ></b-form-file>
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button
          type="submit"
          ref="submitAssignmentBtn"
          class="d-none"
        ></b-button>
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
          :disabled="state.submittingAssignment"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.submittingAssignment">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Assignment</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "student-submit-assignment-modal",
  props: ["classID", "assignment"],
  data() {
    return {
      state: {
        submittingAssignment: false,
      },
      file: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.student.studentData;
    },
    title() {
      return this.assignment.title;
    },
  },
  mounted() {
    console.log(this.user, this.classID, this.assignment, this.title);
  },
  methods: {
    async submitAssignment() {
      this.state.submittingAssignment = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("subject", this.classID);
      reqData.append("level", this.user.level);
      reqData.append("userId", this.user.user_id);
      reqData.append("file", this.file);
      console.log(this.user, this.classID, this.assignment, this.title);
      try {
        const { data } = await this.axios.post("submitAssign", reqData);
        console.log(data);
        this.state.submittingAssignment = false;
        if (data.image) {
          this.clearModal();
          this.$emit("assignment-submitted");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Assignment submitted successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message:
              data.message ||
              "Something went wrong while submitting your assignment.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.submittingAssignment = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add assignment! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["submitAssignmentBtn"].click();
    },
    clearModal() {
      this.$bvModal.hide("student-submit-assignments-modal");
      this.state.submittingAssignment = false;
      this.file = null;
    },
  },
};
</script>

<style>
</style>