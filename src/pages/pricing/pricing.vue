<template>
  <section id="pricing" class="bg-light pt-4">
    <div
      class="back-icon d-flex justify-content-start align-items-center w-100"
    >
      <router-link to="/" class="d-flex cursor-pointer">
        <ArrowIcon class="mr-3" />
        <span>Back Home</span>
      </router-link>
    </div>
    <header class="w-100 text-center h1 font-weight-light mt-3">
      Available Plans on smartclass
    </header>
    <b-row no-gutters align-h="center" align-v="start" class="flex-1 py-4 pt-5">

      <!-- TESTING PLAN -->
      <b-col cols="10" sm="5" md="5" lg="4">
        <b-card no-body class="pricing-box p-3 p-md-4 mx-auto my-3 mx-sm-3">
          <b-card-title class="text-center h3">TESTING</b-card-title>
          <b-card-sub-title class="text-center"
            >Billed every month.</b-card-sub-title
          >
          <b-card-text
            class="flex-1 d-flex align-items-center flex-column mt-4 pt-2 price"
          >
            <div>
              <span>RWF</span>
              <h1 class="mb-0">100<span>/month</span></h1>
              <span class="text-muted">up to {{ expirationDate1 }}</span>
            </div>
          </b-card-text>

          <div class="buttons flex-center">
            <b-button
              variant="primary"
              class="text-light"
              pill
              @click="showModal('100')"
            >
              select plan
            </b-button>
          </div>
        </b-card>
      </b-col>
      <!-- END OF TESTING PLAN -->

      <b-col cols="10" sm="5" md="5" lg="4">
        <b-card no-body class="pricing-box p-3 p-md-4 mx-auto my-3 mx-sm-3">
          <b-card-title class="text-center h3">BASIC</b-card-title>
          <b-card-sub-title class="text-center"
            >Billed every month.</b-card-sub-title
          >
          <b-card-text
            class="flex-1 d-flex align-items-center flex-column mt-4 pt-2 price"
          >
            <div>
              <span>RWF</span>
              <h1 class="mb-0">3,500<span>/month</span></h1>
              <span class="text-muted">up to {{ expirationDate1 }}</span>
            </div>
          </b-card-text>

          <div class="buttons flex-center">
            <b-button
              variant="primary"
              class="text-light"
              pill
              @click="showModal('3,500')"
            >
              select plan
            </b-button>
          </div>
        </b-card>
      </b-col>
      <b-col cols="10" sm="5" md="5" lg="4">
        <b-card no-body class="pricing-box p-3 p-md-4 mx-auto my-3 mx-sm-3">
          <b-card-title class="text-center h3">PREMIUM </b-card-title>
          <b-card-sub-title class="text-center"
            >Billed every 3 months.</b-card-sub-title
          >
          <b-card-text
            class="flex-1 d-flex align-items-center flex-column mt-4 pt-2 price"
          >
            <div>
              <span>RWF</span>
              <h2 class="mb-0">10,000<span>/3 months</span></h2>
              <span class="text-muted">up to {{ expirationDate3 }}</span>
            </div>
          </b-card-text>
          <div class="buttons flex-center">
            <b-button
              variant="primary"
              class="text-light"
              pill
              @click="showModal('10,000')"
            >
              select plan
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- modal -->
    <b-modal
      id="payment-modal"
      ref="payment-modal"
      scrollable
      hide-footer
      v-model="state.modalShown"
      @show="resetModal"
      @hidden="resetModal"
    >
      <template #modal-title>
        <h4 class="text-uppercase mb-0 flex-1 text-center">
          {{ paymentPlan }} PLAN PAYMENT
        </h4>
      </template>
      <b-form ref="payment-form" @submit.stop.prevent="pay" class="px-3 pb-2">
        <b-form-group label="Payment Method:" label-class="h4" class="my-2">
          <b-form-radio-group
            v-model="method"
            :disabled="state.loading"
            required
            :options="[
              { text: 'MTN Mobile Money', value: 'mtn' },
              { text: 'Tigo Cash', value: 'tigo' },
              { text: 'Airtel Money', value: 'airtel' },
            ]"
            name="radios-stacked"
            stacked
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group v-if="selectedPlan" class="mb-3">
          <b-row no-gutters align-v="end">
            <b-col cols="auto" class="mr-2 h6">Amount to pay:</b-col>
            <b-col class="h5"> {{ selectedPlan }} RWF</b-col>
          </b-row>
        </b-form-group>
        <b-form-group class="mt-2">
          <b-input-group>
            <div class="icon"><UserIcon /></div>
            <b-form-input v-model="name" trim required placeholder="Names" />
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <b-input-group>
            <b-input-group-prepend is-text class="bold"
              >+250 7{{ numberBycarrier }}</b-input-group-prepend
            >
            <b-input
              v-model="phone"
              number
              type="number"
              trim
              required
              placeholder="Phone number"
            />
          </b-input-group>
        </b-form-group>
        <div class="buttons d-flex justify-content-end mt-4">
          <b-button
            pill
            variant="primary"
            type="submit"
            class="text-white"
            :disabled="state.loading"
          >
            <transition-group name="group-fade">
              <span key="loading" v-if="state.loading">
                <AppLoading size="xs" />
              </span>
              <span key="text" v-else>Pay now</span>
            </transition-group>
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </section>
</template>

<script>
import ArrowIcon from "../../assets/img/icons/arrow-left-icon.vue";
import UserIcon from "../../assets/img/icons/user-icon.vue";
export default {
  name: "pricing-page",
  components: { ArrowIcon, UserIcon },
  props: ["userID"],
  data() {
    return {
      selectedPlan: null,
      name: null,
      phone: null,
      method: "mtn",
      state: { loading: false, modalShown: false },
    };
  },
  computed: {
    expirationDate1() {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      return today.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    expirationDate3() {
      const today = new Date();
      today.setMonth(today.getMonth() + 3);
      return today.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    numberBycarrier() {
      if (this.method == "mtn") return 8;
      else if (this.method == "tigo") return 2;
      else if (this.method == "airtel") return 3;
    },
    paymentPlan() {
      if (!this.selectedPlan) return;
      return this.selectedPlan == "3,500" ? "Basic" : "Premium";
    },
  },
  mounted() {
    this.$title("Pricing");
  },
  methods: {
    pay() {
      const reqData = {
        action: "StudentPay",
        userId: this.userID,
        phone: `07${this.numberBycarrier}${this.phone}`,
        amount: this.selectedPlan,
        names: this.name,
      };
      this.state.loading = true;
      this.axios
        .post("pay", reqData)
        .then((res) => {
          console.log(res);
          this.state.loading = false;
          this.closeModal();
          this.$router.push(`/payment-confirmation/${reqData.userId}`);
        })
        .catch((err) => {
          this.state.loading = false;
          this.$notify({
            status: "danger",
            title: "ERROR!",
            message: err.errorMessage || "Something went wrong!",
          });
        });
    },
    showModal(param) {
      this.state.modalShown = true;
      this.selectedPlan = param;
    },
    resetModal() {
      this.name = null;
      this.phone = null;
    },
    closeModal() {
      this.$bvModal.hide("payment-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";
#pricing {
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
.pricing-box {
  border-color: white;
  margin: auto;
  min-height: 300px;
  max-height: 300px;
  overflow: hidden;
  box-shadow: -4px 20px 30px 0px #0000001c;
  padding: 1rem;
  max-width: 300px;
  border-radius: 10px;
  transition: 0.3s ease-in;
  &:hover {
    transform: scale(1.1);
  }
}
.buttons button {
  max-width: 140px;
  width: 100%;
}
.price {
  span {
    font-size: 0.9rem;
    font-weight: 400;
  }
}
.card-subtitle {
  font-size: 0.9rem;
  font-weight: 400;
}
.form-group {
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;

  .input-group {
    position: relative;
    width: 100%;
    background: transparent;
    backdrop-filter: blur(10px);
    background: #ffffffb0;
    border: 1px solid #eee;
    display: flex;
    flex-wrap: nowrap;
  }

  .form-control {
    border-radius: 0;
    width: auto;
    height: 100%;
    border: 0;
    background: transparent;
    color: $text-color;
    outline: transparent;
    padding-left: 0.75rem;
    font-weight: 400;
    font-size: 1rem;
    height: 2.75rem;

    &::placeholder {
      color: $text-color;
      font-weight: 300;
      font-size: 1rem;
    }
    &:not(:placeholder-shown),
    &:focus {
      & ~ svg {
        color: $primary;
      }
    }
  }
  svg {
    width: 1.65rem;
    height: 1.65rem;
  }
}

.back-icon svg {
  width: 1.65rem;
  height: 1.65rem;
  position: relative;
  top: -3px;
  z-index: 5;
}
.buttons {
  margin-top: 1rem;
  button {
    width: 100%;
    letter-spacing: 1px;
    font-weight: 300;
    height: 2.5rem;
  }
}
.bold .input-group-text,
.icon {
  font-weight: 500;
  border-radius: 0;
  border-color: #eee;
  width: 80px;
  text-align: center;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
</style>