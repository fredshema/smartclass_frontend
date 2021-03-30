<template>
  <div class="bg-light py-5" no-gutters>
    <header class="h1 pb-4 text-center text-dark font-weight-bold">
      OUR CLIENTS
    </header>
    <b-container>
      <b-row no-gutters>
        <b-col cols="12" md="6" lg="3" class="flex-center">
          <article class="m-3">
            <img src="../assets/img/schools/school1.jpg" alt="" />
          </article>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="flex-center">
          <article class="m-3">
            <img class="w-100" src="../assets/img/schools/school2.png" alt="" />
          </article>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="flex-center">
          <article class="m-3">
            <img class="w-100" src="../assets/img/schools/school3.png" alt="" />
          </article>
        </b-col>
        <b-col cols="12" md="6" lg="3" class="flex-center">
          <article class="m-3">
            <img class="w-100" src="../assets/img/schools/school4.png" alt="" />
          </article>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
article {
  position: relative;
  width: 200px;
  height: 250px;
  overflow: hidden;
  padding: 2rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0px 2px 3px 2px #0000000d;

  img {
    position: absolute;
    max-width: 90%;
    max-height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: grayscale(1);
    object-fit: scale-down;
  }
}
</style>