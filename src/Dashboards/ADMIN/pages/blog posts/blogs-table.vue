<template>
  <div class="w-100">
    <b-table small responsive striped hover :fields="fields" :items="shownData">
      <template #cell(NO)="data">
        <p class="mb-0 px-2">{{ data.index + 1 }}</p>
      </template>
      <template #cell(Action)="data">
        <b-button
          size="sm"
          pill
          variant="link"
          class="text-truncate no-outline px-3"
          @click="readMore(data)"
        >
          Read more
        </b-button>
      </template>
    </b-table>
    <blog :blogData="selectedBlog" />
  </div>
</template>

<script>
import blog from "./blog.vue";
export default {
  components: { blog },
  name: "admin-blogs-table",
  props: ["blogs-data"],
  data() {
    return {
      fields: [
        "NO",
        {
          key: "title",
          label: "Title",
          sortable: true,
          tdClass: "truncate-holder pr-3",
        },
        {
          key: "Date",
          label: "Date",
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        { key: "Action", label: "Action", thClass: "text-center" },
      ],
      state: {
        loadings: {},
      },
      selectedBlog: null,
    };
  },
  computed: {
    shownData() {
      return this.blogsData;
    },
  },
  methods: {
    readMore(data) {
      const { item } = data;
      console.log(item);
      this.$set(this, "selectedBlog", item);
      this.$bvModal.show("admin-blog-post-view");
    },
  },
};
</script>

<style lang="scss" >
.truncate-holder {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 100px;
  text-overflow: ellipsis;
}
</style>