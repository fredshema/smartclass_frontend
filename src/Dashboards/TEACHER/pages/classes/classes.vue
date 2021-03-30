<template>
  <div>
    <b-row no-gutters>
      <header class="text-center w-100">
        <h1 class="display-4 mb-2">My Classes</h1>
        <h6 class="mb-0">Give help on any class.</h6>
      </header>
    </b-row>
    <b-row
      no-gutters
      align-h="center"
      align-v="center"
      v-if="state.loading"
      class="flex-column pt-5"
    >
      <div>
        <AppLoading type="dark" />
      </div>
      <p class="mt-3">Loading classes</p>
    </b-row>
    <div v-else-if="classes" class="px-3" no-gutters align-h="center">
      <b-row>
        <b-col  @click="toClassDetails(i)" cols="auto" class="pb-4" v-for="i in 6" :key="i">
          <b-row no-gutters class="class flex-column">
            <b-col cols="12" class="icon">
              <legend>S{{ i }}</legend>
            </b-col>

            <b-col cols="12" class="content px-3 pt-3 pb-2">
              <div class="name h5 mt-1 mb-4 text-center">
                {{ user.subjectName || "" }} S{{ i }}
              </div>
              <b-row no-gutters align-h="center" class="buttons">
                <b-button
                  variant="dark"
                  size="sm"
                  pill
                  class="px-4"
                >
                  Open
                </b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <b-row
      v-else
      no-gutters
      align-h="center"
      align-v="center"
      class="flex-column pt-5"
    >
      <h6 class="mt-3">You have no classes at the moment!</h6>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "teacher-class-page",
  data() {
    return {
      state: { loading: false },
      classes: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.teacher.data;
    },
  },
  mounted() {
    this.$title("Classes");
    this.fetchClasses();
  },
  methods: {
    fetchClasses() {
      this.state.loading = true;
      this.axios
        .post("/getcourse", { action: "getclass" })
        .then((res) => {
          this.classes = res.data;
          this.$store.dispatch("teacher/setClassesData", res.data);
          this.state.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
        });
    },
    toClassDetails(num) {
      const classroom = this.classes.filter((item) => item.name == `S${num}`);
      if (classroom.length < 1) return;
      this.$router.push(`/teacher/class/${classroom[0].id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.class {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  background: #0000000d;
  padding: 0.4rem;
  cursor: pointer;
  transition: 200ms linear;
  min-width: 175px;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  .icon {
    border-radius: inherit;
    background: var(--primary);
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    legend {
      margin: 0;
      text-align: center;
      font-size: 2.25rem;
      text-transform: uppercase;
      font-weight: 500;
    }
  }
}
header {
  background: #0000000d;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  margin-bottom: 2rem;
  border-radius: 5px;
}
</style>