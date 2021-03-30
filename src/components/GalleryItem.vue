<template>
  <div class="square">
    <img v-if="image.location" :src="image.location" alt="" />
  </div>
</template>

<script>
export default {
  name: "gallery-item-component",
  props: {
    image: Object,
  },
};
</script>

<style lang="scss" scoped>
.square {
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;

  img {
    position: absolute;
    max-width: 100%;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    border-radius: 3px;
  }
}
</style>