<template>
  <b-navbar type="dark" variant="light" class="admin-navbar w-100">
    <b-navbar-brand tag="div" class="ml-md-4 ml-3">
      <img
        :src="require('../../../../assets/img/smart_class_logo.png')"
        class="logo"
        alt="Smartclass Logo"
      />
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto align-items-lg-center" align="center" fill>
      <b-nav-item-dropdown no-caret right>
        <template #button-content>
          <b-button
            class="py-2 account-btn text-dark text-decoration-none"
            variant="link"
          >
            <b-icon-person-circle scale="1.5" />
            <span class="ml-2 d-none d-sm-inline">Account</span>
          </b-button>
        </template>
        <b-dropdown-text v-if="user">{{ username }}</b-dropdown-text>
        <b-dd-divider v-if="user" />
        <b-dropdown-item to="/admin/profile">Profile</b-dropdown-item>
        <b-dd-divider />
        <b-dropdown-item to="/logout" link-class="text-danger">
          Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
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
      return this.$store.state.admin.data;
    },
    username() {
      if (!this.user) return "";
      return this.user.userame;
    },
  },
  mounted() {
    console.log(this.user);
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
}

.settings-button {
  border-radius: 3px !important;
}

@media (max-width: 670px) {
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