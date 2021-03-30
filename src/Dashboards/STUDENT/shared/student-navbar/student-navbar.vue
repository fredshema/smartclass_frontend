<template>
  <b-navbar type="dark" variant="light" class="student-navbar w-100" sticky>
    <b-button
      class="close-btn p-0 text-reset"
      variant="link"
      @click="$emit('toggle-sidebar')"
      :class="{ active: sidebarShown }"
    >
      <span class="toggle-bar"></span>
    </b-button>
    <b-navbar-brand tag="div" class="ml-md-4 ml-3">
      <img
        :src="require('../../../../assets/img/smart_class_logo.png')"
        class="logo"
        alt="Smartclass Logo"
      />
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto align-items-lg-center" align="center" fill>
        <b-nav-item class="px-2" exact-active-class="text-primary">
          <b-button class="py-2 text-dark" variant="link">
            <b-icon-bell scale="1.23" />
          </b-button>
        </b-nav-item>
        <b-nav-item-dropdown no-caret right>
          <template #button-content>
            <b-button
              class="py-2 account-btn text-dark text-decoration-none"
              variant="link"
            >
              <b-icon-person-circle scale="1.5" />
              <span class="ml-2 d-none d-sm-inline">My Account</span>
            </b-button>
          </template>
          <b-dropdown-text v-if="user">{{ user.userame }}</b-dropdown-text>
          <b-dd-divider />
          <b-dropdown-item :to="{name:'student-profile'}">Profile</b-dropdown-item>
          <b-dd-divider />
          <b-dropdown-item to="/logout" link-class="text-danger">
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "student-navbar-component",
  props: {
    sidebarShown: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.student.studentData;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  height: 3.75rem;

  .logo {
    height: 100%;
  }
}
.nav-link {
  font-size: 1.05rem;
  font-weight: 500;
}
svg {
  width: 1rem;
  height: 1rem;

  &.quiz-icon {
    width: 1.55rem;
    height: 1.55rem;
    position: relative;
    top: -3px;
    left: 3px;
  }
}

.settings-button {
  border-radius: 3px !important;
}
.close-btn {
  width: 40px;
  height: 40px;
  display: none;
  justify-content: center;
  align-items: center;
  box-shadow: none !important;
  user-select: none;
  padding: 0;
  transform: scale(0.75);
}
.toggle-bar,
.toggle-bar::before,
.toggle-bar::after,
.close-btn.active .toggle-bar,
.close-btn.active .toggle-bar::before,
.close-btn.active .toggle-bar::after {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.toggle-bar {
  width: 38px;
  margin: 10px 0;
  position: relative;
  border-top: 6px solid var(--dark);
  display: block;
  border-radius: 5px;
}
.toggle-bar::before,
.toggle-bar::after {
  content: "";
  display: block;
  background: var(--dark);
  height: 6px;
  width: 38px;
  position: absolute;
  top: -16px;
  transform: rotate(0deg);
  transform-origin: 13%;
  border-radius: 5px;
}
.toggle-bar::after {
  top: 4px;
}
.close-btn.active .toggle-bar {
  border-top: 6px solid transparent;
}
.close-btn.active .toggle-bar::before {
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.close-btn.active .toggle-bar::after {
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
@media (max-width: 670px) {
  .close-btn {
    display: flex;
  }
  .navbar-brand {
    height: 2.5rem;
  }
}
.account-btn {
  padding: 0;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
}
</style>