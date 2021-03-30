<template>
  <section class="page-footer font-small pt-0 bg-dark">
    <b-container class="pt-5 mb-4 text-center text-md-left text-light">
      <b-row class="mt-3">
        <b-col sm="12" md="3" lg="3" class="mb-4">
          <h6 class="text-uppercase">
            <strong>LINKS</strong>
          </h6>
          <hr
            class="bg-primary mb-4 mt-0 d-inline-block mx-auto"
            style="width: 60px"
          />
          <p><a href="#hero">Home</a></p>
          <p><a href="#about">About Us</a></p>
          <p><a href="#contact">Contact Us</a></p>
        </b-col>
        <b-col sm="12" md="4" lg="5" class="mb-4">
          <h6 class="text-uppercase">
            <strong>Useful links</strong>
          </h6>
          <hr
            class="bg-primary mb-4 mt-0 d-inline-block mx-auto"
            style="width: 60px"
          />

          <p class="">Are you a teacher? <a href="#!">Partener with us.</a></p>
          <p>Want your school to be a part of us? <a href="#!">Register.</a></p>
          <p>
            Want to study anywhere online? <a href="#!">Become our Student.</a>
          </p>
        </b-col>
        <b-col sm="12" md="5" lg="4" xl="3" class="mb-4">
          <h6 class="text-uppercase">
            <strong>Contacts</strong>
          </h6>
          <hr
            class="bg-primary mb-4 mt-0 d-inline-block mx-auto"
            style="width: 60px"
          />
          <p><i class="fas fa-home mr-3"></i> example, address, 00</p>
          <p><i class="fas fa-envelope mr-3"></i> example@email.com</p>
          <p><i class="fas fa-phone mr-3"></i> +250 00000</p>
        </b-col>
      </b-row>
    </b-container>
    <common-footer />
  </section>
</template>

<script>
import CommonFooter from "./footers/common-footer.vue";
export default {
  name: "guest-footer",
  components: { CommonFooter },
};
</script>

<style>
</style>