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
      <p class="text-center mt-3">Loading Books</p>
    </b-row>
    <b-list-group v-else-if="books">
      <b-list-group-item
        class="d-flex align-items-center"
        v-for="(book, i) in books"
        :key="i"
      >
        <b-col class="book"> {{ book.title }} </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            variant="dark"
            class="px-3"
            v-b-modal="'book-' + i"
          >
            Read
          </b-button>
        </b-col>
        <b-modal
          :id="'book-' + i"
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
            <p class="small m-0">{{ book.title }}</p>
          </template>
          <iframe
            :src="`https://docs.google.com/gview?url=${book.file}&embedded=true`"
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
      No Books available at the moment, try again later!
    </b-row>
  </section>
</template>

<script>
export default {
  name: "course-books-tab",
  data() {
    return {
      books: null,
      state: { loading: true },
    };
  },
  computed: {
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
    courseID() {
      return this.$route.params.courseID;
    },
  },
  beforeMount() {
    if (!Array.isArray(this.books)) this.fetchBooks();
    else this.state.loading = false;
  },
  methods: {
    fetchBooks() {
      this.state.loading = true;
      const reqData = {
        action: "getBooks",
        subjectName: this.courseID,
        userId: this.userID,
        userType: "student",
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res.data);
          if (res.data && res.data.length && res.data.length > 0) {
            this.books = res.data;
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