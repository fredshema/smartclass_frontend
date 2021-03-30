<template>
  <div>
    <b-row no-gutters>
      <header class="text-center w-100">
        <h1 class="display-4 mb-3">My Courses</h1>
        <h6 class="mb-0">Get help on any accademic course.</h6>
      </header>
    </b-row>
    <b-row
      no-gutters
      align-h="center"
      align-v="center"
      v-if="state.loading"
      class="flex-column pt-5"
    >
      <AppLoading type="dark" />
      <p class="mt-3">Loading courses</p>
    </b-row>
    <div v-else-if="courses" class="px-3 grid" no-gutters align-h="center">
      <CourseItem v-for="(course, i) in courses" :key="i" :course="course" />
    </div>
    <b-row
      v-else
      no-gutters
      align-h="center"
      align-v="center"
      class="flex-column pt-5"
    >
      <h6 class="mt-3">You are not enrolled in any class at the moment!</h6>
    </b-row>
  </div>
</template>

<script>
import CourseItem from "./course-item.vue";

export default {
  name: "student-courses-page",
  components: { CourseItem },
  data() {
    return {
      courses: null,
      state: { loading: true },
    };
  },
  computed: {
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
  },
  mounted() {
    this.fetchData();
    this.$title("courses");
  },
  methods: {
    fetchData() {
      this.state.loading = true;
      const reqData = {
        action: "getCourses",
        userId: this.userID,
        type: "student",
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.courses = res.data;
          }
          this.state.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background: #0000000d;
  height: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  border-radius: 5px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  grid-gap: 1.25rem;
  padding-bottom: 16px;
}
</style>