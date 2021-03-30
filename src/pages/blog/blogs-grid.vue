<template>
  <b-container class="pt-4 pb-5">
    <b-row cols="1" align-h="center">
      <b-col class="p-3" v-for="(blog, i) in blogsData" :key="i">
        <div class="blog-box d-flex flex-column flex-md-row px-3 py-4">
          <div class="date pr-4 pl-2 mb-2">
            <span class="text-uppercase">{{ blog.Date | date }}</span>
          </div>
          <div class="content pl-2">
            <div class="title h3 mb-4" @click="setSelectedPost(blog)">
              {{ blog.title }}
            </div>
            <div class="content">
              <span v-html="blog.subject"></span>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <transition name="slide-in-up">
      <post-preview v-if="showPostPreview" @close="setSelectedPost(null)">
        <template #title>{{ selectedPost.title }}</template>
        <template #date>{{ selectedPost.Date | date }}</template>
        {{ selectedPost.subject }}
      </post-preview>
    </transition>
  </b-container>
</template>

<script>
import moment from "moment";
import PostPreview from "./post-preview.vue";
export default {
  name: "blogs-grid-component",
  props: ["blogs-data"],
  components: { PostPreview },
  data() {
    return {
      selectedPost: null,
    };
  },
  computed: {
    showPostPreview() {
      if (!this.selectedPost) return false;
      return true;
    },
  },
  filters: {
    date: (date) => {
      return moment(date, "DD-MM-YYYY").format("MMM, Do YYYY");
    },
  },
  methods: {
    setSelectedPost(post) {
      this.$set(this, "selectedPost", post);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-box {
  border-radius: 4px;
  background-color: var(--light);
}
.date {
  white-space: nowrap;
  min-width: 160px;
  font-size: 0.85rem;
}
.content {
  overflow: hidden;

  span {
    position: relative;
    height: 4rem;
    display: block;

    &::after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 70%;
      height: 1.2em;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        var(--light) 100%
      );
      pointer-events: none;
    }
  }
}
.title {
  transition: 100ms ease-in-out;
  &:hover {
    color: var(--primary);
    cursor: pointer;
  }
}
</style>