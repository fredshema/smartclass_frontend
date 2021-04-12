<template>
  <b-container>
    <b-row no-gutters class="py-3">
      <b-container fluid class="text-center bg-light py-5 br-5">
        <header class="h4 text-uppercase">All Chats</header>
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
    <b-row class="py-3">
      <b-container fluid v-if="state.loadingMessages">
        <b-row no-gutters align-h="center" align-v="start">
          <b-spinner />
          <p>Loading chats</p>
        </b-row>
      </b-container>
      <b-container fluid v-else-if="messagesAvailable">
        <router-link
          class="mb-3"
          v-for="(message, i) in allMessages"
          :key="i"
          tag="div"
          :to="`/mentor/message/${message.id}`"
        >
          <b-row
            no-gutters
            class="message bg-light br-5 px-4 py-3 cursor-pointer"
            align-v="center"
          >
            <b-col class="h5">
              <h5 class="mb-1">{{ message.sender }}</h5>
              <small>22 : 30</small>
            </b-col>
            <b-col cols="auto">
              <b-icon-arrow-right-circle-fill scale="1.3" />
            </b-col>
          </b-row>
        </router-link>
      </b-container>
      <b-container fluid v-else class="text-center bg-light py-5 br-5">
        <b-row no-gutters align-h="center" align-v="start">
          <h6>No chats available at the moment.</h6>
        </b-row>
      </b-container>
    </b-row>
  </b-container>
</template>

<script>
import message from "./message.vue";
export default {
  components: { message },
  name: "mentor-messages",
  data() {
    return {
      state: { loadingMessages: false },
      allMessages: [
        {
          sender: "Sender 1",
          id: 1,
        },
        {
          sender: "Sender 2",
          id: 2,
        },
        {
          sender: "Sender 3",
          id: 3,
        },
        {
          sender: "Sender 4",
          id: 4,
        },
      ],
    };
  },
  computed: {
    messagesAvailable() {
      if (!Array.isArray(this.allMessages)) return false;
      if (this.allMessages.length < 1) return false;
      return true;
    },
  },
  beforeMount() {
    this.$title("Chats");
    //   this.fetchMessages()
  },
  methods: {
    async fetchMessages() {
      this.state.loadingMessages = true;
      const reqData = {};
      try {
        const { data } = await this.axios.post("", reqData);
        console.log(data);
        if (Array.isArray(data)) {
          this.set(this, "allMessages", data);
        }
        this.state.loadingMessages = false;
      } catch (error) {
        console.log(error);
        this.state.loadingMessages = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.br-5 {
  border-radius: 5px;
}
.message {
  transition: 300ms all;
  &:hover {
    transform: translateX(10px);
  }
}
</style>