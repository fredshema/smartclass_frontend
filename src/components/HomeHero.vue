<template>
  <!-- hero -->
  <b-row
    class="hero position-relative no-select overflow-hidden pt-5"
    no-gutters
    align-content="center"
  >
    <img :src="image" alt="" class="position-absolute image1" />
    <b-col sm="12" md="8" lg="6" offset-lg="1" class="px-4 px-md-5 hero-title mt-5 pt-5">
      <h1 class="text-white mb-4">
        Get Access to Unlimited <br />
        Educational Resources <br />
        Everywhere, Everytime!
      </h1>
      <p class="text-light mb-5 font-weight-lighter" style="max-width: 400px">
        Premium access to more than 100 courses, challenges and quizes from our
        trusted instructors
      </p>

      <div class="buttons">
        <b-button
          variant="primary"
          size="lg"
          class="radius-30 text-white"
          to="/register"
          >Get Access
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import image from "../assets/img/home4.jpeg";
export default {
  name: "home-hero-component",
  data() {
    return { image };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";

.hero {
  height: 100vh;
  background: $primary;

  &-title {
    h1 {
      font-size: 1.55rem;
      line-height: 1.65;
      letter-spacing: 1.25px;
    }
    @media (min-width: 992px) {
      h1 {
        font-size: 2rem;
        letter-spacing: 1.75px;
      }
    }
  }
  img.image1 {
    top: 50%;
    left: 50%;
    min-height: 100%;
    min-width: 100%;
    background-size: cover;
    filter: brightness(0.5);
    background: $primary;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }
}
.buttons {
  margin: 3rem 0;
  button {
    font-size: 1.1rem;
    padding: 0.5rem 1.25rem;
  }
}
</style>