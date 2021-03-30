<template>
  <section class="w-100">
    <b-row no-gutters></b-row>
    <b-row
      no-gutters
      v-if="state.loading"
      align-h="center"
      class="py-5 flex-column"
    >
      <AppLoading type="dark" />
      <p class="text-center mt-3">Loading summaries</p>
    </b-row>
    <b-list-group v-else-if="summaries">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(summary, i) in summaries"
        :key="i"
      >
        <b-col class="book"> {{ summary.title }} </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            variant="dark"
            v-b-modal="'summary-' + i"
            class="px-3"
          >
            Read
          </b-button>
        </b-col>
        <b-modal
          :id="'summary-' + i"
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
            <p class="small m-0">{{ summary.title }}</p>
          </template>
          <iframe
            :src="`https://docs.google.com/gview?url=${summary.file}&embedded=true`"
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
      No summaries available at the moment, try again later!
    </b-row>
  </section>
</template>

<script>
export default {
  name: "course-summary-tab",
  data() {
    return {
      summaries: null,
      state: { loading: false },
    };
  },
  computed: {
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
    courseID() {
      return this.$route.params.courseID;
    },
    courseUnit() {
      return this.$parent.selectedUnit;
    },
  },
  beforeMount() {
    if (!Array.isArray(this.summaries)) this.fetchSummaries();
    else this.state.loading = false;
  },
  methods: {
    fetchSummaries() {
      this.state.loading = true;
      const reqData = {
        action: "getSummaries",
        subjectName: this.courseID,
        userId: this.userID,
        userType: "student",
      };
      if (this.courseUnit) {
        reqData.unit = this.courseUnit.UnitId;
      }
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res.data);
          if (res.data && res.data.length && res.data.length > 0) {
            this.summaries = res.data;
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