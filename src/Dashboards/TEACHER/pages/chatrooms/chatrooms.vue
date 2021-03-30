<template>
  <b-container fluid class="teacher-chatroom">
    <b-row no-gutters align-h="between" class="header p-3">
      <b-col>
        <header class="py-4">
          <h3 class="">Chatroom</h3>
        </header>
      </b-col>
      <b-col cols="auto" class="d-flex align-items-center">
        <b-form inline>
          <b-form-group class="mx-2">
            <b-form-select v-model="level" :disabled="disableLevels">
              <template #first>
                <b-form-select-option value="" disabled>
                  Select Level
                </b-form-select-option>
              </template>
              <b-form-select-option
                v-for="(item, i) in levels"
                :value="item"
                :key="i"
              >
                {{ item.title }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group class="ml-2">
            <b-button
              variant="dark"
              class="ml-1"
              @click="fetchMessages"
              :disabled="state.loadingMessages"
            >
              <b-spinner small variant="light" v-if="state.loadingMessages" />
              <div v-else>Refresh</div>
            </b-button>
          </b-form-group>
        </b-form>
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
  name: "teacher-chatroom",
  components: { chatBox },
  data() {
    return {
      state: { loadingMessages: false, loadingLevels: false },
      levels: [],
      level: "10",
      messages: [],
    };
  },
  computed: {
    disableLevels() {
      if (this.state.loadingLevels) return true;
      if (this.levels.length < 1) return true;
      return false;
    },
    user() {
      return this.$store.state.teacher.data;
    },
  },
  beforeMount() {
    this.$title("chatroom");
    this.fetchMessages();
    this.fetchLevels();
  },
  methods: {
    async fetchMessages() {
      this.state.loadingMessages = true;
      const reqData = { action: "getMessage", level: this.level, page: "1" };
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

    async fetchLevels() {
      this.state.loadingLevels = true;
      const reqData = { action: "getLevels" };
      try {
        const { data } = await this.axios.post("getElements", reqData);
        this.levels = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      this.state.loadingLevels = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-chatroom {
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