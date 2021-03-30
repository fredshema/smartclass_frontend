<template>
  <section id="sidebar">
    <ul class="navigations">
      <router-link
        to="/student/courses"
        exact-active-class="active"
        class="navs"
      >
        <li>
          <b-icon-journal-album scale="1.4" />
          <span> Courses </span>
        </li>
      </router-link>

      <!-- <router-link
        to="/student/quizes"
        exact-active-class="active"
        class="navs"
      >
        <li>
          <b-icon-question-square scale="1.4" />
          <span> Quizes </span>
        </li>
      </router-link> -->
    </ul>
    <div class="bottom">
      &copy; {{ new Date().getFullYear() }}&nbsp;
      <a href="https://smartclass.rw/"> smartclass.rw </a>
    </div>
  </section>
</template>

<script>
export default {
  name: "student-sidebar",
};
</script>

<style lang="scss" scoped>
#sidebar {
  flex: 1;
  border-radius: 5px;
  padding: 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f2f2f2;
  position: relative;
  width: 250px;
  max-width: 250px;
  margin: 15px;
  margin-right: 0;
}
.navs {
  color: inherit;
  text-decoration: none;
}
.navigations {
  list-style: none;
  padding: 0;

  .navs {
    padding: 1rem 1.25rem;
    border-radius: 5px;
    cursor: pointer;
    transition: 150ms linear;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    span {
      font-weight: 500;
      font-size: 16px;
      margin-left: 0.75rem;
    }

    &:hover,
    &:focus {
      background: rgba(0, 0, 0, 0.3);
    }

    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }
  .active {
    background: rgba(0, 0, 0, 0.2);
  }
}
.bottom {
  font-weight: 500;
}
@media (max-width: 670px) {
  #sidebar {
    position: fixed;
    min-height: calc(100vh - 100px);
    z-index: 999;
    left: -300px;
    transition: 250ms ease-in-out;
  }
  .active #sidebar {
    left: 0;
  }
}
</style>