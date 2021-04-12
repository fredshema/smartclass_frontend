<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button variant="dark" class="ml-1" @click="fetchSubmittedAssignments">
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
      <p class="text-center mt-3">Loading Submitted Assignments</p>
    </b-row>
    <b-list-group v-else-if="submittedAssignments.length > 0">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(submittedAssignment, i) in submittedAssignments"
        :key="i"
      >
        <b-col class="book h5">
          <h5 class="mb-1 text-capitalize">{{ submittedAssignment.title }}</h5>
          <small>{{ submittedAssignment["submitted by"] }}</small>
        </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            variant="dark"
            v-b-modal="'submittedAssignment-' + i"
            class="px-3"
          >
            Read
          </b-button>
        </b-col>
        <b-modal
          :id="'submittedAssignment-' + i"
          no-close-on-backdrop
          no-close-on-esc
          no-stacking
          hide-footer
          size="xl"
          header-bg-variant="dark"
          header-text-variant="light"
          body-bg-variant="light"
          body-class="p-0"
          centered
          lazy
        >
          <template #modal-title>
            <h5 class="mb-1 text-capitalize">
              {{ submittedAssignment.title }}
            </h5>
            <small>{{ submittedAssignment["submitted by"] }}</small>
          </template>
          <iframe
            :src="`https://docs.google.com/gview?url=${submittedAssignment.file}&embedded=true`"
            frameborder="0"
            width="100%"
            height="100%"
            style="min-height: 80vh"
          >
          </iframe>
        </b-modal>
      </b-list-group-item>
    </b-list-group>
    <b-row no-gutters align-h="center" class="py-5" v-else>
      No Submitted Assignment available at the moment, try again later!
    </b-row>
  </section>
</template>

<script>
export default {
  name: "course-submittedAssignment-tab",
  data() {
    return {
      submittedAssignments: [],
      state: { loading: false },
    };
  },
  computed: {
    user() {
      return this.$store.state.teacher.data;
    },
    classID() {
      return this.$route.params.classID;
    },
  },
  beforeMount() {
    this.fetchSubmittedAssignments();
  },
  methods: {
    fetchSubmittedAssignments() {
      this.state.loading = true;
      const reqData = {
        action: "subAssignment",
        subjectName: this.user.subjectName,
        userId: this.user.user_id,
        userType: "teacher",
        level: this.classID,
      };

      this.axios
        .post("getSchoolItems", reqData)
        .then((res) => {
          console.log(res.data);
          if (res.data && res.data.length && res.data.length > 0) {
            this.submittedAssignments = res.data;
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
</style>