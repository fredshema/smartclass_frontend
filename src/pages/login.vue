<template>
  <div id="login" class="d-flex flex-column position-relative">
    <div
      class="back-icon d-flex justify-content-start align-items-center w-100"
    >
      <router-link to="/">
        <ArrowIcon class="mr-3" />
        <span>Back Home</span>
      </router-link>
    </div>
    <div class="flex-1 flex-center">
      <b-container>
        <b-row no-gutters align-h="center">
          <b-col cols="10" sm="10" md="7" lg="5" xl="4">
            <header
              class="h4 text-center mb-5 flex-center flex-column no-select"
            >
              <img
                :src="require('../assets/img/smart_class_logo.png')"
                alt="smartclass logo"
                class="mb-3"
              />
            </header>
            <b-form class="login-form" @submit.prevent="login">
              <b-form-group>
                <b-input-group>
                  <b-input
                    placeholder="Username"
                    v-model="username"
                    trim
                    required
                  />
                  <UserIcon />
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <b-input-group>
                  <b-input
                    placeholder="Password"
                    type="password"
                    v-model="password"
                    required
                  />
                  <LockIcon />
                </b-input-group>
                <router-link
                  to="/login"
                  class="forgot w-100 text-right text-reset"
                >
                  Forgot password?</router-link
                >
              </b-form-group>
              <div class="buttons">
                <b-button
                  variant="primary"
                  type="submit"
                  :disabled="state.loading"
                >
                  <transition-group name="group-fade">
                    <span key="loading" v-if="state.loading">
                      <AppLoading />
                    </span>
                    <span key="text" v-else>Login</span>
                  </transition-group>
                </b-button>
              </div>
              <footer class="flex-center mt-3">
                <p>
                  Don't have an account? &nbsp;
                  <router-link to="/register">register</router-link>
                </p>
              </footer>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import UserIcon from "../assets/img/icons/user-icon.vue";
import LockIcon from "../assets/img/icons/lock.vue";
import ArrowIcon from "../assets/img/icons/arrow-left-icon.vue";
import decode from "jwt-decode";

export default {
  name: "Login-page",
  components: {
    LockIcon,
    UserIcon,
    ArrowIcon,
  },
  data() {
    return {
      username: null,
      password: null,
      state: {
        loading: false,
      },
    };
  },
  mounted() {
    this.$title("Login");
  },
  methods: {
    login() {
      if (!this.username || !this.password) return;
      this.state.loading = true;
      const reqData = {
        email: this.username,
        password: this.password,
      };
      this.axios
        .post("login", reqData)
        .then((res) => {
          this.state.loading = false;

          if (res.data.success == 1) {
            console.log(res);
            sessionStorage.setItem("token", res.data.token);
            const tokenData = decode(res.data.token);
            console.log(tokenData);
            switch (tokenData.data.user_type) {
              case "student":
                console.log("student");
                this.$router.replace("/student");
                break;
              case "admin":
                console.log("admin");
                this.$router.replace("/admin");
                break;
              case "teacher":
                console.log("teacher");
                this.$router.replace("/teacher");
                break;
              case "schoolAD":
                console.log("school");
                this.$router.replace("/school");
                break;
              default:
                console.log("default");
                sessionStorage.removeItem("token");
                break;
            }
          } else if (res.data.status == "did not pay") {
            this.$notify({
              title: "ERROR!",
              message: "Seems like you are not subscribed to any plan!",
              status: "danger",
            });
            this.$router.push(`/payment-confirmation/${res.data.userId}`);
          } else {
            console.log(res);
            this.$notify({
              title: "ERROR!",
              message: res.data.message || "Something went wrong, try again.",
              status: "danger",
            });
          }
        })
        .catch((err) => {
          this.state.loading = false;
          console.log(err);
          this.$notify({
            title: "ERROR!",
            message: err.errorMessage || "an unknown error occured.",
            status: "danger",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
#login {
  width: 100%;
  min-height: 100vh;
  background: $white-accent;
  background-position: center;
  background-size: 70%;
  background-repeat: no-repeat;
}

header {
  p {
    font-weight: 300;
  }

  img {
    width: 9rem;
  }
}
.login-form {
  .form-group {
    width: 100%;
    height: 3.5rem;
    position: relative;

    .form-control {
      border-radius: 0;
      width: 100%;
      height: 100%;
      border: 0;
      background: transparent;
      color: $text-color;
      outline: transparent;
      padding-left: 3.25rem;
      font-weight: 400;
      font-size: 1rem;

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
    height: 3.25rem;
    border: 1px solid #eee;
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    transition: 200ms ease-in;
    z-index: 5;
  }
}
.buttons {
  margin-top: 3.25rem;
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
.forgot {
  float: right;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>