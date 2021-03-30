<template>
  <notify-me
    container="__app_notification py-4 px-3"
    status="alert-success"
    close="bootstrap"
    :event-bus="bus"
  >
    <template #content="{ data }">
      <article class="w-100 text-left">
        <h5>
          <b>{{ data.title }}</b>
        </h5>
        <p class="m-0">{{ data.text }}</p>
      </article>
    </template>
  </notify-me>
</template>

<script>
import Notify from "vue-notify-me";

export default {
  components: {
    "notify-me": Notify,
  },
  data() {
    const bus = this.$bus;
    return {
      bus,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>