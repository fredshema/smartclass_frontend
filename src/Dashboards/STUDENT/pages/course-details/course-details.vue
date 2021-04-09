<template>
  <section id="course-details">
    <b-row class="pt-2 pb-3">
      <b-col>
        <h4 class="d-flex">
          <b-icon-arrow-left
            class="mr-3 cursor-pointer"
            @click.once="$router.back()"
          />
          <div class="d-flex text-left flex-column">
            <span class="text-uppercase">{{ courseID }} course</span>
            <span
              class="text-muted text-uppercase small mt-1 unit"
              v-if="selectedUnit"
            >
              {{ selectedUnit.title }}
            </span>
          </div>
        </h4>
      </b-col>
      <b-col cols="auto">
        <b-button
          variant="primary"
          class="text-white"
          v-show="showUnits"
          v-b-toggle.units-sidebar
        >
          ALL UNITS
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <div class="course-tabs">
        <div
          class="tab"
          :class="{ active: selectedTabIndex == i }"
          v-for="(tab, i) in shownTabs"
          :key="i"
          @click="setTab(i)"
        >
          {{ tab }}
        </div>
      </div>
    </b-row>
    <b-row no-gutters class="py-3 px-2">
      <transition name="tabs-fade">
        <keep-alive :max="3">
          <Component
            :is="shownTabs[selectedTabIndex]"
            :courseName="courseID"
            :unitsAvailable="state.unitsAvailable"
          />
        </keep-alive>
      </transition>
    </b-row>
    <!-- sidebar of units -->
    <UnitsSidebar @unit-selected="setUnit" :units="units" v-if="showUnits" />
  </section>
</template>

<script>
import Challenges from "./components/course-challenges.vue";
import Summary from "./components/course-summary.vue";
import Books from "./components/course-books.vue";
import UnitsSidebar from "./components/units-sidebar.vue";
import Quiz from "./components/course-quiz.vue";
import Videos from "./components/course-videos.vue";
import Assignments from "./components/course-assignments.vue";
import Notes from "./components/course-notes.vue";
export default {
  name: "course-details-component",
  components: {
    Challenges,
    Summary,
    Books,
    UnitsSidebar,
    Quiz,
    Videos,
    Assignments,
    Notes,
  },
  data() {
    return {
      selectedTabIndex: 0,
      selectedUnit: null,
      tabs: ["Challenges", "Summary", "Books", "Quiz", "Videos"],
      knownSchoolTabs: [
        "Challenges",
        "Summary",
        "Books",
        "Quiz",
        "Videos",
        "Assignments",
        "Notes",
      ],
      units: null,
      state: { loadingUnits: true, unitsAvailable: false },
    };
  },
  computed: {
    courseID() {
      return this.$route.params.courseID;
    },
    showUnits() {
      return this.units ? true : false;
    },
    userID() {
      return this.$store.state.student.studentData.user_id;
    },
    user() {
      return this.$store.state.student.studentData;
    },
    shownTabs() {
      return this.user.status == "knownschool"
        ? this.knownSchoolTabs
        : this.tabs;
    },
  },
  beforeMount() {
    if (!Array.isArray(this.units)) this.fetchUnits();
    else this.state.loadingUnits = false;
    console.log(this.user.status);
  },
  methods: {
    fetchUnits() {
      this.state.loadingUnits = true;
      this.state.unitsAvailable = false;
      const reqData = {
        action: "getUnits",
        subjectName: this.courseID,
        userId: this.userID,
        userType: "student",
      };
      this.axios
        .post("getcourse", reqData)
        .then((res) => {
          console.log(res);
          if (res.data && res.data.length && res.data.length > 0) {
            this.units = res.data;
            this.selectedUnit = res.data[0];
          }
          this.state.loadingUnits = false;
          this.state.unitsAvailable = true;
        })
        .catch((err) => {
          console.log(err);
          this.state.loadingUnits = false;
          this.state.unitsAvailable = true;
        });
    },
    setTab(index) {
      if (isNaN(index)) return;
      if (index == this.selectedTabIndex) return;
      this.$set(this, "selectedTabIndex", index);
    },
    setUnit(unit) {
      this.$set(this, "selectedUnit", unit);
    },
  },
};
</script>

<style lang="scss" scoped>
#course-details {
  padding: 1rem;
  padding-top: 1.5rem;
  border-radius: 5px;
  margin: 1rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: auto;

  .unit {
    font-size: 0.85rem;
  }
}
.course-tabs {
  width: calc(100% + 2rem);
  margin: 1rem -1rem 1rem -1rem;
  border-bottom: 2px solid #dddddd;
  display: flex;
  flex-wrap: nowrap;

  .tab {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 10px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    user-select: none;
    font-weight: 400;
    &:first-child {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    &::after {
      content: "";
      height: 0.25rem;
      position: absolute;
      width: calc(100% - 1rem);
      left: 0.55rem;
      bottom: -2px;
      border-radius: 2px;
      transition: all 250ms ease-in;
    }
    &.active {
      &::after {
        background: var(--primary);
      }
    }
  }
}
@media (max-width: 670px) {
  .course-tabs .tab {
    &:first-child {
      padding-right: 0.5rem;

      &::after {
        width: calc(100% - 1rem);
        left: 0.8rem;
      }
    }
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.85rem;

    &::after {
      width: calc(100% - 0.25rem);
      left: 0.15rem;
    }
  }
}
</style>