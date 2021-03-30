<template>
  <section id="profile" class="w-100">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand to="/" class="pl-3 py-2 logo">
        <img :src="Logo" alt="logo" />
      </b-navbar-brand>
    </b-navbar>
    <b-row no-gutters class="pt-2 pb-" align-h="center">
      <header>
        <h2 class="font-weight-normal">USER PROFILE</h2>
      </header>
    </b-row>

    <b-row no-gutters align-h="center">
      <b-col class="pb-4" cols="11" sm="9" md="7" lg="6" xl="5">
        <b-form @submit.prevent="updateProfile">
          <!-- <b-row
            no-gutters
            class="flex-column"
            align-h="center"
            align-v="center"
          >
            <b-avatar
              :src="imgsrc"
              variant="light"
              size="80px"
              class="mr-3"
            ></b-avatar>
            <div>
              <b-button
                variant="dark"
                @click="$refs.profileFile.$refs.input.click()"
                class="mt-3 small px-3 font-weight-light"
                pill
                size="sm"
              >
                Upload profile picture
              </b-button>
            </div>
            <b-form-file
              v-model="profilePic"
              class="d-none"
              ref="profileFile"
              no-drop
              accept="image/*"
              plain
            />
          </b-row> -->

          <b-row no-gutters class="flex-column pt-4">
            <b-form-group label="Program">
              <b-input-group>
                <b-form-select required v-model="studentData.program">
                  <b-form-select-option
                    v-for="(program, i) in selectData.programs"
                    :key="i"
                    :value="program.id"
                  >
                    {{ program.name }}
                  </b-form-select-option>
                </b-form-select>
                <b-input-group-append
                  is-text
                  class="cursor-pointer"
                  @click="loadPrograms"
                >
                  <b-icon-arrow-repeat
                    :animation="state.loading.programs ? 'spin' : null"
                    scale="1.05"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group label="School">
              <b-input-group>
                <b-form-select
                  required
                  :disabled="!validSchool"
                  v-model="studentData.school"
                >
                  <b-form-select-option
                    v-for="(school, i) in selectData.schools"
                    :key="i"
                    :value="school.id"
                  >
                    {{ school.name }}
                  </b-form-select-option>
                </b-form-select>
                <b-input-group-append
                  is-text
                  class="cursor-pointer"
                  @click="loadSchools"
                >
                  <b-icon-arrow-repeat
                    :animation="state.loading.schools ? 'spin' : null"
                    scale="1.05"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group label="Level">
              <b-input-group>
                <b-form-select
                  required
                  :disabled="!validLevel"
                  v-model="studentData.level"
                >
                  <b-form-select-option
                    v-for="(level, i) in selectData.levels"
                    :key="i"
                    :value="level.id"
                  >
                    {{ level.name }}
                  </b-form-select-option>
                </b-form-select>
                <b-input-group-append
                  is-text
                  class="cursor-pointer"
                  @click="loadLevels"
                >
                  <b-icon-arrow-repeat
                    :animation="state.loading.levels ? 'spin' : null"
                    scale="1.05"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <transition name="component-fade">
              <b-form-group label="Combination" v-if="showCombinations">
                <b-input-group>
                  <b-form-select
                    required
                    :disabled="!validCombination"
                    v-model="studentData.combination"
                  >
                    <b-form-select-option
                      v-for="(combination, i) in selectData.combinations"
                      :key="i"
                      :value="combination.id"
                    >
                      {{ combination.name }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-input-group-append
                    is-text
                    class="cursor-pointer"
                    @click="loadCombinations"
                  >
                    <b-icon-arrow-repeat
                      :animation="state.loading.combinations ? 'spin' : null"
                      scale="1.05"
                    />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </transition>
            <b-form-group label="Class">
              <b-input-group>
                <b-form-select
                  required
                  :disabled="!validClass"
                  v-model="studentData.class"
                >
                  <b-form-select-option
                    v-for="(clas, i) in selectData.classes"
                    :key="i"
                    :value="clas.id"
                  >
                    {{ clas.name }}
                  </b-form-select-option>
                </b-form-select>
                <b-input-group-append
                  is-text
                  class="cursor-pointer"
                  @click="loadClasses"
                >
                  <b-icon-arrow-repeat
                    :animation="state.loading.classes ? 'spin' : null"
                    scale="1.05"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-row>

          <b-row no-gutters align-h="end" class="pt-3">
            <b-button
              variant="outline-dark"
              style="min-width: 120px"
              class="mr-3"
              @click="$router.back()"
            >
              back
            </b-button>
            <b-button
              variant="dark"
              style="min-width: 120px"
              type="submit"
              :disabled="state.loading.global"
            >
              <transition-group name="group-fade">
                <span key="loading" v-if="state.loading.global">
                  <AppLoading size="xs" />
                </span>
                <span key="text" v-else>Save</span>
              </transition-group>
            </b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import Logo from "../../../../assets/img/smart_class_logo.png";
export default {
  name: "edit-profile-page",
  props: ["studentID"],
  data() {
    return {
      Logo,
      profilePic: null,
      imgsrc: null,
      state: {
        loading: {
          global: false,
          programs: false,
          schools: false,
          levels: false,
          combinations: false,
          classes: false,
        },
      },
      studentData: {
        program: null,
        school: null,
        level: null,
        combination: null,
        class: null,
      },
      selectData: {
        programs: null,
        schools: null,
        levels: null,
        combinations: null,
        classes: null,
      },
    };
  },
  computed: {
    validProgram() {
      if (this.state.loading.programs) return false;
      return true;
    },
    validSchool() {
      if (this.state.loading.schools) return false;
      if (!this.studentData.program) return false;
      return true;
    },
    validLevel() {
      if (this.state.loading.levels) return false;
      if (!this.studentData.school) return false;
      return true;
    },
    validCombination() {
      if (this.state.loading.combinations) return false;
      if (!this.studentData.level) return false;
      return true;
    },
    validClass() {
      if (this.state.loading.classes) return false;
      if (this.isOLevel) return true;
      if (!this.studentData.combination) return false;
      return true;
    },
    isOLevel() {
      if (!this.selectData.levels) return false;
      if (!this.studentData.level) return false;
      const level = this.selectData.levels.filter(
        (i) => i.id == this.studentData.level
      )[0];
      if (level.name == "O' Level") return true;
      return false;
    },
    showCombinations() {
      if (!this.selectData.levels) return false;
      if (!this.studentData.level) return false;
      const level = this.selectData.levels.filter(
        (i) => i.id == this.studentData.level
      )[0];
      if (level.name == "O' Level") return false;
      return true;
    },
  },
  watch: {
    profilePic() {
      handler: {
        if (!this.profilePic) return;
        const image = new FileReader();
        image.onload = (e) => {
          this.$set(this, "imgsrc", e.target.result);
        };
        image.readAsDataURL(this.profilePic);
      }
    },
    "studentData.program"() {
      this.studentData.school = null;
      this.studentData.level = null;
      this.studentData.combination = null;
      this.studentData.class = null;
      this.loadSchools();
    },
    "studentData.school"() {
      this.studentData.level = null;
      this.studentData.combination = null;
      this.studentData.class = null;
      this.loadLevels();
    },
    "studentData.level"() {
      this.studentData.combination = null;
      this.studentData.class = null;
      if (this.isOLevel) {
        this.loadClasses();
      } else {
        this.loadCombinations();
      }
    },
    "studentData.combination"() {
      this.studentData.class = null;
      this.loadClasses();
    },
  },
  mounted() {
    this.loadPrograms();
    this.$title("create profile");
  },
  methods: {
    updateProfile() {
      this.state.loading.global = true;
      const reqData = {
        action: "Complete_acc",
        studentId: this.studentID,
        school: this.studentData.school,
        grade: this.studentData.class,
        stage: this.studentData.level,
        program: this.studentData.program,
        major: this.studentData.combination || "32",
      };

      this.axios
        .post("complete", reqData)
        .then((res) => {
          console.log(res.data);
          this.$router.replace("/student");
          if (res.data.userID)
            this.$store.dispatch("student/setStudentID", res.data.userID);
          this.state.loading.global = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading.global = false;
          this.$notify({
            title: "ERROR!",
            message: err.errorMessage || "Something went wrong!",
            status: "danger",
          });
        });
    },
    loadPrograms() {
      this.state.loading.programs = true;
      this.selectData.programs = null;
      this.axios
        .post("complete", {
          action: "getprogram",
        })
        .then((res) => {
          console.log(res.data);
          this.selectData.programs = res.data;
          this.state.loading.programs = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading.programs = false;
        });
    },
    loadSchools() {
      if (!this.validSchool) return;
      this.state.loading.schools = true;
      this.selectData.schools = null;
      this.axios
        .post("complete", {
          action: "getschool",
          program: this.studentData.program,
        })
        .then((res) => {
          console.log(res.data);
          this.selectData.schools = res.data;
          this.state.loading.schools = false;
        })
        .catch((err) => {
          this.state.loading.schools = false;
          console.log(err);
        });
    },
    loadLevels() {
      if (!this.validLevel) return;
      this.state.loading.levels = true;
      this.selectData.levels = null;
      this.axios
        .post("complete", {
          action: "getLevel",
          program: this.studentData.program,
          school: this.studentData.school,
        })
        .then((res) => {
          console.log(res.data);
          this.selectData.levels = res.data;
          this.state.loading.levels = false;
        })
        .catch((err) => {
          this.state.loading.levels = false;
          console.log(err);
        });
    },
    loadCombinations() {
      if (!this.validCombination) return;
      this.state.loading.combinations = true;
      this.selectData.combinations = null;
      this.axios
        .post("complete", {
          action: "getcombination",
          program: this.studentData.program,
          schoolId: this.studentData.school,
          level: this.studentData.level,
        })
        .then((res) => {
          console.log(res, this.studentData.level);
          this.selectData.combinations = res.data;
          this.state.loading.combinations = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading.combinations = false;
        });
    },
    loadClasses() {
      if (!this.validClass) return;
      this.state.loading.classes = true;
      this.selectData.classes = null;
      this.axios
        .post("complete", {
          action: "getClass",
          program: this.studentData.program,
          level: this.studentData.level,
        })
        .then((res) => {
          console.log(res.data);
          this.selectData.classes = res.data;
          this.state.loading.classes = false;
        })
        .catch((err) => {
          console.log(err);
          this.state.loading.classes = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  img {
    max-width: 100px;
  }
}
</style>