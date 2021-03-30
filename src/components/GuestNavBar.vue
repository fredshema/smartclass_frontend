<template>
  <b-navbar
    toggleable="lg"
    :type="darken ? 'light' : 'dark'"
    variant="faded"
    class="guest-navbar w-100"
    :class="darken ? 'light' : 'faded'"
  >
    <b-navbar-brand tag="div" class="ml-md-4 ml-3">
      <img :src="logo" class="logo" alt="Smartclass Logo" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto align-items-lg-center" align="center" fill>
        <b-nav-item link-classes="text-white"
          ><a v-smooth-scroll href="#hero">Home</a></b-nav-item
        >
        <b-nav-item link-classes="text-white" v-smooth-scroll href="#about"
          >About Us</b-nav-item
        >
        <b-nav-item link-classes="text-white"
          ><a v-smooth-scroll href="#services">Services</a></b-nav-item
        >
        <b-nav-item link-classes="text-white"
          ><a v-smooth-scroll href="#portfolio">Gallery</a></b-nav-item
        >
        <b-nav-item link-classes="text-white"
          ><a v-smooth-scroll href="#team">Team</a></b-nav-item
        >
        <b-nav-item link-classes="text-white">News</b-nav-item>
        <b-nav-item link-classes="text-white" to="/login">Login</b-nav-item>
        <b-nav-item link-classes="text-white">Tutorials</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import logo from "../assets/img/smart_class_logo.png";
export default {
  name: "guest-nav-bar",
  data() {
    return {
      logo,
      dark: false,
      handleScroll: (e) => {
        window.scrollY <= 500
          ? this.$set(this, "dark", false)
          : this.$set(this, "dark", true);
      },
    };
  },
  computed: {
    darken() {
      return this.dark;
    },
  },
  mounted() {
    addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
.guest-navbar {
  top: 0;
  left: 0;
  z-index: 999;
  transition: 0.25s ease-in;

  &.light {
    position: sticky !important;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    background-color: rgba(52, 59, 64, 0.9);

    .nav-link {
      font-size: 1rem;
    }
  }

  &.faded {
    position: fixed !important;
    animation: nav 0.25s;
    .nav-link {
      color: white;
      font-size: 1rem;
    }

    #nav-collapse.collapsing,
    #nav-collapse.show {
      backdrop-filter: blur(10px);
      box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    }
  }

  .navbar-brand {
    height: 3.75rem;

    .logo {
      height: 100%;
    }
  }
}
@keyframes nav {
  0% {
    top: -80px;
  }
  100% {
    top: 0;
  }
}
</style>