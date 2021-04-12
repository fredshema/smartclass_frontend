<template>
  <section id="mentor-page">
    <mentor-nav />
    <main id="mentor-main-content" class="p-3">
      <transition name="component-fade" id="mentor-screen">
        <router-view />
      </transition>
    </main>
  </section>
</template>

<script>
import mentorNav from "./components/mentor-nav/mentor-nav.vue";
export default {
  components: { mentorNav },
  name: "mentor-view",
};
</script>

<style lang="scss" scoped>
#mentor-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#mentor-main-content {
  flex: 1 1 0%;
  overflow: auto;
  min-width: 200px;
  display: flex;
  flex-flow: column;
}
#mentor-screen {
  // min-height: 100vh;
  position: relative;
}
</style>