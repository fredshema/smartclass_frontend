<template>
  <div id="student-container">
    <header id="student-nav">
      <StudentNavBar
        :sidebarShown="state.sidebarShown"
        @toggle-sidebar="toggleSidebar"
      />
    </header>

    <div id="student-content">
      <!-- Sidebar -->
      <aside id="student-sidebar" :class="{ active: state.sidebarShown }">
        <student-sidebar />
      </aside>

      <!-- Main -->
      <main id="student-main-content">
        <transition name="component-fade" id="student-screen">
          <router-view />
        </transition>
        <!-- <AppFooter v-once /> -->
      </main>
    </div>
  </div>
</template>

<script>
import AppFooter from "../../components/footers/common-footer.vue";
import StudentSidebar from "./shared/student-sidebar/student-sidebar.vue";
import { StudentNavBar } from "./shared/index";
export default {
  name: "student-page",
  components: { AppFooter, StudentNavBar, StudentSidebar },
  data() {
    return {
      state: { sidebarShown: null },
    };
  },
  created() {
    this.checkWidth();
  },
  mounted() {
    addEventListener("resize", this.checkWidth);
  },
  methods: {
    checkWidth() {
      if (window.innerWidth <= 670) {
        this.state.sidebarShown = false;
      } else {
        this.state.sidebarShown = true;
      }
    },
    toggleSidebar() {
      this.state.sidebarShown = !this.state.sidebarShown;
    },
  },
};
</script>

<style lang="scss" scoped>
#student-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#student-content {
  display: flex;
  flex: 1;
  height: 100%;
  max-height: calc(100vh - 76px);
}
#student-sidebar {
  width: 0;
  max-width: 265px;
  overflow: hidden;
  display: flex;
  transition: 200ms linear;

  &.active {
    width: 265px;
  }
}
#student-main-content {
  flex: 1 1 0%;
  overflow: auto;
  min-width: 200px;
}
#student-screen {
  // min-height: 100vh;
  position: relative;
}
@media (max-width: 670px) {
  #student-sidebar.active {
    width: 0;
  }
}
</style>