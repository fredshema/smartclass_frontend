<template>
  <section class="blog">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="blog-navbar w-100"
      sticky
    >
      <b-navbar-brand tag="div" class="ml-md-4 ml-3">
        <img
          :src="require('../../assets/img/smart_class_logo.png')"
          class="logo"
          alt="Smartclass Logo"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto align-items-lg-center" align="center" fill>
          <b-nav-item>
            <router-link
              class="text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              to="/#hero"
              >Home
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              to="/#about"
              >About Us
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              to="/#services"
              >Services
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              to="/#portfolio"
              >Gallery
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              to="/#team"
              >Team
            </router-link>
          </b-nav-item>
          <b-nav-item
            to="/blog"
            link-classes="text-decoration-none text-primary"
          >
            News
          </b-nav-item>
          <b-nav-item
            to="/login"
            link-classes="text-decoration-none text-primary"
          >
            Login
          </b-nav-item>
          <b-nav-item link-classes="text-decoration-none text-primary">
            Tutorials
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main>
      <b-jumbotron
        fluid
        bg-variant="light"
        text-variant="dark"
        class="text-center blog-ribbon"
        header-level="4"
      >
        <template #header>SMART CLASS</template>
        <template #lead> Discover latest news on smart class blog! </template>
      </b-jumbotron>
      <div class="blog-content">
        <transition name="group-fade" mode="out-in">
          <div
            v-if="state.loadingBlogs"
            class="py-5 w-100 flex-center flex-column"
          >
            <app-loading type="dark" />
            <h6 class="mt-3">Loading Blogs</h6>
          </div>
          <blogs-grid :blogs-data="allBlogs" v-else-if="blogsAvailable" />
          <b-row no-gutters align-v="center" align-h="center" v-else>
            <h6 class="text-center py-5">
              No Blog Posts available at the moment! try again later
            </h6>
          </b-row>
        </transition>
      </div>
    </main>
    <app-footer />
  </section>
</template>

<script>
import AppFooter from "../../components/footers/common-footer.vue";
import BlogsGrid from "./blogs-grid.vue";
export default {
  name: "app-blog",
  components: { AppFooter, BlogsGrid },
  data() {
    return {
      allBlogs: null,
      state: {
        loadingBlogs: false,
      },
    };
  },
  computed: {
    blogsAvailable() {
      if (!this.allBlogs) return false;
      if (this.allBlogs.length && this.allBlogs.length < 1) return false;
      return true;
    },
  },

  beforeMount() {
    this.refreshBlogs();
    this.$title("News");
  },
  methods: {
    async fetchBlogs() {
      this.state.loadingBlogs = true;
      const reqData = { action: "getPosts" };
      try {
        const { data } = await this.axios.post("getPosts", reqData);
        this.state.loadingBlogs = false;
        this.$set(this, "allBlogs", data);
      } catch (error) {
        this.state.loadingBlogs = false;
        console.log(error);
      }
    },
    refreshBlogs() {
      if (this.state.loadingBlogs) return;
      this.fetchBlogs();
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  min-height: calc(100vh + 52px);
  display: flex;
  flex-direction: column;
  main {
    flex-grow: 1;
  }
}
.blog-navbar {
  top: 0;
  left: 0;
  z-index: 999;
  transition: 0.25s ease-in;

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
.blog-ribbon {
  min-height: 330px;
  display: flex;
  align-items: flex-end;
}
@media (max-width: 768px) {
  .blog {
    min-height: calc(100vh + 104px);
  }
  .blog-ribbon{
      align-items: center;
  }
}
@media (max-width: 576px) {
  .blog {
    min-height: calc(100vh + 124px);
  }
}
</style>