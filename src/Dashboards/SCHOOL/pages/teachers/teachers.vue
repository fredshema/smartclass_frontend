<template>
  <b-container class="admin-teacher p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <h2 class="mb-0">Teachers</h2>
      <b-button
        @click="refresh"
        variant="dark"
        :disabled="state.loadingTeachers"
      >
        Refresh
      </b-button>
    </b-row>
    <hr class="mt-0 mb-0" />
    <b-row no-gutters align-h="center" align-v="center">
      <transition name="group-fade" mode="out-in">
        <div
          v-if="state.loadingTeachers"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Teachers</h6>
        </div>
        <teachers-table
          :teachers-data="allTeachers"
          @data-edited="updateTeacherData"
          v-else-if="teachersAvailable"
        />
        <b-container fluid class="bg-light" v-else>
          <h6 class="text-center py-5">No Teachers available at the moment!</h6>
        </b-container>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import teachersTable from "./teachers-table.vue";
export default {
  name: "admin-teacher",
  components: { teachersTable },
  data() {
    return {
      allTeachers: [],
      state: {
        loadingTeachers: false,
      },
    };
  },
  mounted() {
    this.fetchTeachers();
  },
  beforeMount() {
    this.$title("Teachers");
  },
  computed: {
    teachersAvailable() {
      if (!this.allTeachers) return false;
      if (this.allTeachers.length < 1) return false;
      return true;
    },
    schoolID() {
      return this.$store.state.school.data.school;
    },
  },
  methods: {
    async fetchTeachers() {
      this.state.loadingTeachers = true;
      const reqData = { action: "getTeachers", school: this.schoolID };
      try {
        const { data } = await this.axios.post("schooTeacher", reqData);
        this.state.loadingTeachers = false;
        this.allTeachers = data;
      } catch (error) {
        console.log(error);
        this.state.loadingTeachers = false;
      }
    },
    updateTeacherData(params) {
      const { data, done } = params;
      const searchedItem = this.allTeachers.filter(
        (item) => item.id == data.id
      );
      this.$set(this.allTeachers, this.allTeachers.indexOf(searchedItem), data);
      done();
    },
    refresh() {
      if (this.state.loadingTeachers) return;
      this.fetchTeachers();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>