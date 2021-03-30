<template>
  <section class="admin d-flex flex-nowrap">
    <admin-sidebar />
    <main class="d-flex flex-column w-100">
      <admin-nav />
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </section>
</template>

<script>
import AdminNav from "./components/admin-nav/admin-nav.vue";
import AdminSidebar from "./components/admin-sidebar/sidebar.vue";
export default {
  name: "admin-view",
  components: {
    AdminSidebar,
    AdminNav,
  },
};
</script>

<style lang="scss" scoped>
.admin {
  min-height: 100vh;
}
</style>