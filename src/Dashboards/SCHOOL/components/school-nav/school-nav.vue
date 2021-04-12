<template>
  <b-navbar type="dark" variant="light" class="school-navbar w-100">
    <b-navbar-brand tag="div" class="ml-md-4 ml-3">
      <img
        :src="require('../../../../assets/img/smart_class_logo.png')"
        class="logo"
        alt="Smartclass Logo"
      />
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto align-items-lg-center" align="center" fill>
      <!-- notifications -->
      <b-nav-item-dropdown
        no-caret
        class="px-2"
        toggle-class="text-decoration-none"
        exact-active-class="text-primary"
        menu-class="py-0"
        right
      >
        <template #button-content>
          <b-button class="py-2 text-dark" variant="link">
            <b-icon-bell scale="1.23" />
          </b-button>
        </template>
        <div
          class="p-5 d-flex align-items-center justify-content-center"
          style="min-width: 300px; min-height: 150px"
          v-if="state.loadingNotif"
        >
          <b-spinner></b-spinner>
        </div>
        <div
          v-else-if="notificationsAvailable"
          style="min-width: 300px; min-height: 150px"
        >
          <div v-for="i in 4" :key="i">
            <b-dropdown-item
              v-if="notifications[i]"
              class="py-0"
              link-class="py-3"
            >
              {{ notifications[i].message }}
            </b-dropdown-item>
            <hr class="dropdown-devider m-0" />
          </div>
        </div>
        <div v-else class="py-4" style="min-width: 300px">
          <b-dropdown-text class="text-center py-1">
            No available notifications at the moment!
          </b-dropdown-text>
        </div>
        <b-dropdown-text
          class="text-center bg-primary text-light cursor-pointer"
          @click.stop.prevent="fetchNotifications"
          v-if="!state.loadingNotif"
        >
          Refresh
        </b-dropdown-text>
      </b-nav-item-dropdown>
      <!-- end of notifications -->
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
        <b-dropdown-item
          link-class="py-2"
          active-class="bg-primary text-light"
          :to="{ name: 'school-chatrooms' }"
        >
          Chatroom
        </b-dropdown-item>
        <b-dropdown-item
          link-class="py-2"
          active-class="bg-primary text-light"
          :to="{ name: 'school-profile' }"
        >
          Profile
        </b-dropdown-item>
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
  name: "school-navbar-component",
  props: {
    sidebarShown: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { state: { loadingNotif: false }, notifications: [] };
  },
  computed: {
    user() {
      return this.$store.state.school.data;
    },
    username() {
      if (!this.user) return "";
      return this.user.userame;
    },
    notificationsAvailable() {
      if (!Array.isArray(this.notifications)) return false;
      if (this.notifications.length < 1) return false;
      return true;
    },
  },
  mounted() {
    console.log(this.user);
  },

  beforeMount() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      this.state.loadingNotif = true;
      const reqData = {
        action: "schoolAdNotifications",
        userId: this.user.user_id,
        school: this.user.school,
      };

      try {
        const { data } = await this.axios.post("notification", reqData);
        console.log(data);
        if (Array.isArray(data)) this.$set(this, "notifications", data);
        this.state.loadingNotif = false;
      } catch (error) {
        console.log(error);
        this.state.loadingNotif = false;
      }
    },
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