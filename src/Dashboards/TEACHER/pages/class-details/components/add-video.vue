<template>
  <b-modal id="teacher-add-videos-modal" title="Add Video" body-class="pb-0">
    <b-form ref="addVideoForm" @submit.prevent="addVideo">
      <b-form-group label="Video Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
      </b-form-group>

      <b-form-group label="Video File">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".mp4, .mkv"
          required
        ></b-form-file>
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button type="submit" ref="addVideoBtn" class="d-none"></b-button>
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
          :disabled="state.addingVideo"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingVideo">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Video</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "teacher-add-videos-modal",
  props: ["classID"],
  data() {
    return {
      state: {
        addingVideo: false,
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
  mounted() {},
  methods: {
    async addVideo() {
      this.state.addingVideo = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("subject", this.user.subject);
      reqData.append("level", this.classID);
      reqData.append("userId", this.user.user_id);
      reqData.append("file", this.file);
      try {
        const { data } = await this.axios.post("videos", reqData);
        console.log(data);
        this.state.addingVideo = false;
        if (data.image) {
          this.clearModal();
          this.$emit("video-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Video added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message: data.message || "Something went wrong while adding video.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingVideo = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add video! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addVideoBtn"].click();
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
    clearModal() {
      this.$bvModal.hide("teacher-add-videos-modal");
      this.state.addingVideo = false;
      this.title = "";
      this.file = null;
    },
  },
};
</script>

<style>
</style>