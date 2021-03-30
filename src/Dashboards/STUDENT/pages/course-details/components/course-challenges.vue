<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button
        variant="dark"
        class="mx-1"
        @click="$bvModal.show('student-add-challenges-modal')"
      >
        Add challenge
      </b-button>
      <b-button variant="dark" class="ml-1" @click="fetchChallenges">
        Refresh
      </b-button>
    </b-row>
    <b-row no-gutters align-h="center">
      <b-row no-gutters v-if="state.loading" class="loading flex-column py-5">
        <app-loading type="dark" />
        <p class="mt-3">Loading Challenges</p>
      </b-row>

      <div class="w-100" v-else-if="challenges.length > 0">
        <b-row
          no-gutters
          v-show="state.challengesReady"
          class="loading flex-column py-5"
        >
          <app-loading type="dark" />
          <p class="mt-3 text-center">preparing Challenges</p>
        </b-row>

        <CourseChallenge
          v-show="!state.challengesReady"
          v-for="(challenge, i) in challenges"
          :key="i"
          :challenge="challenge"
          @editor-ready="checkReadiness(i)"
        />
      </div>
      <div v-else class="py-5 px-2 flex-center">
        No challenges available at the moment.
      </div>
    </b-row>
    <add-challenge :classID="classID" @challenge-added="fetchChallenges" />
  </section>
</template>

<script>
import AddChallenge from "./add-challenge.vue";
import CourseChallenge from "./individual-challenge.vue";
export default {
  name: "course-challenge-tab",
  components: { CourseChallenge, AddChallenge },
  props: ["courseName", "unitsAvailable"],
  data() {
    return {
      challenges: [],
      state: { loading: true, fetching: false, challengesReady: true },
    };
  },
  computed: {
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
    selectedUnit() {
      return this.$parent.selectedUnit;
    },
    classID() {
      return this.$route.params.classID;
    },
  },
  watch: {
    unitsAvailable() {
      if (this.unitsAvailable) {
        if (this.selectedUnit) {
          this.fetchChallengesByUnits();
        } else {
          this.fetchChallenges();
        }
      }
    },
    selectedUnit() {
      if (this.unitsAvailable) {
        if (this.selectedUnit) {
          this.fetchChallengesByUnits();
        } else {
          this.fetchChallenges();
        }
      }
    },
  },
  mounted() {
    console.log(this.$store.state.student.studentData);
  },
  methods: {
    fetchChallenges() {
      if (this.state.fetching) return;
      this.state.loading = true;
      this.state.fetching = true;
      const reqData = {
        action: "getChallenges",
        userId: this.userID,
        userType: "student",
        subjectName: this.courseName,
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res.data);
          this.challenges = res.data;
          this.state.loading = false;
          this.state.fetching = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
          this.state.fetching = false;
        });
    },
    fetchChallengesByUnits() {
      if (this.state.fetching) return;
      this.state.fetching = true;
      this.state.loading = true;
      const reqData = {
        action: "getChallengesByUnit",
        userId: this.userID,
        userType: "student",
        subjectName: this.courseName,
        unit: this.selectedUnit.UnitId,
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res.data);
          this.challenges = res.data;
          this.state.loading = false;
          this.state.fetching = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
          this.state.fetching = false;
        });
    },
    checkReadiness(index) {
      if (!index) return;
      if (!this.challenges && this.challenges.length) return;
      if (index + 1 != this.challenges.length) return;
      this.state.challengesReady = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>