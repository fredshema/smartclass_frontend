<template>
  <b-table small responsive striped :fields="fields" :items="shownData">
    <template #cell(NO)="data">
      <p class="mb-0 px-2">{{ data.index + 1 }}</p>
    </template>
    <template #cell(title)="data">
      {{ data.value }}
    </template>
    <template #cell(file)="data">
      <div class="d-flex flex-nowrap align-items-end">
        <b-button
          size="sm"
          variant="dark"
          class="px-2 mx-1"
          v-b-modal="'summary-' + data.item.id"
        >
          Preview
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          class="ml-1"
          @click="deleteItem(data.item)"
          ><b-icon-trash-fill
        /></b-button>
        <b-modal
          :id="'summary-' + data.item.id"
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
  name: "school-summaries-table",
  props: ["summaries-data"],
  data() {
    return {
      fields: [
        "NO",
        {
          key: "title",
          label: "Title",
          sortable: true,
          tdClass: "truncate-holder pr-4",
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
      return this.summariesData;
    },
  },
  methods: {
    deleteItem(item) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete "${item.title}".`,
          {
            title: "Please Confirm",
            size: "md",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES, delete",
            cancelTitle: "Cancel",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then(async (value) => {
          if (value) {
            this.$bvToast.show("delete-summary-toast");
            const reqData = {
              action: "deleteSummaries",
              summaryId: item.id,
            };
            try {
              const { data } = await this.axios.post("deleteElements", reqData);
              this.$bvToast.hide("delete-summary-toast");
              this.$emit("data-changed");
              console.log(data);
              this.$notify({
                title: "SUCCESS",
                message: data.message || "File deleted successfully",
                status: "success",
              });
            } catch (error) {
              this.$bvToast.hide("delete-summary-toast");
              console.log(error);
              this.$notify({
                title: "ERROR!",
                message: error.errorMessage || "Failed to delete file.",
                status: "danger",
              });
            }
          }
        })
        .catch((err) => {
          // An error occurred
          console.log(err);
          this.$notify({
            title: "ERROR!",
            message: "Oops, an error occured.",
            status: "danger",
          });
        });
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