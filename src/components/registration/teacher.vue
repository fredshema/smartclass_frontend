<template>
  <b-form
    class="register-form pb-4"
    ref="teacher-tab"
    @submit.prevent="register"
  >
    <header class="h4 w-100 text-center mb-4">TEACHER REGISTRATION</header>
    <b-form-group>
      <b-input-group>
        <b-input placeholder="Names" trim v-model="username" />
        <UserIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-input
          type="number"
          placeholder="Phone number"
          trim
          v-model="phone"
        />
        <PhoneIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-input
          type="email"
          placeholder="Email address"
          trim
          v-model="email"
        />
        <EmailIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-select v-model="gender" required :options="['Male', 'Female']">
          <template #first>
            <b-select-option value="" disabled>Gender</b-select-option>
          </template>
        </b-select>
        <GenderIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-select
          v-model="subject"
          required
          :disabled="availableSubjects ? false : true"
        >
          <template #first>
            <b-select-option value="" disabled>
              Subject to teach
            </b-select-option>
          </template>
          <b-select-option
            v-for="(course, i) in availableSubjects || []"
            :value="course.id"
            :key="i"
          >
            {{ course.name }}
          </b-select-option>
        </b-select>
        <BookIcon />
      </b-input-group>
    </b-form-group>
    <!-- <b-form-group>
      <b-form-file
        class="file-selector"
        placeholder="Choose your resume or drop it here..."
        drop-placeholder="Drop file here..."
        accept="image/* , .doc, .pdf, .docx"
        v-model="file"
        required
      ></b-form-file>
    </b-form-group> -->
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
        required
        size="lg"
        class="mentor-checkbox"
        >I accept to terms and conditions.</b-form-checkbox
      >
    </b-form-group>
    <div class="buttons">
      <b-button variant="primary" type="submit" :disabled="state.loading">
        <transition-group name="group-fade">
          <span key="loading" v-if="state.loading">
            <AppLoading />
          </span>
          <span key="text" v-else>Request Teacher Account</span>
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
import UserIcon from "../../assets/img/icons/user-icon.vue";
import LockIcon from "../../assets/img/icons/lock.vue";
import EmailIcon from "../../assets/img/icons/email-icon.vue";
import PhoneIcon from "../../assets/img/icons/PhoneIcon.vue";
import GenderIcon from "../../assets/img/icons/GenderIcon.vue";
import CaseIcon from "../../assets/img/icons/case-icon.vue";
import BookIcon from "../../assets/img/icons/BookIcon.vue";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "teacher-registration-component",
  components: {
    UserIcon,
    LockIcon,
    EmailIcon,
    PhoneIcon,
    GenderIcon,
    CaseIcon,
    BookIcon,
  },
  data() {
    return {
      state: { loading: false },
      gender: "",
      acceptTC: false,
      username: null,
      email: null,
      phone: null,
      type: "teacher",
      password: null,
      repeatPassword: null,
      file: null,
      subject: "",
      action: "adduserTeacher",
      availableSubjects: null,
    };
  },
  beforeMount() {
    this.fetchCourses();
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
  methods: {
    register() {
      if (!this.acceptTC) return;
      // let reqData = new FormData();
      // // reqData.append("file", this.file);
      // reqData.append("username", this.username);
      // reqData.append("phone", this.phone);
      // reqData.append("type", "teacher");
      // reqData.append("email", this.email);
      // reqData.append("gender", this.gender);
      // reqData.append("subject", this.subject);
      // reqData.append("password", this.password);

      const reqData = {
        action: this.action,
        username: this.username,
        type: "teacher",
        email: this.email,
        password: this.repeatPassword,
        gender: this.gender,
        phone: this.phone,
        subject: this.subject,
      };

      this.load(true);
      this.axios
        .post("signup", reqData)
        .then((res) => {
          console.log(res);
          this.load(false);
          if (res.data.message) {
            this.$notify({
              title: "SUCCESS",
              message: res.data.message,
              status: "success",
            });
            this.$router.push("/login");
          } else {
            this.$notify({
              title: "ERROR",
              message: "Something went wrong",
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
    fetchCourses() {
      this.axios
        .post("signup", {
          action: "getsubjects",
        })
        .then((res) => {
          console.log(res);
          this.availableSubjects = res.data;
        })
        .catch((err) => {
          console.log(err);
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
  height: max-content;
  padding: 2px;

  .form-group {
    width: 100%;
    position: relative;
    margin-bottom: 1rem;

    .form-control,
    select {
      border-radius: 0;
      width: 100%;
      height: 100%;
      border: 0;
      background: transparent;
      color: $text-color;
      outline: transparent;
      padding-left: 4rem;
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
    select:not(:valid) {
      font-weight: 300;
      & ~ svg {
        color: $text-color;
      }
    }
  }
  .custom-file-label {
    font-size: 20px;
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
    width: 1.75rem;
    height: 1.75rem;
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
      font-size: 1.15rem;
      letter-spacing: 1px;
      color: white;
      border-radius: 1px;
      font-weight: 300;
    }
  }
}
.mentor-checkbox {
  font-size: 1rem !important;
  font-weight: 400;
}
</style>