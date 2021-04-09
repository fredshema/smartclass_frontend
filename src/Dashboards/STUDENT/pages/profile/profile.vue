<template>
  <b-container class="emp-profile">
    <b-form>
      <b-row no-gutters class="row" align-h="between">
        <b-col>
          <b-row no-gutters>
            <b-col md="5">
              <div class="profile-img">
                <b-img fluid :src="profilePicture" alt="" />
                <div class="file btn btn-lg btn-primary">
                  Change Photo
                  <b-file
                    accept="image/*"
                    v-model="photo"
                    name="profile"
                    plain
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="profile-head">
                <h5 class="text-md-left text-center">{{ user.userame }}</h5>
                <h6 class="text-md-left text-center">
                  {{ user.user_type }}
                </h6>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          md="auto"
          class="d-flex justify-content-center d-md-block mt-2 mt-md-0"
        >
          <b-button
            class="profile-edit-btn px-4"
            variant="light"
            @click="fetchProfile"
          >
            Refresh Profile
          </b-button>
        </b-col>
      </b-row>
      <b-row no-gutters class="pt-4" align-h="center">
        <b-col md="11">
          <b-tabs
            class="profile-tab"
            content-class="p-3 pt-4"
            id="myTabContent"
          >
            <b-tab
              title="About"
              active
              title-link-class="custom-title"
              id="home"
              v-if="user"
            >
              <b-row no-gutters v-if="user.userame">
                <b-col md="6">
                  <label>Name</label>
                </b-col>
                <b-col md="6">
                  <p>{{ user.userame }}</p>
                </b-col>
              </b-row>
              <b-row no-gutters v-if="user.phone">
                <b-col md="6">
                  <label>Phone Number</label>
                </b-col>
                <b-col md="6">
                  <p>{{ user.phone }}</p>
                </b-col>
              </b-row>
              <b-row no-gutters v-if="profile.email">
                <b-col md="6">
                  <label>Email</label>
                </b-col>
                <b-col md="6">
                  <p>{{ profile.email }}</p>
                </b-col>
              </b-row>
              <b-row no-gutters v-if="profile.combination">
                <b-col md="6">
                  <label>Combination</label>
                </b-col>
                <b-col md="6">
                  <p>{{ profile.combination }}</p>
                </b-col>
              </b-row>
              <b-row no-gutters v-if="state.loading">
                <b-col md="6">
                  <b-skeleton class="w-50" />
                </b-col>
                <b-col md="6">
                  <b-skeleton class="w-75" />
                </b-col>
              </b-row>
            </b-tab>
            <!-- <b-tab title="Timeline">
              <b-row no-gutters>
                <b-col md="6">
                  <label>Experience</label>
                </b-col>
                <b-col md="6">
                  <p>Expert</p>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col md="6">
                  <label>Hourly Rate</label>
                </b-col>
                <b-col md="6">
                  <p>10$/hr</p>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col md="6">
                  <label>Total Projects</label>
                </b-col>
                <b-col md="6">
                  <p>230</p>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col md="6">
                  <label>English Level</label>
                </b-col>
                <b-col md="6">
                  <p>Expert</p>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col md="6">
                  <label>Availability</label>
                </b-col>
                <b-col md="6">
                  <p>6 months</p>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col md="12">
                  <label>Your Bio</label><br />
                  <p>Your detail description</p>
                </b-col>
              </b-row>
            </b-tab> -->
          </b-tabs>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "admin-profile",
  data() {
    return { state: { loading: false }, profile: {}, phone: null };
  },
  computed: {
    user() {
      return this.$store.state.student.studentData;
    },
    profilePicture() {
      const { profile } = this.profile;
      if (profile && this.isImage(profile)) return profile;
      return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    },
  },
  watch: {
    async photo() {
      if (this.photo) {
        const reqData = new FormData();
        reqData.append("userId", this.user.userId);
        reqData.append("file", this.photo);
        try {
          const { data } = await this.axios.post("updateprofile", reqData);
          this.fetchProfile();
          this.$notify({
            title: "SUCCESS!",
            message: "Your Profile picture is updated successfully.",
            status: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    console.log(this.user);
  },
  beforeMount() {
    this.$title("Profile");
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      this.state.loading = true;
      this.profile = {};
      const reqData = {
        action: "GetStudentProfiles",
        userId: this.user.user_id,
      };
      try {
        const { data } = await this.axios.post("profiles", reqData);
        this.state.loading = false;
        console.log(data);
        this.profile = data[0];
      } catch (error) {
        this.state.loading = false;
        console.log(error);
      }
    },
    isImage(str) {
      return str.match(/\.(jpg|gif|JPG|png)$/) != null;
    },
  },
};
</script>

<style lang="scss" scoped>
.emp-profile {
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 0.5rem;
  background: #fff;
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 70%;
  height: 100%;
}
.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}
.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #0062cc;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}
.profile-tab {
  margin-bottom: 5%;
}
.custom-title {
  font-weight: 600;
  border: none;
}
.profile-work {
  padding: 14%;
  margin-top: -15%;
}
.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}
.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}
.profile-work ul {
  list-style: none;
}
.profile-tab label {
  font-weight: 600;
}
.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
</style>
<style lang="scss">
.profile-tab .custom-title.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}
.profile-tab .custom-title {
  color: #495057;

  &:focus,
  &:hover {
    border: none;
    &.active {
      border-bottom: 2px solid #0062cc;
    }
  }
}
</style>