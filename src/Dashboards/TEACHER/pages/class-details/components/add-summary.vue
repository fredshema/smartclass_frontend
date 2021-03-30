<template>
  <b-modal id="teacher-add-summary-modal" title="Add Summary" body-class="pb-0">
    <b-form ref="addSummaryForm" @submit.prevent="addSummary">
      <b-form-group label="Summary Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
      </b-form-group>

      <b-form-group label="Summary File">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".docx, .pdf, .ppt"
          required
        ></b-form-file>
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button type="submit" ref="addSummaryBtn" class="d-none"></b-button>
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
          :disabled="state.addingSummary"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingSummary">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Summary</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "teacher-add-summary-modal",
  props: ["classID"],
  data() {
    return {
      state: {
        addingSummary: false,
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
    async addSummary() {
      this.state.addingSummary = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("subject", this.user.subject);
      reqData.append("level", this.classID);
      reqData.append("userId", this.user.user_id);
      reqData.append("file", this.file);
      try {
        const { data } = await this.axios.post("insertSummaries", reqData);
        console.log(data);
        this.state.addingSummary = false;
        if (data) {
          this.clearModal();
          this.$emit("summary-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Summary added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message:
              data.message || "Something went wrong while adding summary.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingSummary = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add summary! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addSummaryBtn"].click();
    },
    clearModal() {
      this.$bvModal.hide("teacher-add-summary-modal");
      this.state.addingSummary = false;
      this.title = "";
      this.file = null;
    },
  },
};
</script>

<style>
</style>