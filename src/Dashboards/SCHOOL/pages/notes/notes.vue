<template>
  <b-container class="school-notes p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">School Notes</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="openModal"
          variant="dark"
          class="mx-1"
          :disabled="state.loadingNotes"
        >
          Add Note
        </b-button>
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingNotes"
        >
          Refresh
        </b-button>
      </b-col>
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
          v-if="state.loadingNotes"
          class="p-4 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading school notes</h6>
        </div>
        <notes-table
          :notes-data="allNotes"
          @data-changed="fetchNotes"
          v-else-if="notesAvailable"
        />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">
            No school notes available at the moment!
          </h6>
        </b-row>
      </transition>
    </b-row>
    <add-notes @file-uploaded="fetchNotes" />
  </b-container>
</template>

<script>
import notesTable from "./notes-table.vue";
import AddNotes from "./add-notes.vue";
export default {
  name: "school-notes",
  components: { notesTable, AddNotes },
  data() {
    return {
      allNotes: null,
      state: {
        loadingNotes: false,
        refreshing: false,
        totalPages: 0,
      },
    };
  },
  computed: {
    notesAvailable() {
      if (!this.allNotes) return false;
      if (this.allNotes.length && this.allNotes.length < 1) return false;
      return true;
    },
  },
  mounted() {
    this.fetchNotes();
  },
  beforeMount() {
    this.$title("Notes");
  },
  methods: {
    async fetchNotes() {
      this.state.loadingNotes = true;
      const reqData = { action: "schoolNotes" };
      this.$set(this, "allNotes", []);
      try {
        const { data } = await this.axios.post("schoolItems", reqData);
        this.state.loadingNotes = false;
        this.allNotes = data;
      } catch (error) {
        this.state.loadingNotes = false;
        if (!this.allNotes) this.allNotes = [];
        console.log(error);
      }
    },
    updateNoteData(params) {
      const { data, done } = params;
      const searchedItem = this.allNotes.filter((item) => item.id == data.id);
      this.$set(this.allNotes, this.allNotes.indexOf(searchedItem), data);
      done();
    },
    refresh() {
      if (this.state.loadingNotes) return;
      this.fetchNotes();
    },
    openModal() {
      this.$bvModal.show("add-notes-modal");
    },
    hideModal() {
      this.$bvModal.hide("add-notes-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>