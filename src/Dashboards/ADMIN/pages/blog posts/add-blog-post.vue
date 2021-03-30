<template>
  <b-modal id="add-teacher-blog-modal" title="Add Blog post" body-class="pb-0">
    <b-form ref="addBlogForm" @submit.prevent="addBlog">
      <b-form-group label="Title" label-class="h6" class="mb-4">
        <b-form-input v-model="title" trim required />
      </b-form-group>

      <b-form-group label="Introduction" label-class="h6" class="mb-4">
        <b-textarea v-model="introduction" trim required></b-textarea>
      </b-form-group>

      <b-form-group label="Content 1" label-class="h6" class="mb-4">
        <b-textarea v-model="content1" trim required></b-textarea>
      </b-form-group>

      <b-form-group label="Content 2" label-class="h6" class="mb-4">
        <b-textarea v-model="content2" trim required></b-textarea>
      </b-form-group>

      <b-form-group label="File 1">
        <b-form-file
          v-model="file1"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          required
        ></b-form-file>
      </b-form-group>
      <b-form-group label="File 2">
        <b-form-file
          v-model="file2"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          required
        ></b-form-file>
      </b-form-group>

      <b-form-group class="mb-0 px-1">
        <b-button type="submit" ref="addBlogBtn" class="d-none"></b-button>
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
          :disabled="state.addingBlog"
        >
          <transition-group name="group-fade">
            <span key="loading" v-if="state.addingBlog">
              <AppLoading size="xs" />
            </span>
            <span key="text" v-else>Add Blog</span>
          </transition-group>
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "add-blog-post-modal",
  data() {
    return {
      state: {
        addingBlog: false,
      },
      title: "",
      introduction: "",
      content1: "",
      content2: "",
      file1: null,
      file2: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.admin.data;
    },
  },
  methods: {
    async addBlog() {
      this.state.addingBlog = true;
      let reqData = new FormData();
      reqData.append("title", this.title);
      reqData.append("introduction", this.introduction);
      reqData.append("content1", this.content1);
      reqData.append("content2", this.content2);
      reqData.append("userid", this.user.user_id);
      reqData.append("file1", this.file1);
      reqData.append("file2", this.file2);
      try {
        const { data } = await this.axios.post("insertPosts", reqData);
        console.log(data);
        this.state.addingBlog = false;
        if (data.image1) {
          this.clearModal();
          this.$emit("blog-added");
          this.$notify({
            title: "SUCCESS!",
            message: data.message || "Blog post added successfully.",
            status: "success",
          });
        } else {
          this.$notify({
            title: "ERROR!",
            message:
              data.message || "Something went wrong while adding Blog post.",
            status: "danger",
          });
        }
      } catch (error) {
        this.state.addingBlog = false;
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to add Blog post! try agin later.",
          status: "danger",
        });
      }
    },
    submitForm() {
      this.$refs["addBlogBtn"].click();
    },
    clearModal() {
      this.$bvModal.hide("add-teacher-blog-modal");
      this.state.addingBlog = false;
      this.title = "";
      this.introduction = "";
      this.content1 = "";
      this.content2 = "";
      this.file1 = null;
      this.file2 = null;
    },
  },
};
</script>

<style>
</style>