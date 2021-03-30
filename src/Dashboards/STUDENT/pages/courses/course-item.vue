<template>
  <div class="box" v-if="course" @click.once="goToCourse">
    <div class="image">
      <div :class="String(course.subjectName).toLowerCase()"></div>
    </div>
    <article class="d-flex flex-1 flex-column pl-3">
      <h5 class="mb-0 text-uppercase text-truncate">
        {{ course.subjectName }}
      </h5>
      <h6 class="d-flex justify-content-start align-items-end">
        <span class="text-muted">challenges:</span>
        <span class="ml-2 mt-2">
          <b> {{ course.subject }}</b>
        </span>
      </h6>
    </article>
  </div>
</template>

<script>
export default {
  name: "course-item-component",
  props: {
    course: {
      type: Object,
      default: null,
    },
  },
  methods: {
    goToCourse() {
      this.$router.push(`/student/course/${this.course.subjectName}`);
      sessionStorage.setItem("selectedCourse", this.course.subject);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  overflow-x: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background: #0000000d;
  padding: 0.4rem;
  cursor: pointer;
  transition: 200ms linear;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  .image {
    height: 100px;
    width: 100px;
    min-width: 80px;
    border-radius: inherit;
    background: var(--primary);
    padding: 1.5rem;

    div {
      width: 100%;
      background-size: cover;
      height: 100%;

      &.history {
        background-image: url("../../../../assets/img/courses/history.png");
      }
      &.biology {
        background-image: url("../../../../assets/img/courses/biology.png");
      }
      &.geography {
        background-image: url("../../../../assets/img/courses/geography.png");
      }
      &.mathematics {
        background-image: url("../../../../assets/img/courses/maths.png");
      }
      &.physics {
        background-image: url("../../../../assets/img/courses/physics.png");
      }
      &.english {
        background-image: url("../../../../assets/img/courses/languages.png");
      }
      &.ict {
        background-image: url("../../../../assets/img/courses/ict.png");
      }
      &.kinyarwanda {
        background-image: url("../../../../assets/img/courses/languages.png");
      }
      &.enterprenuership {
        background-image: url("../../../../assets/img/courses/finance.png");
      }
      &.chemistry {
        background-image: url("../../../../assets/img/courses/chemistry.png");
      }
      &.architecture {
        background-image: url("../../../../assets/img/courses/architecture.png");
      }
      &.gp {
        background-image: url("../../../../assets/img/courses/gp.png");
      }
      &.kiswahili {
        background-image: url("../../../../assets/img/courses/languages.png");
      }
    }
  }
}
.number {
  line-height: 1.3;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 1px;
}
</style>