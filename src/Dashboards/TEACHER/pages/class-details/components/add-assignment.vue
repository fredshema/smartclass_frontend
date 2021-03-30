<template>
  <b-modal id="teacher-add-assignments-modal" title="Add Assignment" body-class="pb-0">
    <b-form ref="addAssignmentForm" @submit.prevent="addAssignment">
      <b-form-group label="Assignment Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
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
        <b-button type="submit" ref="addAssignmentBtn" class="d-none"></b-button>
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
          :disabled="state.addingAssignment"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingAssignment">
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
  name: "teacher-add-assignment-modal",
  props: ["classID"],
  data() {
    return {
      state: {
        addingAssignment: false,
      },
      title: "",
      file: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.teacher.data;
    },
  },
  mounted() {
  },
  methods: {
    async addAssignment() {
      this.state.addingAssignment = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("subject", this.user.subject);
      reqData.append("level", this.classID);
      reqData.append("userId", this.user.user_id);
      reqData.append("school", this.user.school);
      reqData.append("file", this.file);
      try {
        const { data } = await this.axios.post("insertAssign", reqData);
        console.log(data);
        this.state.addingAssignment = false;
        if (data) {
          this.clearModal();
          this.$emit("assignment-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Assignment added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message:
              data.message || "Something went wrong while adding Assignment.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingAssignment = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add Assignment! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addAssignmentBtn"].click();
    },
    clearModal() {
      this.$bvModal.hide("teacher-add-assignments-modal");
      this.state.addingAssignment = false;
      this.title = "";
      this.file = null;
    },
  },
};
</script>

<style>
</style>