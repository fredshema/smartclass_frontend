<template>
  <section class="y-2">
    <b-row no-gutters></b-row>
    <b-row no-gutters>
      <CourseUnit v-for="i in 10" :key="i" :index="i" />
    </b-row>
  </section>
</template>

<script>
import CourseUnit from "./individual-unit.vue";
export default {
  name: "course-units-tab",
  components: { CourseUnit },
  data() {
    return {};
  },
};
</script>

<style>
</style>