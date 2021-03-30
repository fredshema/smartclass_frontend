<template>
  <b-container class="school-notes p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <h2 class="mb-0">Assignments</h2>
      <b-button
        @click="refresh"
        variant="dark"
        :disabled="state.loadingAssignments"
      >
        Refresh
      </b-button>
    </b-row>
    <hr class="mt-0 mb-4" />
    <b-row
      no-gutters
      v-if="!state.refreshing"
      align-h="center"
      align-v="center"
    >
      <transition name="group-fade" mode="out-in">
        <div
          v-if="state.loadingAssignments"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading school assignments</h6>
        </div>
        <assignments-table
          :assignments-data="allAssignments"
          @data-changed="fetchAssignments"
          v-else-if="assignmentsAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">
            No school assignments available at the moment!
          </h6>
        </b-row>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import assignmentsTable from "./assignments-table.vue";
export default {
  name: "school-assignments",
  components: { assignmentsTable },
  data() {
    return {
      allAssignments: null,
      state: {
        loadingAssignments: false,
        refreshing: false,
        totalPages: 0,
      },
    };
  },
  computed: {
    assignmentsAvailable() {
      if (!this.allAssignments) return false;
      if (this.allAssignments.length && this.allAssignments.length < 1)
        return false;
      return true;
    },
     schoolID(){
      return this.$store.state.school.data.school
    }
  },
  mounted() {
    this.fetchAssignments();
  },
  beforeMount() {
    this.$title("Assignments");
  },
  methods: {
    async fetchAssignments() {
      this.state.loadingAssignments = true;
      const reqData = { action: "schoolAssignments", school: this.schoolID };
      this.$set(this, "allAssignments", []);
      try {
        const { data } = await this.axios.post("schoolItems", reqData);
        this.state.loadingAssignments = false;
        console.log(data);
        this.allAssignments = data;
      } catch (error) {
        this.state.loadingAssignments = false;
        if (!this.allAssignments) this.allAssignments = [];
        console.log(error);
      }
    },
    updateAssignmentData(params) {
      const { data, done } = params;
      const searchedItem = this.allAssignments.filter(
        (item) => item.id == data.id
      );
      this.$set(
        this.allAssignments,
        this.allAssignments.indexOf(searchedItem),
        data
      );
      done();
    },
    refresh() {
      if (this.state.loadingAssignments) return;
      this.fetchAssignments();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>