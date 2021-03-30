<template>
  <b-container class="admin-schools p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <h2 class="mb-0">Schools</h2>
      <b-button
        @click="refresh"
        variant="dark"
        :disabled="state.loadingSchools"
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
          v-if="state.loadingSchools"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Schools</h6>
        </div>
        <schools-table
          :schools-data="allSchools"
          @data-edited="updateSchoolData"
          v-else-if="schoolsAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Schools available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import schoolsTable from "./schools-table.vue";
export default {
  name: "admin-schools",
  components: { schoolsTable },
  data() {
    return {
      allSchools: null,
      state: {
        loadingSchools: false,
        refreshing: false,
      },
    };
  },
  mounted() {
    this.fetchSchools();
  },
  beforeMount() {
    this.$title("Schools");
  },
  computed: {
    schoolsAvailable() {
      if (!this.allSchools) return false;
      if (this.allSchools.length && this.allSchools.length < 1) return false;
      return true;
    },
  },
  methods: {
    async fetchSchools() {
      this.state.loadingSchools = true;
      const reqData = { action: "getSchoolAD" };
      try {
        const { data } = await this.axios.post("getSchoolAD", reqData);
        this.state.loadingSchools = false;
        this.allSchools = data;
        console.log(this.allSchools);
      } catch (error) {
        this.state.loadingSchools = false;
        console.log(data);
      }
    },
    updateSchoolData(params) {
      const { data, done } = params;
      const searchedItem = this.allSchools.filter((item) => item.id == data.id);
      this.$set(this.allSchools, this.allSchools.indexOf(searchedItem), data);
      done();
    },
    refresh() {
      if (this.state.loadingSchools) return;
      this.fetchSchools();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>