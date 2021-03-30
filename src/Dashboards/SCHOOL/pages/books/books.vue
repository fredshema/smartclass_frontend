<template>
  <b-container class="school-books p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <b-col cols="auto"><h2 class="mb-0">Books</h2></b-col>
      <b-col cols="auto">
        <b-button
          @click="refresh"
          variant="dark"
          class="ml-1"
          :disabled="state.loadingBooks"
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
          v-if="state.loadingBooks"
          class="py-5 w-100 flex-center flex-column"
        >
          <app-loading type="dark" />
          <h6 class="mt-3">Loading Books</h6>
        </div>
        <books-table :books-data="allBooks" v-else-if="booksAvailable" />
        <b-row no-gutters align-v="center" align-h="center" v-else>
          <h6 class="text-center py-5">No Books available at the moment!</h6>
        </b-row>
      </transition>
    </b-row>
  </b-container>
</template>

<script>
import booksTable from "./books-table.vue";
export default {
  name: "school-books",
  components: { booksTable },
  data() {
    return {
      allBooks: null,
      state: {
        loadingBooks: false,
      },
    };
  },
  computed: {
    booksAvailable() {
      if (!this.allBooks) return false;
      if (this.allBooks.length && this.allBooks.length < 1) return false;
      return true;
    },
  },
  mounted() {
    this.fetchBooks();
  },
  beforeMount() {
    this.$title("Books");
  },
  methods: {
    async fetchBooks() {
      this.state.loadingBooks = true;
      const reqData = { action: "getBooks" };
      try {
        const { data } = await this.axios.post("getItems", reqData);
        this.state.loadingBooks = false;
        this.allBooks = data;
        console.log(data);
      } catch (error) {
        this.state.loadingBooks = false;
        console.log(error);
      }
    },
    refresh() {
      if (this.state.loadingBooks) return;
      this.fetchBooks();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>