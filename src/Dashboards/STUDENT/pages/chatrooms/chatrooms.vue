<template>
  <b-container fluid class="student-chatroom pt-3">
    <b-row no-gutters align-h="center" class="header p-3">
      <b-col>
        <header class="py-4">
          <h3 class="text-center">Chatroom</h3>
        </header>
      </b-col>
    </b-row>
    <b-row no-gutters class="my-3 messages-holder">
      <chat-box :messages="messages" @send-message="sendMessage" />
    </b-row>
  </b-container>
</template>

<script>
import chatBox from "../../../../components/chat/chat-box.vue";
export default {
  name: "student-chatroom",
  components: { chatBox },
  data() {
    return {
      state: { loadingMessages: false, loadingLevels: false },
      messages: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.student.studentData;
    },
  },
  beforeMount() {
    this.$title("chatroom");
    this.fetchMessages();
    console.log(this.user);
  },
  methods: {
    async fetchMessages() {
      this.state.loadingMessages = true;
      const reqData = {
        action: "getMessage",
        level: this.user.level,
        page: "1",
      };
      const { data } = await this.axios.post("chat", reqData);
      const messageFormatter = (message) => {
        if (message.sentBy == this.user.userame) message.mine = true;
        else message.mine = false;
        return message;
      };
      this.state.loadingMessages = false;
      console.log(data, this.user);
      this.messages = data.data.map(messageFormatter);
    },
    async sendMessage(message) {
      this.messages.push({
        UserType: "student",
        id: "10131",
        massage: message,
        mine: true,
        sentBy: this.user.userame,
        time: "2021-03-25 12:01:28",
      });
      const reqData = {
        action: "InsertMessage",
        message: message,
        userId: this.user.user_id,
        level: this.level,
        type: this.user.user_type,
      };
      try {
        const { data } = await this.axios.post("chat", reqData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.student-chatroom {
  flex: 1 1 0%;
  display: flex;
  flex-flow: column;
}
.messages-holder {
  flex: 1 1 0%;
  display: flex;
  flex-flow: column;
}
.header {
  background: #0000000d;
  border-radius: 5px;
}
</style>