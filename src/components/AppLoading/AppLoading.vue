<template functional>
  <div
    class="loading-box"
    :class="'box-' + props.size + ' ' + 'box-' + props.type"
  >
    <div>
      <div class="loading-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-loading",
  props: {
    size: {
      type: String,
      default: "sm",
    },
    type: {
      type: String,
      default: "light",
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 56px !default;
$height: 56px !default;

.loading-box {
  position: relative;
  margin: auto;

  &.box {
    &-xs {
      width: 25px;
    }
    &-sm {
      width: 35px;
    }
    &-md {
      width: 50px;
    }
  }
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &.box-light {
    .loading-item {
      color: var(--light);
    }
  }
  &.box-primary {
    .loading-item {
      color: var(--primary);
    }
  }
}
.loading-item {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  line-height: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid;
  border-right-color: transparent;
  border-radius: 50%;
  animation: loader-rotate 1s linear infinite;
  margin: -28px auto 0 auto;
}
@keyframes loader-rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>