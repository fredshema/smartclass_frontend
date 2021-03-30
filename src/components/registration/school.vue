<template>
  <b-form class="register-form pb-4" ref="school-tab" @submit.prevent="register">
    <header class="h4 w-100 text-center mb-4">
      SCHOOL ADMINISTRATOR REGISTRATION
    </header>
    <b-form-group>
      <b-row cols="1" no-gutters>
        <b-col class="mb-3">
          <b-input-group>
            <b-input placeholder="First name" v-model="fname" trim required />
            <UserIcon />
          </b-input-group>
        </b-col>
        <b-col>
          <b-input-group>
            <b-input placeholder="Last name" v-model="lname" trim required />
            <UserIcon />
          </b-input-group>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-input
          type="number"
          placeholder="Phone number"
          v-model="phone"
          trim
          required
        />
        <PhoneIcon />
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-input-group>
        <b-input
          type="email"
          placeholder="Email address"
          v-model="email"
          trim
          required
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
        <b-select v-model="selectedSchool" required :disabled="!allSchools">
          <template #first>
            <b-select-option value="" disabled>School</b-select-option>
            <b-select-option
              :value="school"
              v-for="school in allSchools"
              :key="school.id"
            >
              {{ school.name }}
            </b-select-option>
          </template>
        </b-select>
        <SchoolIcon />
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
      <b-form-checkbox v-model="acceptTC" size="lg" class="mentor-checkbox"
        >I accept to terms and conditions.</b-form-checkbox
      >
    </b-form-group>
    <div class="buttons">
      <b-button variant="primary" type="submit" :disabled="state.loading">
        <transition-group name="group-fade">
          <span key="loading" v-if="state.loading">
            <AppLoading />
          </span>
          <span key="text" v-else>Request School Admin Account </span>
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
import SchoolIcon from "../../assets/img/icons/SchoolIcon.vue";
import CaseIcon from "../../assets/img/icons/case-icon.vue";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "school-registration-component",
  components: {
    UserIcon,
    LockIcon,
    EmailIcon,
    PhoneIcon,
    GenderIcon,
    SchoolIcon,
    CaseIcon,
  },
  data() {
    return {
      state: { loading: false, loadingSchools: false },
      gender: "",
      acceptTC: false,
      fname: null,
      lname: null,
      phone: null,
      email: null,
      password: null,
      repeatPassword: null,
      allSchools: [],
      selectedSchool: "",
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
  mounted() {
    this.getSchools();
  },
  methods: {
    register() {
      if (!this.acceptTC) return;
      const reqData = {
        action: "signupSchool",
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        phone: this.phone,
        school: this.selectedSchool.id,
        type: "schoolAD",
        password: this.repeatPassword,
        gender: this.gender,
      };
      this.load(true);
      this.axios
        .post("schoolAdminS", reqData)
        .then((res) => {
          console.log(res.data);
          this.load(false);
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            status: "success",
          });
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
    async getSchools() {
      this.state.loadingSchools = true;
      const { data } = await this.axios.post("schoolAdminS", {
        action: "getSchools",
      });
      console.log(data);
      this.allSchools = data;
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
    height: 4rem;
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