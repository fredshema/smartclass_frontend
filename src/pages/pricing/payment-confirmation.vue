<template>
  <section id="payment-confirm" class="bg-light pt-4">
    <div
      class="back-icon d-flex justify-content-start align-items-center w-100"
    >
      <a @click="$router.back()" class="flex-center cursor-pointer">
        <ArrowIcon class="mr-3" />
        <span>Back </span>
      </a>
    </div>
    <b-row align-h="center" align-v="center" class="flex-1" no-gutters>
      <b-col cols="10" sm="8" md="6" lg="5" xl="4">
        <transition-group name="group-fade">
          <div class="loading" key="loading" v-if="state.loading">
            <AppLoading size="md" type="primary" /><br />
            <p class="text-center h5">Loading...</p>
          </div>
          <div class="pending" key="pending" v-else-if="state.pending">
            <div class="icon"></div>
            <h1 class="text-primary">Be Patient</h1>
            <article>
              We are still processing your payment. please wait a moment and
              click refresh to check if we finished processing your payment.
            </article>
            <div class="buttons mt-4">
              <b-button pill variant="dark" class="px-4" @click="refresh"
                >Refresh</b-button
              >
            </div>
          </div>
          <div class="success" key="success" v-else-if="state.success">
            <div class="icon"></div>
            <h1 class="text-success">Congratulation</h1>
            <article>
              We successfully processed your payment, you can now continue to
              create your profile.
            </article>
            <div class="buttons">
              <b-button
                variant="dark"
                pill
                class="mt-4 px-3"
                :to="`/student/create-profile/${userID}`"
              >
                Create your profile
              </b-button>
            </div>
          </div>
          <div class="failed" key="failed" v-else-if="state.failed">
            <div class="icon"></div>
            <div class="content">
              <h1 class="text-danger">Sorry</h1>
              <article>
                We can't complete your payment at this time. your payment has
                failed. if this problem continues contact our customer support.
              </article>
              <div class="buttons">
                <b-button
                  pill
                  variant="dark"
                  :to="'/pricing/' + userID"
                  class="px-4 mt-4"
                  >Retry transaction</b-button
                >
              </div>
            </div>
          </div>
          <div class="pending" key="error" v-else-if="state.error">
            <div class="icon"></div>
            <h1 class="text-danger">ERROR!</h1>
            <article>
              Something went wrong. check your internet connection and click
              refresh!
            </article>
            <div class="buttons mt-4">
              <b-button pill variant="dark" class="px-4" @click="refresh"
                >Refresh</b-button
              >
            </div>
          </div>
        </transition-group>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import ArrowIcon from "../../assets/img/icons/arrow-left-icon.vue";
export default {
  name: "payment-confirm-page",
  components: { ArrowIcon },
  props: ["userID"],
  data() {
    return {
      state: {
        loading: true,
        modalShown: false,
        success: false,
        pending: true,
        failed: false,
        error: false,
      },
    };
  },

  mounted() {
    this.$title("Payment confirmation");
    this.refresh();
  },
  methods: {
    refresh() {
      if (!this.userID) return;
      const reqData = {
        action: "Checkpayment",
        userId: this.userID,
      };
      this.state.loading = true;
      this.resetState();
      this.axios
        .post("pay", reqData)
        .then((res) => {
          console.log(res.data);
          this.state.loading = false;
          if (res.data.status && res.data.status == "PENDING") {
            this.state.pending = true;
          } else if (res.data.status && res.data.status == "SUCCESS") {
            this.state.success = true;
          } else if (res.data.status && res.data.status == "FAILED") {
            this.state.failed = true;
          } else if (res.data.message.includes("there's no transaction yet")) {
            console.log(res.data);
            this.$router.push(`/pricing/${this.userID}`);
          } else {
            this.state.error = true;
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.state.loading = false;
          this.state.error = true;
        });
    },
    resetState() {
      this.state.success = false;
      this.state.pending = false;
      this.state.failed = false;
      this.state.error = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";
#payment-confirm {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.back-icon {
  top: 0;
  left: 0;
  padding: 1.5rem 1rem;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 1.75rem;
  }
}
</style>