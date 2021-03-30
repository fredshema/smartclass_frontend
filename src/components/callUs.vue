<template>
  <b-row align-v="center" no-gutters class="px-3 py-5 px-md-5">
    <b-col class="d-flex align-items-center mb-4 mb-md-0">
      <img
        src="../assets/img/icons/phone-call.svg"
        alt=""
        class="mr-3 mr-md-4"
      />
      <h5 class="mb-md-0">
        Need to know more? <br />
        call us: +250788202342
      </h5>
    </b-col>
    <b-col cols="auto" class="m-auto m-md-0">
      <b-button class="radius-30" size="lg" variant="outline-dark">
        <a href="tel:+250788202342" class="text-reset"
          >click to call</a
        ></b-button
      >
    </b-col>
  </b-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
h5 {
  line-height: 1.5;
}
</style>