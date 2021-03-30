<template>
  <section class="w-100">
    <b-row no-gutters align-h="end" class="mb-3">
      <b-button
        variant="dark"
        class="mx-1"
        @click="$bvModal.show('teacher-add-notes-modal')"
      >
        Add Notes
      </b-button>
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
        <b-col class="note"> {{ note.title }} </b-col>
        <b-col cols="auto" class="d-flex flex-nowrap align-items-end">
          <b-button
            size="sm"
            variant="dark"
            class="px-3 mx-1"
            v-b-modal="'note-' + i"
          >
            Read
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            class="ml-1"
            @click="deleteItem(note)"
            ><b-icon-trash-fill
          /></b-button>
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
    <add-note @note-added="fetchNotes" :classID="classID" />
  </section>
</template>

<script>
import addNote from "./add-note.vue";
export default {
  components: { addNote },
  name: "course-note-tab",
  data() {
    return {
      notes: [],
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
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      this.state.loading = true;
      const reqData = {
        action: "schoolNotes",
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
            this.notes = res.data;
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
            this.$bvToast.show("delete-school-note-toast");
            const reqData = {
              action: "deleteSchoolNotes",
              schoolNotesId: item.id,
            };
            try {
              const { data } = await this.axios.post("deleteElements", reqData);
              this.$bvToast.hide("delete-school-note-toast");
              this.fetchNotes();
              console.log(data);
              this.$notify({
                title: "SUCCESS",
                message: data.message || "File deleted successfully",
                status: "success",
              });
            } catch (error) {
              this.$bvToast.hide("delete-school-note-toast");
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