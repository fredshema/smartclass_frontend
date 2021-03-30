<template>
  <b-container class="metrics p-5 announcements">
    <b-row no-gutters class="mb-1">
      <h4 class="font-weight-normal">Announcements</h4>
    </b-row>
    <hr class="mt-0 mb-4" />
    <b-row no-gutters align-h="end" class="mb-2">
      <b-button variant="outline-dark">Refresh</b-button>
    </b-row>

    <b-row no-gutters>
      <b-table
        responsive
        outlined
        hover
        :fields="fields"
        :items="announcements"
        head-variant="dark"
      >
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "admin-announcements",
  data() {
    return {
      fields: [
        {
          label: "Title",
          key: "title",
          sortable: true,
        },
        {
          label: "Level",
          key: "level",
          sortable: true,
        },
        {
          label: "Added Date",
          key: "addedDate",
        },
      ],
      announcements: [
        { title: "announce test", level: 1, addedDate: new Date() },
        { title: "announce test", level: 1, addedDate: new Date() },
      ],
    };
  },
};
</script>

<style>
</style>