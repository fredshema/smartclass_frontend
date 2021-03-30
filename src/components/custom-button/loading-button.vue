<template>
  <b-button
    :variant="variant"
    class="position-relative"
    :type="type"
    :size="size"
    :disabled="btnDisabled"
    :pill="pill"
    @click="$emit('click')"
  >
    <slot />
    <transition name="component-fade">
      <div
        v-if="loading"
        :class="['bg-' + loadingBg]"
        class="loading-container flex-center absolute-container position-absolute"
      >
        <app-loading size="xs" :type="loadingType" />
      </div>
    </transition>
  </b-button>
</template>

<script>
export default {
  name: "loading-button-component",
  props: {
    disabled: {
      type: Boolean,
      default: null,
    },
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "secondary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    loadingType: {
      type: String,
      default: "light",
    },
    loadingClass: {
      type: String,
    },
    loadingBg: {
      type: String,
      default: "dark",
    },
    size: {
      type: String,
      default: "md",
    },
  },
  computed: {
    btnDisabled() {
      if (this.disabled !== null) return this.disabled;
      return this.loading;
    },
  },
};
</script>
<style lang="scss" scoped>
.loading-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
</style>