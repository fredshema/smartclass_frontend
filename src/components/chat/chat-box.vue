<template>
  <div id="chat">
    <div
      class="position-relative flex-grow-1 overflow-auto"
      ref="messages-window"
    >
      <div id="messages-window" class="p-4">
        <b-row no-gutters>
          <div class="font-weight-bold text-truncate">{{ message.sentBy }}</div>
        </b-row>
        <span
          v-bind:class="'message ' + (message.mine ? 'ours' : 'theirs')"
          v-for="(message, i) in messages"
          :key="i"
        >
          {{ message.massage }}
        </span>
      </div>
    </div>
    <b-form @submit.prevent="sendMessage" class="px-4 mt-2">
      <b-input-group>
        <b-form-input
          class="message-input bg-light px-4"
          v-model="message"
          trim
          required
          autofocus
          placeholder="Enter your message..."
          spellcheck
        />
        <b-input-group-append class="">
          <b-button
            class="send-input"
            variant="light"
            type="submit"
            ref="submitMessageBtn"
          >
            Send
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "chat-window",
  props: ["messages"],
  data() {
    return {
      message: "",
    };
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    sendMessage() {
      this.$emit("send-message", this.message);
      this.$nextTick(() => {
        this.scrollToBottom();
        this.$set(this, "message", "");
      });
    },
    scrollToBottom() {
      this.$refs["messages-window"].scrollTo({
        top: this.$refs["messages-window"].scrollHeight,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#chat {
  height: 100%;
  flex: 1 1 0%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  border-radius: 5px;
  padding: 1rem;
  background: #0000000d;
}

#messages-window {
  flex: 1 0 auto; // take up all the space, push input to the bottom
  display: flex;
  flex-direction: column; // stacked messages
  justify-content: flex-end; // from the bottom
  overflow: auto;
  align-items: flex-start; //align messages to the left by default
  position: absolute;
  height: auto;
  width: 100%;
}

.message {
  background: gray;
  color: white;
  padding: 8px 17px;
  margin-bottom: 8px;
  border-radius: 16px;
  max-width: 70%;
  min-width: 50px;
}

.ours {
  background: #0076ff;
  align-self: flex-end; //align right basically
}

.message-input {
  margin-right: 1rem;
  border: 0;
  box-shadow: 0px 4px 7px 2px #00000017;
  border-radius: 10px !important;
  height: 45px;
}
.send-input {
  height: 45px;
  box-shadow: 0px 4px 7px 2px #00000017;
  border-radius: 10px !important;
}
</style>