<template>
  <carousel :autoplay="true" :loop="true" :mouseDrag="true" :touchDrag="true" :perPage="1" :autoplayTimeout="5000"
            paginationActiveColor="#dd6b20" paginationPosition="bottom-overlay">
    <slide>
      <div
          :style="{backgroundImage:`linear-gradient(rgba(45, 55, 72,.6),rgba(45, 55, 72,.3)), url(${require('../../assets/img/home4.jpeg')})`}"
          class="single-slide">
        <div class="text-center px-8">
          <div class="slide-text">
            <h1 class="slide-text__title">Welcome to Smart class! </h1>
            <p class="slide-text__text"> Learn from anywhere, anytime</p>
          </div>
          <router-link class="btn btn-primary inline-block btn-readmore" to="/register">Join the community</router-link>
        </div>
      </div>
    </slide>
    <slide>
      <div
          :style="{backgroundImage:`linear-gradient(rgba(45, 55, 72,.6),rgba(45, 55, 72,.3)), url(${require('../../assets/img/home2.jpeg')})`}"
          class="single-slide">
        <div class="text-center px-8">
          <div class="slide-text">
            <h1 class="slide-text__title">Your teachers are here! </h1>
            <p class="slide-text__text"> Ask them your challenging question</p>
          </div>
          <router-link class="btn btn-primary inline-block btn-readmore" to="/register">Register now!</router-link>
        </div>
      </div>
    </slide>
    <slide>
      <div
          :style="{backgroundImage:`linear-gradient(rgba(45, 55, 72,.6),rgba(45, 55, 72,.3)), url(${require('../../assets/img/home.jpeg')})`}"
          class="single-slide">
        <div class="text-center px-8">
          <div class="slide-text">
            <h1 class="slide-text__title">Connect with your classmates! </h1>
            <p class="slide-text__text"> Collaboratively learn with your fellow students across the country!</p>
          </div>
          <router-link class="btn btn-primary inline-block btn-readmore" to="/register">Join today!</router-link>
        </div>
      </div>
    </slide>
  </carousel>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';

export default {
  name: "SlideShow",
  components: {
    Carousel,
    Slide
  }
}
</script>

<style lang="scss">
.VueCarousel-dot-container {
  margin-bottom: 2rem !important;
}

.single-slide {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: 50%;
  background-color: #a0aec0;
}

.text-center {
  text-align: center;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.btn-readmore {
  padding: .72rem 1.6rem !important;
  border-radius: 9999px !important;
  font-size: 1.05rem !important;
  text-transform: uppercase;
  font-weight: 600 !important;
  color: #ffffff !important;
  letter-spacing: 1px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);
}

.slide-text {
  margin-bottom: 3rem;

  &__title {
    letter-spacing: .05em;
    text-transform: uppercase;
    color: #e2e8f0;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 1.4rem;
    color: #e2e8f0;
    font-weight: 400;
  }
}

/* 1200px */
@media only screen and (max-width: 75em) {
  .px-8 {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
  .btn-readmore {
    padding: .5rem 1.3rem !important;
    font-size: 1rem !important;
  }
  .slide-text {
    margin-bottom: 2rem;

    &__title {
      font-size: 1.5rem;
      margin-bottom: .8rem;
    }

    &__text {
      font-size: 1.2rem;
    }
  }

}

/* 900px */
@media only screen and (max-width: 56.25em) {
  .px-8 {
    padding-left: .6rem;
    padding-right: .6rem;
  }
  .btn-readmore {
    padding: .3rem .8rem !important;
    font-size: .8rem !important;
  }
  .slide-text {
    margin-bottom: 1rem;

    &__title {
      font-size: 1rem !important;
      margin-bottom: .8rem;
    }

    &__text {
      font-size: .8rem;
    }
  }
}

</style>
