<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button variant="dark" class="ml-1" @click="fetchAssignments">
        Refresh
      </b-button>
    </b-row>
    <b-row
      no-gutters
      v-if="state.loading"
      align-h="center"
      class="py-5 flex-column"
    >
      <AppLoading type="dark" />
      <p class="text-center mt-3">Loading Assignments</p>
    </b-row>
    <b-list-group v-else-if="assignments.length > 0">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(assignment, i) in assignments"
        :key="i"
      >
        <b-col class="book"> {{ assignment.title }} </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            variant="dark"
            v-b-modal="'assignment-' + i"
            class="px-3"
            @click="submitAssignment(assignment)"
          >
            Submit
          </b-button>
        </b-col>
      </b-list-group-item>
    </b-list-group>
    <b-row no-gutters align-h="center" class="py-5" v-else>
      No Assignments available at the moment, try again later!
    </b-row>
    <submit-assignment
      @assignment-added="fetchAssignments"
      :classID="classID"
      :assignment="selectedAssignment"
    />
  </section>
</template>

<script>
import SubmitAssignment from "./submit-assignment.vue";
export default {
  components: { SubmitAssignment },
  name: "course-assignment-tab",
  data() {
    return {
      assignments: [],
      selectedAssignment: { title: "" },
      state: { loading: false },
    };
  },
  computed: {
    user() {
      return this.$store.state.student.studentData;
    },
    classID() {
      return this.$route.params.classID;
    },
  },
  beforeMount() {
    this.fetchAssignments();
  },
  methods: {
    fetchAssignments() {
      this.state.loading = true;
      const reqData = {
        action: "getAssignment",
        subjectName: this.classID,
        userId: this.user.user_id,
        userType: "student",
        level: this.user.level,
      };

      this.axios
        .post("getSchoolItems", reqData)
        .then((res) => {
          console.log(res.data);
          if (res.data && res.data.length && res.data.length > 0) {
            this.assignments = res.data;
          }
          this.state.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
        });
    },
    submitAssignment(assignment) {
      this.$set(this, "selectedAssignment", assignment);
      this.$bvModal.show("student-submit-assignments-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>