<template>
  <b-container fluid>
    <b-row>
      <b-table
        small
        responsive
        striped
        :fields="fields"
        :items="shownData"
        show-empty
      >
        <template #empty>
          <h6 class="p-5 text-center">No Students available at the moment!</h6>
        </template>
        <template #cell(NO)="data">
          <p class="mb-0 px-2">{{ data.index + 1 }}</p>
        </template>
        <template #cell(names)="data">
          {{ data.item.firstname }} {{ data.item["last name"] }}
        </template>
        <template #cell(suspend)="data">
          <loading-button
            pill
            size="sm"
            class="px-3 small"
            @click="studentAction(data)"
            :variant="
              data.value == 'active' ? 'outline-danger' : 'outline-success'
            "
            :loading="state.loadings[data.item.id]"
            loading-type="dark"
            loading-bg="light"
          >
            {{ data.value == "active" ? "Suspend" : "Activate" }}
          </loading-button>
        </template>
      </b-table>
    </b-row>
    <b-row align-h="center" align-v="center">
      <b-pagination-nav
        v-if="totalPages > 0"
        :link-gen="linkGen"
        :number-of-pages="totalPages"
        use-router
      ></b-pagination-nav>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "admin-students-table",
  props: ["students-data", "total-pages"],
  data() {
    return {
      fields: [
        "NO",
        {
          key: "names",
          label: "Names",
          sortable: true,
        },
        {
          key: "major",
          label: "Major",
          sortable: false,
        },
        {
          key: "suspend",
          label: "Action",
          sortable: false,
          tdClass: "d-flex justify-content-center",
          thClass: "d-flex justify-content-center",
        },
      ],
      state: {
        loadings: {},
      },
    };
  },
  computed: {
    shownData() {
      return this.studentsData;
    },
  },
  methods: {
    async studentAction(param) {
      const { item } = param;
      const done = () => this.$set(this.state.loadings, item.id, false);
      this.$set(this.state.loadings, item.id, true);
      try {
        const action =
          item.suspend == "active" ? "StudentSuspend" : "StudentApprove";
        const reqData = {
          action,
          StudentId: item.id,
        };
        const { data } = await this.axios.post("getStudents", reqData);
        const editedData = item;
        editedData.suspend =
          editedData.suspend == "active" ? "inactive" : "active";
        this.$emit("data-edited", { data: editedData, done });
      } catch (error) {
        console.log(error);
        done();
      }
    },
    linkGen(pageNum) {
      return { path: `/school/students/${pageNum}` };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>