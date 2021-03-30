<template>
  <b-container class="admin-quizes p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">Quizes</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="openModal"
          variant="dark"
          class="mx-1"
          :disabled="state.loadingQuizes"
        >
          Add quiz
        </b-button>
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingQuizes"
        >
          Refresh
        </b-button>
      </b-col>
    </b-row>
    <hr class="mt-0 mb-0" />
    <b-row
      no-gutters
      v-if="!state.refreshing"
      align-h="center"
      align-v="center"
    >
      <transition name="group-fade" mode="out-in">
        <div
          v-if="state.loadingQuizes"
          class="py-5 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Quizes</h6>
        </div>
        <quizes-table :quizes-data="allQuizes" v-else-if="quizesAvailable" />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Quizes available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
    <add-quiz @quiz-added="fetchQuizes" />
  </b-container>
</template>

<script>
import AddQuiz from "./add-quiz.vue";
import quizesTable from "./quizes-table.vue";
export default {
  name: "admin-quizes",
  components: { quizesTable, AddQuiz },
  data() {
    return {
      state: {
        loadingQuizes: false,
      },
    };
  },
  computed: {
    quizesAvailable() {
      if (!this.allQuizes) return false;
      if (this.allQuizes.length && this.allQuizes.length < 1) return false;
      return true;
    },
    allQuizes() {
      return this.$store.state.admin.quizes;
    },
  },
  mounted() {
    this.fetchQuizes();
  },
  beforeMount() {
    this.$title("Quizes");
  },
  methods: {
    async fetchQuizes() {
      this.state.loadingQuizes = true;
      const reqData = { action: "getQuiz" };
      try {
        const { data } = await this.axios.post("getQuiz", reqData);
        this.state.loadingQuizes = false;
        this.$store.dispatch("admin/SET_ADMIN_QUIZ", data);
      } catch (error) {
        this.state.loadingQuizes = false;
        console.log(error);
      }
    },
    refresh() {
      if (this.state.loadingQuizes) return;
      this.fetchQuizes();
    },
    openModal() {
      this.$bvModal.show("admin-add-quiz-modal");
    },
    hideModal() {
      this.$bvModal.hide("admin-add-quiz-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>