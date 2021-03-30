<template>
  <section id="guest-home">
    <nav-bar />
    <section class="content w-100">
      <a name="hero">
        <HomeHero />
      </a>
      <homepage />
      <a name="about"><FewWords /></a>
      <a name="contact">
        <CallUs />
      </a>
      <Stats />
      <OurServices />
      <OurClients />
      <!-- <TeamSection /> -->
      <!-- <Gallery /> -->
      <!-- <OurLocation /> -->
    </section>
    <Footer />
  </section>
</template>

<script>
import NavBar from "../components/GuestNavBar.vue";
import Footer from "../components/GuestFooter.vue";
import OurServices from "../components/OurServices.vue";
import HomeHero from "../components/HomeHero.vue";
import Stats from "../components/webStatsView.vue";
import FewWords from "../components/fewWords.vue";
import CallUs from "../components/callUs.vue";
import OurClients from "../components/OurClients.vue";
import Gallery from "../components/Gallery.vue";
import OurLocation from "../components/location.vue";
export default {
  name: "guest-home",
  components: {
    NavBar,
    Footer,
    OurServices,
    HomeHero,
    Stats,
    FewWords,
    CallUs,
    OurClients,
    Gallery,
    OurLocation,
  },
  data() {
    return {};
  },
  mounted() {
    this.$title();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables";
#guest-home {
  min-height: 100vh;
  width: 100%;
}
.content {
  background: $white-accent;
}
</style>