<template>
  <section class="school d-flex flex-nowrap">
    <school-sidebar />
    <main class="d-flex flex-column w-100">
      <school-nav />
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </section>
</template>

<script>
import SchoolNav from "./components/school-nav/school-nav.vue";
import SchoolSidebar from "./components/school-sidebar/sidebar.vue";
export default {
  name: "school-view",
  components: {
    SchoolSidebar,
    SchoolNav,
  },
};
</script>

<style lang="scss" scoped>
.school {
  min-height: 100vh;
}
</style>