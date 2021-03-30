<template>
  <div id="teacher-container">
    <teacher-nav-bar />

    <main id="teacher-main-content" class="p-3">
      <transition name="component-fade" id="teacher-screen">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import { teacherNavBar } from "./shared/index";
export default {
  name: "teacher-page",
  components: { teacherNavBar },
  data() {
    return {};
  },
  mounted() {
    this.$title("Teacher");
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#teacher-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#teacher-content {
  display: flex;
  flex: 1;
  height: 100%;
  max-height: calc(100vh - 76px);
}
#teacher-sidebar {
  width: 0;
  max-width: 265px;
  overflow: hidden;
  display: flex;
  transition: 200ms linear;

  &.active {
    width: 265px;
  }
}
#teacher-main-content {
  flex: 1 1 0%;
  overflow: auto;
  min-width: 200px;
  display: flex;
  flex-flow: column;
}
#teacher-screen {
  // min-height: 100vh;
  position: relative;
}
@media (max-width: 670px) {
  #teacher-sidebar.active {
    width: 0;
  }
}
</style>