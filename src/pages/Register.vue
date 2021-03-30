<template>
  <div id="register" class="d-flex flex-column position-relative">
    <div
      class="back-icon d-flex justify-content-start align-items-center w-100"
    >
      <a @click="$router.back()" class="d-flex align-items-center cursor-pointer">
        <ArrowIcon class="mr-3" />
        <span>Back</span>
      </a>
    </div>
    <div class="flex-1 align-items-center flex-column">
      <b-container>
        <b-row no-gutters align-h="center">
          <b-col cols="10" md="8" lg="6" class="d-flex flex-column">
            <header
              class="h4 text-center mb-3 flex-center flex-column no-select"
            >
              <img :src="logo" alt="smartclass logo" />
            </header>

            <!-- tabs -->
            <!-- tabs -->
            <b-row no-gutters class="mb-3">
              <b-col
                cols="3"
                v-for="(tab, i) in tabs"
                :key="i"
                class="p-2 s-tabs"
              >
                <label
                  class="w-100 flex-center flex-column"
                  :class="selectedTab == tab ? 'active' : ''"
                  @click="setTab(tab)"
                >
                  <span>
                    {{ tab }}
                    <hr />
                  </span>
                </label>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row no-gutters align-h="center">
          <b-col cols="10" sm="10" md="8" lg="7" xl="6">
            <section class="forms flex-1" ref="forms-width">
              <div class="slider d-flex" ref="slider">
                <student />
                <teacher />
                <mentor />
                <school />
              </div>
            </section>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import smartClassLogo from "../assets/img/smart_class_logo.png";
import ArrowIcon from "../assets/img/icons/arrow-left-icon.vue";
import student from "../components/registration/student.vue";
import teacher from "../components/registration/teacher.vue";
import mentor from "../components/registration/mentor.vue";
import school from "../components/registration/school.vue";
export default {
  name: "register-page",
  components: { student, teacher, mentor, school, ArrowIcon },
  data() {
    return {
      logo: smartClassLogo,
      tabs: ["Student", "Teacher", "Mentor", "School"],
      selectedTab: "Student",
    };
  },
  mounted() {
    this.$title("Register");
    this.setTab("Student");
  },
  methods: {
    setTab(tab) {
      if (!tab) return;
      this.moveTabs(tab);
      if (tab == this.selectedTab) return;
      this.$set(this, "selectedTab", tab);
    },
    moveTabs(tab) {
      const slider = this.$refs["slider"];
      const slideLeft = (num) => {
        slider.style = `left: ${-num * 100}%;height: ${
          slider.children[num].clientHeight
        }px`;
      };

      switch (tab) {
        case "Student":
          slideLeft(0);
          break;
        case "Teacher":
          slideLeft(1);
          break;
        case "Mentor":
          slideLeft(2);
          break;
        case "School":
          slideLeft(3);
          break;
        default:
          slideLeft(0);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
#register {
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
.forms {
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
  max-width: 100%;
}
.slider {
  position: relative;
  width: 100%;
  max-width: 100%;
  transition: left 0.4s ease-in-out;
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

.s-tabs {
  label {
    cursor: pointer;
    user-select: none;
    font-size: 1.025rem;

    hr {
      height: 2px;
      background: $primary;
      width: 100%;
      border-radius: 10px;
      margin: 0;
      opacity: 0;
    }

    &:hover {
      span {
        transform: scale(1.1);
      }
    }

    &.active {
      span {
        hr {
          opacity: 1;
        }
      }
    }
  }
}
</style>