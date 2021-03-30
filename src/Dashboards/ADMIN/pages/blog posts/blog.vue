<template>
  <b-modal
    id="admin-blog-post-view"
    header-class="pt-4 pb-3 px-3 border-bottom-0"
    content-class="px-1 pb-4"
    footer-class="d-none"
    body-class="px-4 pt-0"
    scrollable
    size="lg"
  >
    <template #modal-header="{ close }">
      <b-container fluid>
        <b-row cols="2" align-h="between">
          <b-col>
            <h5>{{ blogData.title }}</h5>
          </b-col>
          <b-col cols="auto">
            <b-icon-x-circle @click="close()" scale="1.5" class="cursor-pointer" />
          </b-col>
        </b-row>
      </b-container>
    </template>

    <b-container fluid>
      <b-row class="pb-4">
        <div class="image" v-if="blogData.file">
          <b-img-lazy center :src="blogData.file" fluid-grow />
        </div>
      </b-row>
      <b-row>
        <div class="content">
          {{ blogData.subject }}
        </div>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: "admin-blog-view",
  props: ["blogData"],
  watch: {
    blogData() {
      console.log(this.blogData);
    },
  },
};
</script>

<style>
</style>