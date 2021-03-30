<template>
  <b-modal id="admin-add-books-modal" title="Add Book" body-class="pb-0">
    <b-form ref="addBookForm" @submit.prevent="addBook">
      <b-form-group label="Book Title" label-class="h6" class="mb-4">
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

      <b-form-group label="Book File">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept=".docx, .pdf, .ppt"
          required
        ></b-form-file>
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button type="submit" ref="addBookBtn" class="d-none"></b-button>
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
          :disabled="state.addingBook"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingBook">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Book</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "admin-add-books-modal",
  data() {
    return {
      state: {
        addingBook: false,
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
      return this.$store.state.admin.data;
    },
  },
  mounted() {
    this.fetchSubjects();
    this.fetchLevels();
  },
  methods: {
    async addBook() {
      this.state.addingBook = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("subject", this.subject.id);
      reqData.append("level", this.level.id);
      reqData.append("userId", this.user.user_id);
      reqData.append("file", this.file);
      try {
        const { data } = await this.axios.post("InserBooks", reqData);
        console.log(data);
        this.state.addingBook = false;
        if (data.image) {
          this.clearModal();
          this.$emit("book-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Book added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message: data.message || "Something went wrong while adding book.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingBook = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add book! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addBookBtn"].click();
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
      this.$bvModal.hide("admin-add-books-modal");
      this.state.addingBook = false;
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