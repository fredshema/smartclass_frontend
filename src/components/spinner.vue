<template>
  <section>
    <div class="spring-spinner">
      <div class="spring-spinner-part top">
        <div class="spring-spinner-rotator"></div>
      </div>
      <div class="spring-spinner-part bottom">
        <div class="spring-spinner-rotator"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
$spinner-width: 3rem;

.spring-spinner,
.spring-spinner * {
  box-sizing: border-box;
}

.spring-spinner {
  height: $spinner-width;
  width: $spinner-width;
}

.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: $spinner-width/2;
  width: $spinner-width;
}

.spring-spinner .spring-spinner-part.bottom {
  transform: rotate(180deg) scale(-1, 1);
}

.spring-spinner .spring-spinner-rotator {
  width: $spinner-width;
  height: $spinner-width;
  border: 2.5px solid transparent;
  border-right-color: $primary;
  border-top-color: $primary;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
  50% {
    transform: rotate(115deg);
  }
}
</style>