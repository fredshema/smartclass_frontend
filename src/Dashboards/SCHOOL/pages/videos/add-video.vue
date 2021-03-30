<template>
  <b-modal id="school-add-videos-modal" title="Add Video" body-class="pb-0">
    <b-form ref="addVideoForm" @submit.prevent="addVideo">
      <b-form-group label="Video Title" label-class="h6" class="mb-4">
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
  name: "school-add-videos-modal",
  data() {
    return {
      state: {
        addingVideo: false,
        loadingSubjects: false,
        loadingLevels: false,
      },
      title: "",
      subject: "",
      subjects: [],
      level: "",
      levels: [],
      file: null,
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
    async addVideo() {
      this.state.addingVideo= true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("subject", this.subject.id);
      reqData.append("level", this.level.id);
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
      this.$bvModal.hide("school-add-videos-modal");
      this.state.addingVideo = false;
      this.state.loadingSubjects = false;
      this.state.loadingLevels = false;
      this.title = "";
      this.subject = "";
      this.subjects = [];
      this.level = "";
      this.levels = [];
      this.file = null;
    },
  },
};
</script>

<style>
</style>