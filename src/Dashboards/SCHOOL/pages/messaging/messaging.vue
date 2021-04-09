<template>
  <b-container fluid class="school-chatroom pt-3">
    <b-row no-gutters align-h="between" class="header p-3">
      <b-col>
        <header class="py-4">
          <h3 class="">Messaging</h3>
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
      <b-col cols="auto" class="px-3 d-flex align-items-center">
        <b-button
          v-b-modal="'school-messaging-recipients-modal'"
          :disabled="!studentsAvailable"
        >
          Select Recipients
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters class="my-3 messages-holder">
      <chat-box :messages="messages" @send-message="sendMessage" />
    </b-row>

    <!-- select numbers modal -->
    <b-modal
      title="Choose Recipients"
      id="school-messaging-recipients-modal"
      scrollable
      @ok="handleOk"
    >
      <b-container fluid>
        <b-row no-gutters align-h="start" align-v="center">
          <b-col cols="auto" class="">
            <b-form>
              <b-form-group class="m-0">
                <b-form-checkbox
                  v-model="state.allSelected"
                  @change="toggleAll"
                >
                  {{ state.allSelected ? "Un-select All" : "Select All" }}
                </b-form-checkbox>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
        <b-row no-gutters class="mt-4">
          <b-form>
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-checkbox
                v-for="(opt, i) in allStudents"
                :key="i"
                :aria-describedby="ariaDescribedby"
                stacked
                :checked="selectedNumbers"
                @change="selectPhone(opt)"
                :value="opt.phone"
              >
                {{ opt.fname }} {{ opt.lname }}
              </b-form-checkbox>
            </b-form-group>
          </b-form>
        </b-row>
      </b-container>
    </b-modal>
    <!-- end of select numbers modal -->
  </b-container>
</template>

<script>
import chatBox from "../../../../components/chat/chat-box.vue";
export default {
  name: "school-chatroom",
  components: { chatBox },
  data() {
    return {
      state: {
        loadingMessages: false,
        loadingLevels: false,
        loadingStudents: false,
        allSelected: false,
      },
      levels: [],
      level: "10",
      messages: [],
      allStudents: [],
      selectedNumbers: [],
    };
  },
  computed: {
    disableLevels() {
      if (this.state.loadingLevels) return true;
      if (this.levels.length < 1) return true;
      return false;
    },
    studentsAvailable() {
      if (this.state.loadingStudents) return false;
      if (this.allStudents.length > 0) return true;
      console.log("hello");
      return false;
    },
    user() {
      return this.$store.state.school.data;
    },
  },
  beforeMount() {
    this.$title("chatroom");
    this.fetchMessages();
    this.fetchLevels();
    this.fetchStudents();
    console.log(this.user);
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
      if (this.selectedNumbers.length < 1) {
        this.$notify({
          title: "ERROR!",
          message: "Select at least one student.",
          status: "danger",
        });
        return;
      }
      this.messages.push({
        UserType: "student",
        id: "1",
        massage: message,
        mine: true,
        sentBy: this.user.userame,
        time: "2021-03-25 12:01:28",
      });
      const messageFormatter = (item) => {
        return { telephoneNumber: item, message };
      };
      const reqData = {
        action: "SendMessages",
        numbers: this.selectedNumbers.map(messageFormatter),
      };
      try {
        const { data } = await this.axios.post("messaging", reqData);
        console.log(data);
        this.$notify({
          title: "SUCCESS!",
          message: "Message sent.",
          status: "success",
        });
      } catch (error) {
        console.log(error);
        this.$notify({
          title: "ERROR!",
          message: "Failed to send message.",
          status: "danger",
        });
      }
    },
    async fetchStudents() {
      this.state.loadingStudents = true;
      const reqData = {
        action: "getStudents",
        school: "19",
        level: "8",
      };
      try {
        const { data } = await this.axios.post("messaging", reqData);
        const seen = new Set();
        const filteredData = data.filter((el) => {
          const duplicate = seen.has(el.phone);
          seen.add(el.phone);
          return !duplicate;
        });
        console.log(filteredData);
        this.$set(this, "allStudents", filteredData);
        this.state.loadingStudents = false;
      } catch (error) {
        this.state.loadingStudents = false;
        console.log(error);
      }
    },
    handleOk() {
      console.log(this.selectedNumbers);
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
    selectPhone(item) {
      if (!!this.isChecked(item)) {
        const removePhone = (i) => i.phone != item.phone;
        this.$set(
          this,
          "selectedNumbers",
          this.selectedNumbers.filter(removePhone)
        );
      } else {
        if (this.selectedNumbers.includes(item.phone)) return;
        this.selectedNumbers.push(item.phone);
      }
      this.state.allSelected = false;
    },
    isChecked(item) {
      return this.selectedNumbers.includes(item.phone);
    },
    toggleAll(checked) {
      this.selectedNumbers = checked
        ? this.allStudents.map((i) => i.phone)
        : [];
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