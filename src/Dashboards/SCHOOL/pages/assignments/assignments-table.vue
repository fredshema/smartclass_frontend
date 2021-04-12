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
          <h6 class="p-5 text-center">
            No Assignments available at the moment!
          </h6>
        </template>
        <template #cell(NO)="data">
          <p class="mb-0 px-2">{{ data.index + 1 }}</p>
        </template>
        <template #cell(file)="data">
          <div class="d-flex flex-nowrap align-items-end">
            <b-button
              size="sm"
              variant="dark"
              class="px-2 mx-1"
              v-b-modal="'assignment-' + data.item.AssignmentId"
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
              :id="'assignment-' + data.item.AssignmentId"
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
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "school-assignments-table",
  props: ["assignments-data"],
  data() {
    return {
      fields: [
        "NO",
        {
          key: "title",
          label: "Title",
          sortable: true,
        },
        {
          key: "file",
          label: "Assignments",
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
      if(!Array.isArray(this.assignmentsData)) return []
      return this.assignmentsData;
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
            this.$bvToast.show("delete-assignment-toast");
            const reqData = {
              action: "deleteAssignments",
              AssignmentId: item.AssignmentId,
            };
            try {
              const { data } = await this.axios.post("deleteElements", reqData);
              this.$bvToast.hide("delete-assignment-toast");
              this.$emit("data-changed");
              console.log(data);
              this.$notify({
                title: "SUCCESS",
                message: data.message || "File deleted successfully",
                status: "success",
              });
            } catch (error) {
              this.$bvToast.hide("delete-assignment-toast");
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

<style lang="scss" scoped>
</style>