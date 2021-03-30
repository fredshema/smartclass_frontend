<template>
  <b-container class="admin-mentor p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <h2 class="mb-0">Mentors</h2>
      <b-button
        @click="refresh"
        variant="dark"
        :disabled="state.loadingMentors"
      >
        Refresh
      </b-button>
    </b-row>
    <hr class="mt-0 mb-0" />
    <b-row
      no-gutters
      v-if="!state.refreshing"
      align-v="center"
      align-h="center"
    >
      <transition name="group-fade" mode="out-in">
        <div
          v-if="state.loadingMentors"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Mentors</h6>
        </div>
        <mentors-table
          :mentors-data="allMentors"
          @data-edited="updateMentorData"
          v-else-if="mentorsAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Mentors available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import mentorsTable from "./mentors-table.vue";
export default {
  name: "admin-mentors",
  components: { mentorsTable },
  data() {
    return {
      allMentors: null,
      state: {
        loadingMentors: false,
        refreshing: false,
      },
    };
  },
  mounted() {
    this.fetchMentors();
  },
  beforeMount() {
    this.$title("Mentors");
  },
  computed: {
    mentorsAvailable() {
      if (!this.allMentors) return false;
      if (this.allMentors.length && this.allMentors.length < 1) return false;
      return true;
    },
  },
  methods: {
    async fetchMentors() {
      this.state.loadingMentors = true;
      const reqData = { action: "getMentors" };
      try {
        const { data } = await this.axios.post("mentor", reqData);
        this.state.loadingMentors = false;
        this.allMentors = data;
        console.log(this.allMentors);
      } catch (error) {
        this.state.loadingMentors = false;
        console.log(data);
      }
    },
    updateMentorData(params) {
      const { data, done } = params;
      const searchedItem = this.allMentors.filter((item) => item.id == data.id);
      this.$set(this.allMentors, this.allMentors.indexOf(searchedItem), data);
      done();
    },
    refresh() {
      if (this.state.loadingMentors) return;
      this.fetchMentors();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>