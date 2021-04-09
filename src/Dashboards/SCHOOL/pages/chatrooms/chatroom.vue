<template>
  <b-container fluid class="school-chatroom pt-3">
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
              @click="refresh"
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
  name: "school-chatroom",
  components: { chatBox },
  data() {
    return {
      state: { loadingMessages: false, loadingLevels: false },
      levels: [],
      level: "",
      messages: [],
      totalPages: null,
      currentPage: 1,
    };
  },
  computed: {
    disableLevels() {
      if (this.state.loadingLevels) return true;
      if (this.levels.length < 1) return true;
      return false;
    },
    user() {
      return this.$store.state.school.data;
    },
  },
  watch: {
    level() {
      this.fetchMessages();
    },
  },
  beforeMount() {
    this.$title("chatroom");
    this.fetchLevels();
  },
  methods: {
    async fetchMessages() {
      if (!this.level) return;
      if (this.totalPages === null && this.currentPage != 1) return;
      this.state.loadingMessages = true;
      const reqData = {
        action: "getMessage",
        level: this.level.id,
        page: this.currentPage,
      };
      const { data } = await this.axios.post("chat", reqData);
      console.log(data);

      this.$set(this, "totalPages", data.number_of_page);
      const messageFormatter = (message) => {
        if (message.sentBy == this.user.userame) message.mine = true;
        else message.mine = false;
        return message;
      };
      this.state.loadingMessages = false;
      // this.messages = data.data.map(messageFormatter);
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
      } catch (error) {
        console.log(error);
      }
      this.state.loadingLevels = false;
    },
    refresh() {
      this.fetchLevels();
      this.fetchMessages();
    },
  },
};
</script>

<style lang="scss" scoped>
.school-chatroom {
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