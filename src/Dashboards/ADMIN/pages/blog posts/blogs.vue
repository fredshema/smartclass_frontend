<template>
  <b-container class="admin-blogs p-5">
<b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">Blog Posts</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="openModal"
          variant="dark"
          class="mx-1"
          :disabled="state.loadingBlogs"
        >
          Add Blog
        </b-button>
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingBlogs"
        >
          Refresh
        </b-button>
      </b-col>
    </b-row>
    <hr class="mt-0 mb-0" />
    <b-row
      no-gutters
      v-if="!state.refreshing"
      align-h="center"
      align-v="center"
    >
      <transition name="group-fade" mode="out-in">
        <div
          v-if="state.loadingBlogs"
          class="py-5 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Blog Posts</h6>
        </div>
        <blogs-table :blogs-data="allBlogs" v-else-if="blogsAvailable" />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">
            No Blog Posts available at the moment!
          </h6>
        </b-row>
      </transition>
    </b-row>
    <add-blog-post @blog-added="fetchBlogs"/>
  </b-container>
</template>

<script>
import AddBlogPost from './add-blog-post.vue';
import blogsTable from "./blogs-table.vue";
export default {
  name: "admin-blogs",
  components: { blogsTable, AddBlogPost },
  data() {
    return {
      allBlogs: null,
      state: {
        loadingBlogs: false,
      },
    };
  },
  computed: {
    blogsAvailable() {
      if (!this.allBlogs) return false;
      if (this.allBlogs.length && this.allBlogs.length < 1) return false;
      return true;
    },
  },
  mounted() {
    this.fetchBlogs();
  },
  beforeMount() {
    this.$title("Blog Posts");
  },
  methods: {
    async fetchBlogs() {
      this.state.loadingBlogs = true;
      const reqData = { action: "getPosts" };
      try {
        const { data } = await this.axios.post("getPosts", reqData);
        this.state.loadingBlogs = false;
        this.allBlogs = data;
        console.log(data);
      } catch (error) {
        this.state.loadingBlogs = false;
        console.log(error);
      }
    },
    refresh() {
      if (this.state.loadingBlogs) return;
      this.fetchBlogs();
    },
    openModal() {
      this.$bvModal.show("add-teacher-blog-modal");
    },
    hideModal() {
      this.$bvModal.hide("add-teacher-blog-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>