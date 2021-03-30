<template>
  <b-container class="admin-summaries p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">Summaries</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="openModal"
          variant="dark"
          class="mx-1"
          :disabled="state.loadingSummary"
        >
          Add Summary
        </b-button>
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingSummary"
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
          v-if="state.loadingSummaries"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Summaries</h6>
        </div>
        <summaries-table
          @data-changed="fetchSummaries"
          :summaries-data="allSummaries"
          v-else-if="summariesAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">
            No Summaries available at the moment!
          </h6>
        </b-row>
      </transition>
    </b-row>
    <add-summary @summary-added="fetchSummaries" />
  </b-container>
</template>

<script>
import AddSummary from "./add-summary.vue";
import SummariesTable from "./summaries-table.vue";
export default {
  name: "admin-summaries",
  components: { SummariesTable, AddSummary },
  data() {
    return {
      allSummaries: null,
      state: {
        loadingSummaries: false,
      },
    };
  },
  computed: {
    summariesAvailable() {
      if (!this.allSummaries) return false;
      if (this.allSummaries.length && this.allSummaries.length < 1)
        return false;
      return true;
    },
  },
  mounted() {
    this.fetchSummaries();
  },
  beforeMount() {
    this.$title("Summaries");
  },
  methods: {
    async fetchSummaries() {
      this.state.loadingSummaries = true;
      const reqData = { action: "getsummaries" };
      try {
        const { data } = await this.axios.post("getItems", reqData);
        this.state.loadingSummaries = false;
        this.allSummaries = data;
        console.log(data);
      } catch (error) {
        this.state.loadingSummaries = false;
        console.log(error);
      }
    },
    refresh() {
      if (this.state.loadingSummaries) return;
      this.fetchSummaries();
    },
    openModal() {
      this.$bvModal.show("admin-add-summary-modal");
    },
    hideModal() {
      this.$bvModal.hide("admin-add-summary-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>