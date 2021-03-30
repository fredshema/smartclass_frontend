<template>
  <div id="app-splash" class="bg-light">
    <section class="flex-center flex-column">
      <img :src="logo" />
      <section class="splash-loading mt-3">
        <AppLoading type="primary" size="md" />
      </section>
    </section>
  </div>
</template>

<script>
import logo from "../assets/img/smart_class_logo.png";
export default {
  name: "app-splash",
  data() {
    return {
      logo,
    };
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
#app-splash {
  & > section {
    min-width: 100%;
    min-height: 100vh;

    img {
      width: 150px;
    }
  }
}
.splash-loading {
  width: 200px;
}
</style>