<template>
  <b-modal
    id="student-add-challenges-modal"
    title="Add challenge"
    body-class="pb-0"
  >
    <b-form ref="addChallengeForm" @submit.prevent="addChallenge">
      <b-form-group label="Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
      </b-form-group>

      <b-form-group label="Challenge" label-class="h6" class="mb-4">
        <b-form-input v-model="challenge" trim required />
      </b-form-group>

      <b-form-group label="Challenge File">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".docx, .pdf, .ppt"
        ></b-form-file>
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button type="submit" ref="addChallengeBtn" class="d-none"></b-button>
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
          :disabled="state.addingChallenge"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingChallenge">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Challenge</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "teacher-add-challenges-modal",
  props: ["classID"],
  data() {
    return {
      state: {
        addingChallenge: false,
      },
      title: "",
      challenge: "",
      file: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.student.studentData;
    },

  },
  mounted() {},
  methods: {
    async addChallenge() {
      this.state.addingChallenge = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("challenge", this.challenge);
      reqData.append("subjectId", this.classID);
      reqData.append("level", this.user.level);
      reqData.append("userId", this.user.user_id);
      reqData.append("type", this.user.user_type);
      reqData.append("file", this.file);
      console.log(this.user, this.classID);

      try {
        const { data } = await this.axios.post("AddChallanges", reqData);
        console.log(data);
        this.state.addingChallenge = false;
        if (data) {
          this.clearModal();
          this.$emit("challenge-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Challenge added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message:
              data.message || "Something went wrong while adding challenge.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingChallenge = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add challenge! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addChallengeBtn"].click();
    },
    clearModal() {
      this.$bvModal.hide("student-add-challenges-modal");
      this.state.addingChallenge = false;
      this.title = "";
      this.challenge = "";
      this.file = null;
    },
  },
};
</script>

<style>
</style>