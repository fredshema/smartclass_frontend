<template>
  <div>
    <b-row no-gutters>
      <header class="text-center w-100">
        <h1 class="display-4 mb-3">Chatrooms</h1>
        <h6 class="mb-0">Get help on any accademic challenge.</h6>
      </header>
    </b-row>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$title("chatroom");
  },
};
</script>

<style lang="scss" scoped>
header {
  background: #0000000d;
  height: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  border-radius: 5px;
}
</style>