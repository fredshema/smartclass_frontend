<template>
  <b-form
    class="register-form pb-4"
    ref="student-tab"
    @submit.prevent="register"
  >
    <header class="h4 w-100 text-center mb-4">STUDENT REGISTRATION</header>
    <b-form-group>
      <b-input-group>
        <b-input placeholder="Names" trim required v-model="username" />
        <UserIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-input
          placeholder="Email"
          type="email"
          trim
          required
          v-model="email"
        />
        <EmailIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-input
          type="number"
          placeholder="Phone number"
          trim
          required
          v-model="phone"
        />
        <PhoneIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group :class="{ 'form-group--error': $v.password.$error }">
      <b-input-group>
        <b-input
          placeholder="Password"
          type="password"
          required
          v-model.trim="$v.password.$model"
        />
        <LockIcon />
      </b-input-group>
      <div
        class="error text-danger mx-1 mt-2"
        v-if="$v.password.$error && !$v.password.required"
      >
        Password is required.
      </div>
      <div
        class="error text-danger mx-1 mt-2"
        v-if="$v.password.$error && !$v.password.minLength"
      >
        Password must have at least
        {{ $v.password.$params.minLength.min }} letters.
      </div>
    </b-form-group>
    <b-form-group :class="{ 'form-group--error': $v.repeatPassword.$error }">
      <b-input-group>
        <b-input
          placeholder="verify password"
          type="password"
          required
          v-model.trim="$v.repeatPassword.$model"
          reveal
        />
        <LockIcon />
      </b-input-group>
      <div class="error text-danger mx-1 mt-2" v-if="$v.repeatPassword.$error">
        Passwords must be identical.
      </div>
    </b-form-group>
    <b-form-group class="pt-2 pl-1">
      <b-form-checkbox
        v-model="acceptTC"
        size="lg"
        class="mentor-checkbox"
        style="font-size: 1rem"
        required
      >
        I accept to terms and conditions.
      </b-form-checkbox>
    </b-form-group>
    <div class="buttons">
      <b-button variant="primary" type="submit" :disabled="state.loading">
        <transition-group name="group-fade">
          <span key="loading" v-if="state.loading">
            <AppLoading />
          </span>
          <span key="text" v-else>Register</span>
        </transition-group>
      </b-button>
    </div>
    <footer class="flex-center mt-3">
      <p>
        Already have an account? &nbsp;
        <router-link to="/login">login</router-link>
      </p>
    </footer>
  </b-form>
</template>

<script>
import LockIcon from "../../assets/img/icons/lock.vue";
import UserIcon from "../../assets/img/icons/user-icon.vue";
import EmailIcon from "../../assets/img/icons/email-icon.vue";
import PhoneIcon from "../../assets/img/icons/PhoneIcon.vue";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "student-registration-component",
  components: { LockIcon, UserIcon, EmailIcon, PhoneIcon },
  data() {
    return {
      state: { loading: false },
      acceptTC: false,
      username: null,
      email: null,
      type: "student",
      action: "adduserStudent",
      phone: null,
      password: null,
      repeatPassword: null,
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {},
  mounted() {},
  methods: {
    register() {
      if (!this.acceptTC) return;

      const reqData = {
        action: this.action,
        username: this.username,
        type: this.type,
        email: this.email,
        phone: this.phone,
        password: this.repeatPassword,
      };
      this.load(true);
      this.axios
        .post("signup", reqData)
        .then((res) => {
          console.log(res.data);
          this.load(false);
          if (res.data.message) {
            this.$notify({
              title: "SUCCESS",
              message: res.data.message,
              status: "success",
            });
            this.$router.push(`/pricing/${res.data.userId}`);
          } else {
            this.$notify({
              title: "ERROR!",
              message: "Something went wrong, try again!",
              status: "danger",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.load(false);
          this.$notify({
            title: "ERROR",
            message: err.errorMessage,
            status: "danger",
          });
        });
    },
    load(param) {
      this.$set(this.state, "loading", param || false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";
.register-form {
  position: relative;
  top: 0;
  left: 0;
  min-width: 100%;
  padding: 2px;
  height: max-content;

  .form-group {
    width: 100%;
    position: relative;
    margin-bottom: 1rem;

    .form-control {
      border-radius: 0;
      width: 100%;
      height: 100%;
      border: 0;
      background: transparent;
      color: $text-color;
      outline: transparent;
      padding-left: 3.5rem;
      font-weight: 400;
      font-size: 1.1rem;

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
  }

  .input-group {
    position: relative;
    width: 100%;
    background: transparent;
    backdrop-filter: blur(10px);
    background: #ffffffb0;
    height: 3.5rem;
    border: 1px solid #eee;
  }
  svg {
    width: 1.65rem;
    height: 1.65rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    transition: 200ms ease-in;
    z-index: 5;
  }
  .buttons {
    margin-top: 1rem;
    button {
      width: 100%;
      height: 3rem;
      font-size: 1.25rem;
      letter-spacing: 1px;
      color: white;
      border-radius: 1px;
      font-weight: 300;
    }
  }
}
</style>