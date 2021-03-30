<template>
  <b-table small responsive striped :fields="fields" :items="shownData">
    <template #cell(NO)="data">
      <p class="mb-0 px-2">{{ data.index + 1 }}</p>
    </template>
    <template #cell(Action)="data">
    <b-button variant="primary" :to="`/admin/resources/quiz/${data.item.id}`"  size="sm" class="text-light mx-2 "> 
    View
     </b-button>
    </template>
    <template #cell(title)="data">
      {{ data.value }}
    </template>
  </b-table>
</template>

<script>
export default {
  name: "admin-quizes-table",
  props: ["quizes-data"],
  data() {
    return {
      fields: [
        "NO",
        {
          key: "title",
          label: "Title",
          sortable: true,
          tdClass: "truncate-holder pr-3",
        },
        {
          key: "subject",
          label: "Subject",
          sortable: false,
        },
        {
          key: "Date",
          label: "Date",
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        "Action",
      ],
      state: {
        loadings: {},
      },
    };
  },
  computed: {
    shownData() {
      return this.quizesData;
    },
  },
};
</script>

<style lang="scss" >
.truncate-holder {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 0;
  text-overflow: ellipsis;
}
</style>