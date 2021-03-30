<template>
  <b-table small responsive striped :fields="fields" :items="shownData">
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
        @click="schoolAction(data)"
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
  name: "admin-schools-table",
  props: ["schools-data"],
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
          label: "School Name",
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
      return this.schoolsData;
    },
  },
  methods: {
    async schoolAction(param) {
      const { item } = param;
      const done = () => this.$set(this.state.loadings, item.id, false);
      this.$set(this.state.loadings, item.id, true);
      try {
        const action =
          item.approved == 1 ? "SchoolADSuspend" : "SchoolADApprove";
        const reqData = {
          action,
          SchoolADId: item.id,
        };
        const { data } = await this.axios.post("getSchoolAD", reqData);
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
<style lang="scss" >
.truncate-holder {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 0;
  text-overflow: ellipsis;
}
</style>