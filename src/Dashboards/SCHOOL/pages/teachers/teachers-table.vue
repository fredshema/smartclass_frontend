<template>
  <b-table small responsive striped :fields="fields" :items="shownData">
    <template #empty>
      <h6 class="p-5">No teachers available at the moment!</h6>
    </template>
    <template #cell(NO)="data">
      <p class="mb-0 px-2">{{ data.index + 1 }}</p>
    </template>
    <template #cell(names)="data">
      {{ data.item.firstname }} {{ data.item["last name"] }}
    </template>
    <template #cell(approved)="data">
      <loading-button
        pill
        size="sm"
        class="px-3 small"
        @click="teacherAction(data)"
        :variant="data.value == 1 ? 'outline-danger' : 'outline-success'"
        :loading="state.loadings[data.item.id]"
        loading-type="dark"
        loading-bg="light"
      >
        {{ data.value == 1 ? "Suspend" : "Activate" }}
      </loading-button>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "school-teacher-table",
  props: ["teachers-data"],
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
          key: "subject",
          label: "Subject",
          sortable: false,
        },
        {
          key: "approved",
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
      console.log(this.teachersData);
      return this.teachersData;
    },
  },
  methods: {
    async teacherAction(param) {
      const { item } = param;
      const done = () => this.$set(this.state.loadings, item.id, false);
      this.$set(this.state.loadings, item.id, true);
      try {
        const action =
          item.approved == 1 ? "TeacherSuspend" : "TeachersApprove";
        const reqData = {
          action,
          TeacherId: item.id,
        };
        const { data } = await this.axios.post("getTeachers", reqData);
        console.log(data);
        const editedData = item;
        editedData.approved = editedData.approved == "0" ? "1" : "0";
        this.$emit("data-edited", { data: editedData, done });
      } catch (error) {
        console.log(error);
        done();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>