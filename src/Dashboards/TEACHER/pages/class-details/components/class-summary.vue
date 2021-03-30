<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button
        variant="dark"
        class="mx-1"
        @click="$bvModal.show('teacher-add-summary-modal')"
        v-if="hasNoSchool"
      >
        Add Summary
      </b-button>
      <b-button variant="dark" class="ml-1" @click="fetchSummaries">
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
      <p class="text-center mt-3">Loading summaries</p>
    </b-row>
    <b-list-group v-else-if="summaries.length > 0">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(summary, i) in summaries"
        :key="i"
      >
        <b-col class="summary"> {{ summary.title }} </b-col>
        <b-col cols="auto" class="d-flex flex-nowrap align-items-end">
          <b-button
            size="sm"
            variant="dark"
            class="px-3 mx-1"
            v-b-modal="'summary-' + i"
          >
            Read
          </b-button>
          <b-button
            v-if="hasNoSchool"
            size="sm"
            variant="danger"
            class="ml-1"
            @click="deleteItem(summary)"
            ><b-icon-trash-fill
          /></b-button>
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
    <add-summary @summary-added="fetchSummaries" :classID="classID" />
  </section>
</template>

<script>
import addSummary from "./add-summary.vue";
export default {
  components: { addSummary },
  name: "course-summary-tab",
  data() {
    return {
      summaries: [],
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
    hasNoSchool() {
      return !this.user.school;
    },
  },
  beforeMount() {
    this.fetchSummaries();
  },
  methods: {
    fetchSummaries() {
      this.state.loading = true;
      const reqData = {
        action: "getSummaries",
        subjectName: this.user.subjectName,
        userId: this.user.user_id,
        userType: "teacher",
        level: this.classID,
      };

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
    deleteItem(item) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete "${item.title}".`,
          {
            title: "Please Confirm",
            size: "md",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES, delete",
            cancelTitle: "Cancel",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then(async (value) => {
          if (value) {
            this.$bvToast.show("delete-summary-toast");
            const reqData = {
              action: "deleteSummaries",
              summaryId: item.id,
            };
            try {
              const { data } = await this.axios.post("deleteElements", reqData);
              this.$bvToast.hide("delete-summary-toast");
              this.fetchSummaries();
              console.log(data);
              this.$notify({
                title: "SUCCESS",
                message: data.message || "File deleted successfully",
                status: "success",
              });
            } catch (error) {
              this.$bvToast.hide("delete-summary-toast");
              console.log(error);
              this.$notify({
                title: "ERROR!",
                message: error.errorMessage || "Failed to delete file.",
                status: "danger",
              });
            }
          }
        })
        .catch((err) => {
          // An error occurred
          console.log(err);
          this.$notify({
            title: "ERROR!",
            message: "Oops, an error occured.",
            status: "danger",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>