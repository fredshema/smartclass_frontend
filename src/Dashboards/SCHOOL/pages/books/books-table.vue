<template>
  <b-table small responsive striped :fields="fields" :items="shownData">
    <template #cell(NO)="data">
      <p class="mb-0 px-2">{{ data.index + 1 }}</p>
    </template>
    <template #cell(title)="data">
      {{ data.value }}
    </template>
    <template #cell(file)="data">
      <div>
        <b-button
          size="sm"
          variant="dark"
          class="px-3"
          v-b-modal="'book-' + data.item.id"
        >
          Preview
        </b-button>
        <b-modal
          :id="'book-' + data.item.id"
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
            <p class="small m-0">{{ data.item.title }}</p>
          </template>
          <iframe
            :src="`https://docs.google.com/gview?url=${data.value}&embedded=true`"
            frameborder="0"
            width="100%"
            height="100%"
            style="min-height: 80vh"
          >
          </iframe>
        </b-modal>
      </div>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "admin-books-table",
  props: ["books-data"],
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
        {
          key: "file",
          label: "File",
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
      ],
      state: {
        loadings: {},
      },
    };
  },
  computed: {
    shownData() {
      return this.booksData;
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