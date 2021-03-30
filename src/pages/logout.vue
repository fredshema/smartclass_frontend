<template>
  <section id="logout">
    <AppLoading size="md" type="primary" />
  </section>
</template>

<script>
export default {
  name: "logout",
  mounted() {
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
      clearTimeout(timeout);
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
#logout {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>