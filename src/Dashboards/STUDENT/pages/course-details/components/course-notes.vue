<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button variant="dark" class="ml-1" @click="fetchNotes">
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
      <p class="text-center mt-3">Loading Notes</p>
    </b-row>
    <b-list-group v-else-if="notes.length > 0">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(note, i) in notes"
        :key="i"
      >
        <b-col class="book"> {{ note.title }} </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            variant="dark"
            v-b-modal="'note-' + i"
            class="px-3"
          >
            Read
          </b-button>
        </b-col>
        <b-modal
          :id="'note-' + i"
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
            <p class="small m-0">{{ note.title }}</p>
          </template>
          <iframe
            :src="`https://docs.google.com/gview?url=${note.file}&embedded=true`"
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
      No Notes available at the moment, try again later!
    </b-row>
  </section>
</template>

<script>
export default {
  name: "course-note-tab",
  data() {
    return {
      notes: [],
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
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      this.state.loading = true;
      const reqData = {
        action: "schoolNotes",
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
            this.notes = res.data;
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