<template>
  <b-container class="admin-student p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <h2 class="mb-0">Students</h2>
      <b-button
        @click="refresh"
        variant="dark"
        :disabled="state.loadingStudents"
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
          v-if="state.loadingStudents"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Students</h6>
        </div>
        <students-table
          :students-data="allStudents"
          :total-pages="state.totalPages"
          @data-edited="updateStudentData"
          v-else-if="studentsAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Students available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import studentsTable from "./students-table.vue";
export default {
  name: "admin-students",
  components: { studentsTable },
  data() {
    return {
      allStudents: null,
      state: {
        loadingStudents: false,
        refreshing: false,
        totalPages: 0,
      },
    };
  },
  watch: {
    page() {
      this.fetchStudents();
    },
  },
  computed: {
    studentsAvailable() {
      if (!this.allStudents) return false;
      if (this.allStudents.length && this.allStudents.length < 1) return false;
      return true;
    },
    page() {
      return this.$route.params.page;
    },
  },
  mounted() {
    this.fetchStudents();
  },
  beforeMount() {
    this.$title("Students");
  },
  methods: {
    async fetchStudents() {
      this.state.loadingStudents = true;
      const reqData = { action: "getStudents", page: this.page };
      this.$set(this, "allStudents", []);
      try {
        const { data } = await this.axios.post("getStudents", reqData);
        this.state.loadingStudents = false;
        this.allStudents = data.data;
        this.state.totalPages = data.number_of_page;
      } catch (error) {
        this.state.loadingStudents = false;
        if (!this.allStudents) this.allStudents = [];
        console.log(error);
      }
    },
    updateStudentData(params) {
      const { data, done } = params;
      const searchedItem = this.allStudents.filter(
        (item) => item.id == data.id
      );
      this.$set(this.allStudents, this.allStudents.indexOf(searchedItem), data);
      done();
    },
    refresh() {
      if (this.state.loadingStudents) return;
      this.fetchStudents();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>