<template>
  <div id="app">
    <AppNotifier />
    <toasts />
    <transition name="component-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AppNotifier from "./components/AppNotifier/AppNotifier.vue";
import Toasts from "./components/toasts.vue";
export default {
  name: "smartclass-app",
  components: { AppNotifier, Toasts },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
@import "./assets/styles/variables";
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  min-height: 100vh;
  width: 100%;
}
</style>
