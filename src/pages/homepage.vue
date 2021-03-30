<template>
  <div class="main">
    <!-- ======= Header ======= -->

    <b-navbar
      toggleable="lg"
      :type="darken ? 'light' : 'dark'"
      variant="faded"
      class="guest-navbar w-100"
      :class="darken ? 'light' : 'faded'"
    >
      <b-navbar-brand tag="div" class="ml-md-4 ml-3">
        <img
          :src="require('../assets/img/smart_class_logo.png')"
          class="logo"
          alt="Smartclass Logo"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto align-items-lg-center" align="center" fill>
          <b-nav-item>
            <a
              class="text-white text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              href="#hero"
              >Home</a
            >
          </b-nav-item>
          <b-nav-item>
            <a
              class="text-white text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              href="#about"
              >About Us</a
            >
          </b-nav-item>
          <b-nav-item>
            <a
              class="text-white text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              href="#services"
              >Services</a
            >
          </b-nav-item>
          <b-nav-item>
            <a
              class="text-white text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              href="#portfolio"
              >Gallery</a
            >
          </b-nav-item>
          <b-nav-item>
            <a
              class="text-white text-decoration-none"
              v-smooth-scroll="{ duration: 2500, offset: 0 }"
              href="#team"
              >Team</a
            >
          </b-nav-item>

          <b-nav-item link-classes="text-white" to="/blog">News</b-nav-item>
          <b-nav-item link-classes="text-white" to="/login">Login</b-nav-item>
          <b-nav-item link-classes="text-white">Tutorials</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- End Header -->

    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <SlideShow />
    </section>
    <!-- End Hero Section -->

    <main id="main">
      <!-- ======= About Section ======= -->
      <section id="services" v-once>
        <div class="container wow">
          <div class="section-header">
            <h3 class="section-title">Services</h3>
            <p class="section-description"></p>
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 wow fadeInUp"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div class="box">
                <div class="icon">
                  <a><i class="fa fa-desktop"></i></a>
                </div>
                <h4 class="title"><a>E-CLASSROOM</a></h4>
                <p class="description">
                  Your classmates are here,learn with us
                </p>
              </div>
            </div>
            <div
              class="col-lg-4 col-md-6 wow fadeInUp"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div class="box">
                <div class="icon">
                  <a><i class="fa fa-book"></i></a>
                </div>
                <h4 class="title"><a>LIBRARY</a></h4>
                <p class="description">The library for you!</p>
              </div>
            </div>
            <div
              class="col-lg-4 col-md-6 wow fadeInUp"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div class="box">
                <div class="icon">
                  <a><i class="fa fa-handshake"></i></a>
                </div>
                <h4 class="title"><a>E-MENTORSHIP</a></h4>
                <p class="description">
                  Don't miss mentorship while mentors are here!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Services Section -->
      <section
        data-aos="fade-up"
        data-aos-duration="50"
        id="facts"
        class="bg-light"
      >
        <div class="container wow fadeIn">
          <div class="section-header">
            <h3 class="section-title">Facts</h3>
            <p class="section-description"></p>
          </div>
          <div class="row counters">
            <div class="col-lg-3 col-6 text-center">
              <h4 data-toggle="counter-up" class="font-weight-bold h4">
                <span v-if="!factsScrolledTo">0</span>
                <number v-else ref="challenges" :to="50" />
              </h4>
              <p>Challenges</p>
            </div>

            <div class="col-lg-3 col-6 text-center">
              <h4 data-toggle="counter-up" class="font-weight-bold h4">
                <span v-if="!factsScrolledTo">0</span>
                <number ref="students" v-else :to="70" />
              </h4>
              <p>Students</p>
            </div>

            <div class="col-lg-3 col-6 text-center">
              <h4 data-toggle="counter-up" class="font-weight-bold h4">
                <span v-if="!factsScrolledTo">0</span>
                <number ref="teacher" v-else :to="120" />
              </h4>
              <p>Teachers</p>
            </div>

            <div class="col-lg-3 col-6 text-center">
              <h4 data-toggle="counter-up" class="font-weight-bold h4">
                <span v-if="!factsScrolledTo">0</span>
                <number ref="mentors" v-else :to="70" />
              </h4>
              <p>Mentors</p>
            </div>
          </div>
        </div>
      </section>
      <!-- ======= Call To Action Section ======= -->

      <section id="about" class="overflow-hidden" v-once>
        <div class="container">
          <div class="row about-container">
            <div class="col-lg-6 content order-lg-1 order-2">
              <h2 class="title">Few Words About Us</h2>
              <p data-aos="flip-up" data-aos-duration="700">
                Smart Class Rwanda, established in 2018, is a private company
                operating in Rwanda. It operates and manages www.smartclass.rw,
                an online learning platform which aims to connect all Rwandan
                high school students learning similar academic subjects and
                provide them with access to valuable learning materials and
                high-quality teachers. Thus helping students achieve academic
                excellence no matter their location or time of day.
              </p>

              <div class="icon-box" data-aos="fade-up" data-aos-duration="500">
                <div class="icon"><i class="fa fa-eye"></i></div>
                <h4 class="title"><a href="">Our vision</a></h4>
                <p class="description">
                  Bringing opportunity to attain excellent education, anytime
                  anywhere.
                </p>
              </div>

              <div class="icon-box" data-aos="fade-up" data-aos-duration="700">
                <div class="icon"><i class="fa fa-bullhorn"></i></div>
                <h4 class="title"><a href="">Our mission</a></h4>
                <p class="description">
                  Easy access to learning materials and collaboration among
                  students of the same class across the country,we believe in
                  team work.
                </p>
              </div>
            </div>

            <div
              class="col-lg-6 background order-lg-2 order-1"
              data-aos="fade-left"
              data-aos-duration="700"
            ></div>
          </div>
        </div>
      </section>

      <section id="call-to-action" v-once>
        <div class="container">
          <div class="row">
            <div class="col-lg-9 text-center text-lg-left">
              <h3 class="cta-title">Call us</h3>
              <p class="cta-text">call us to ask more about us</p>
            </div>
            <div class="col-lg-3 cta-btn-container text-center">
              <a class="cta-btn align-middle" href="tel:+250788202342"
                >Click to call</a
              >
            </div>
          </div>
        </div>
      </section>
      <!-- End About Section -->
      <section id="portfolio" data-aos="fade-up" data-aos-duration="1000">
        <HomeGallery />
      </section>
      <!-- End Portfolio Section -->

      <!-- ======= Team Section ======= -->
      <section id="team" class="p-0" data-aos="fade-up" data-aos-duration="700">
        <OurTeam />
      </section>
      <!-- End Team Section -->

      <!-- ======= Contact Section ======= -->
      <section
        id="contact"
        class="p-0"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <OurClients v-once />
      </section>
      <section data-aos="fade-up" data-aos-duration="500">
        <OurLocation v-once />
      </section>
      <!-- End Contact Section -->
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    <AppFooter />
    <!-- End Footer -->

    <a
      href="#"
      v-smooth-scroll="{ duration: 2500, offset: 0 }"
      class="back-to-top"
      ><i class="fa fa-chevron-up"></i
    ></a>

    <!-- Vendor JS Files -->
  </div>
</template>

<script>
// import "../assets/vendor/index";
import AppFooter from "../components/GuestFooter.vue";
import HomeGallery from "../components/Gallery.vue";
import OurClients from "../components/OurClients.vue";
import OurLocation from "../components/location.vue";
import OurTeam from "../components/OurTeam.vue";
import SlideShow from "@/components/homepage/SlideShow";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  offset: 200,
});
export default {
  name: "homepage",
  components: {
    SlideShow,
    AppFooter,
    HomeGallery,
    OurClients,
    OurLocation,
    OurTeam,
  },
  data() {
    return {
      dark: false,
      factsScrolledTo: false,
      handleScroll: (e) => {
        if (window.scrollY <= 100) {
          window.scrollTo(0, 0);
          this.$set(this, "dark", false);
        } else {
          this.$set(this, "dark", true);
        }
      },
    };
  },
  computed: {
    darken() {
      return this.dark;
    },
  },
  mounted() {
    this.$title("Welcome");
    addEventListener("scroll", this.handleScroll);
    document.addEventListener("aos:in", ({ detail }) => {
      if (detail.id === "facts") {
        this.factsScrolledTo = true;
      }
    });
  },
  beforeDestroy() {
    removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/vendor/style2.css";

.carousel-item {
  height: 100vh;
  min-height: 350px;
  top: 50%;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  background-size: cover;
  filter: brightness(0.5);
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  object-fit: cover;
  transform: translateX(-50%);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 100%;
  right: 0;
  background-color: rgba(30, 139, 195, 0.7);
  overflow: hidden;
  width: 0;
  height: 100%;
  transition: 0.5s ease;
}

.member:hover .overlay {
  width: 100%;
  left: 0;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  word-wrap: break-word;
}

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
      color: white;
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
