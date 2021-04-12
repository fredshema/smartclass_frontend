<template>
  <b-container>
    <b-row no-gutters class="py-3">
      <b-container fluid class="text-left bg-light py-3 br-5">
        <header class="h4 text-uppercase">Sender {{ messageId }}</header>
      </b-container>
    </b-row>
    <b-row no-gutters align-v="center" align-h="end" class="pt-3 pb-0">
      <b-button
        variant="dark"
        class="has-loading"
        :disabled="state.loadingMessages"
      >
        <b-container fluid v-show="state.loadingMessages">
          <b-spinner small></b-spinner>
        </b-container>
        <div>Refresh</div>
      </b-button>
    </b-row>
    <b-row no-gutters>
      <!-- <chat-box />  -->
    </b-row>
  </b-container>
</template>

<script>
import chatBox from "../../../../components/chat/chat-box.vue";
export default {
  components: { chatBox },
  data() {
    return {
      state: { loadingMessages: false },
    };
  },
  computed: {
    messageId() {
      return this.$route.params.MID;
    },
  },
};
</script>

<style lang="scss" scoped>
.br-5 {
  border-radius: 5px;
}
</style>