<template>
  <b-container class="admin-papers p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">Papers</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="openModal"
          variant="dark"
          class="mx-1"
          :disabled="state.loadingPapers"
        >
          Add Paper
        </b-button>
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingPapers"
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
          v-if="state.loadingPapers"
          class="py-5 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Papers</h6>
        </div>
        <papers-table
          :papers-data="allPapers"
          @data-changed="fetchPapers"
          v-else-if="papersAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Papers available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
    <add-paper @paper-added="fetchPapers" />
  </b-container>
</template>

<script>
import AddPaper from "./add-paper.vue";
import papersTable from "./papers-table.vue";
export default {
  name: "admin-papers",
  components: { papersTable, AddPaper },
  data() {
    return {
      allPapers: null,
      state: {
        loadingPapers: false,
      },
    };
  },
  computed: {
    papersAvailable() {
      if (!this.allPapers) return false;
      if (this.allPapers.length && this.allPapers.length < 1) return false;
      return true;
    },
  },
  mounted() {
    this.fetchPapers();
  },
  beforeMount() {
    this.$title("Papers");
  },
  methods: {
    async fetchPapers() {
      this.state.loadingPapers = true;
      const reqData = { action: "getPapers" };
      try {
        const { data } = await this.axios.post("getItems", reqData);
        this.state.loadingPapers = false;
        this.allPapers = data;
        console.log(data);
      } catch (error) {
        this.state.loadingPapers = false;
        console.log(error);
      }
    },
    refresh() {
      if (this.state.loadingPapers) return;
      this.fetchPapers();
    },
    openModal() {
      this.$bvModal.show("admin-add-papers-modal");
    },
    hideModal() {
      this.$bvModal.hide("admin-add-papers-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>