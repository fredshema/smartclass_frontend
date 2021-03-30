<template>
  <b-container class="admin-videos p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">Videos</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="openModal"
          variant="dark"
          class="mx-1"
          :disabled="state.loadingVideos"
        >
          Add Video
        </b-button>
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingVideos"
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
          v-if="state.loadingVideos"
          class="py-5 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Videos</h6>
        </div>
        <videos-table
          :videos-data="allVideos"
          @data-changed="fetchVideos"
          v-else-if="videosAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Videos available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import videosTable from "./videos-table.vue";
export default {
  name: "admin-videos",
  components: { videosTable },
  data() {
    return {
      allVideos: null,
      state: {
        loadingVideos: false,
      },
    };
  },
  computed: {
    videosAvailable() {
      if (!this.allVideos) return false;
      if (this.allVideos.length && this.allVideos.length < 1) return false;
      return true;
    },
  },
  mounted() {
    this.fetchVideos();
  },
  beforeMount() {
    this.$title("Videos");
  },
  methods: {
    async fetchVideos() {
      this.state.loadingVideos = true;
      const reqData = { action: "getVideos" };
      try {
        const { data } = await this.axios.post("getItems", reqData);
        this.state.loadingVideos = false;
        this.allVideos = data;
        console.log(data);
      } catch (error) {
        this.state.loadingVideos = false;
        console.log(error);
      }
    },
    refresh() {
      if (this.state.loadingVideos) return;
      this.fetchVideos();
    },
    openModal() {
      this.$bvModal.show("admin-add-videos-modal");
    },
    hideModal() {
      this.$bvModal.hide("admin-add-videos-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>