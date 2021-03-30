<template>
  <b-col cols="12" id="challenge">
    <b-row no-gutters align-v="center">
      <b-col>
        <h6 class="mb-0" v-b-toggle:[collapseID]>
          {{ challenge.title }}
        </h6>
      </b-col>
      <b-col cols="auto">
        <b-button
          v-b-toggle:[collapseID]
          class="text-reset text-decoration-none no-outline"
          variant="link"
        >
          <b-icon-caret-down-square-fill />
        </b-button>
      </b-col>
    </b-row>
    <b-collapse :id="collapseID">
      <div class="border-top mb-4 mt-3"></div>
      <b-row no-gutters class="flex-column mb-3 pt-2">
        <h5>Question:</h5>
        <p v-html="challenge.content" />
      </b-row>
      <b-form class="mb-4">
        <h5 class="font-weight-normal">Answer:</h5>

        <custom-editor
          v-if="state.ready"
          v-model="answer"
          @ready="$emit('editor-ready')"
        />
        <b-row no-gutters align-h="end" class="mt-3">
          <b-button
            variant="primary"
            @click.once="submitAnswer"
            :disabled="disableSubmit"
            class="px-3"
          >
            <transition-group name="group-fade">
              <span key="loading" v-if="state.submiting">
                <AppLoading size="sm" />
              </span>
              <span key="text" v-else>Submit</span>
            </transition-group>
          </b-button>
        </b-row>
      </b-form>
      <b-row no-gutters align-h="end" class="mt-3">
        <b-button variant="dark" class="px-3" v-b-toggle:[collapseID]
          >close</b-button
        >
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import CustomEditor from "./custom-editor.vue";
export default {
  name: "individual-course-challenge-component",

  components: {
    CustomEditor,
  },
  props: {
    challenge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      collapseID: uuidv4(),
      state: { ready: false, submiting: false, loadingAnswers: false },
      answer: "",
      allAnswers: null,
    };
  },
  beforeMount() {
    const timeout = setTimeout(() => {
      this.$set(this.state, "ready", true);
      clearTimeout(timeout);
    }, 1);
  },
  computed: {
    teacherCollapseID() {
      return "teacher-answer" + this.collapseID;
    },
    studentCollapseID() {
      return "students-answer" + this.collapseID;
    },
    studentAnswers() {
      if (!this.allAnswers) return;
      return this.allAnswers.filter((answer) => {
        return Boolean(answer.studentAnswer);
      });
    },
    teacherAnswers() {
      if (!this.allAnswers) return;
      return this.allAnswers.filter((answer) => {
        return Boolean(answer.teacherAnswer);
      });
    },
    disableSubmit() {
      return !Boolean(this.answer);
    },
    user() {
      return this.$store.state.teacher.data;
    },
  },
  methods: {
    submitAnswer() {
      this.state.submiting = true;
      const reqData = {
        action: "addAnswer",
        userId: this.user.user_id,
        challengeId: this.challenge.id,
        comment: this.answer,
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res.data);
          this.$notify({
            title: "SUCCESS!",
            message: res.data.message,
            status: "success",
          });
          this.state.submiting = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.submiting = false;
        });
    },
    loadAnswers() {
      this.state.loadingAnswers = true;
      const reqData = {
        action: "getAnswers",
        challengeId: this.challenge.id,
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res.data);
          if (res.data && res.data.length && res.data.length > 0) {
            this.allAnswers = res.data;
          }
          this.state.loadingAnswers = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loadingAnswers = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#challenge {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}
button {
  svg {
    transition: 250ms linear;
  }
  &.not-collapsed svg {
    transform: rotate(180deg);
  }
  &.collapsed svg {
    transform: rotate(360deg);
  }
}
.reserved-space {
  height: 300px;
  width: 100%;
  border: 1px solid;
}
</style>