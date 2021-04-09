<template>
  <sidebar-menu
    :menu="menu"
    :showOneChild="true"
    theme="white-theme"
    class="bg-light school-nav"
    width="280px"
    widthCollapsed="60px"
    :relative="true"
  />
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Navigation",
          hiddenOnCollapse: true,
        },
        {
          href: { path: "/school/students/1" },
          title: "Students",
          icon: "fa fa-graduation-cap",
        },
        {
          href: { path: "/school/teachers" },
          title: "Teachers",
          icon: "fa fa-male",
        },
        {
          href: { path: "/school/assignments" },
          title: "Assignments",
          icon: "fa fa-copy",
        },
        {
          href: { path: "/school/notes" },
          title: "Notes",
          icon: "fa fa-bookmark",
        },
        {
          href: { path: "/school/books" },
          title: "Books",
          icon: "fa fa-book",
        },
        {
          href: { path: "/school/summaries" },
          title: "Summaries",
          icon: "fa fa-file-word",
        },
        {
          href: { path: "/school/videos" },
          title: "Videos",
          icon: "fa fa-file-video",
        },
        {
          href: { path: "/school/quizes" },
          title: "quizes",
          icon: "fa fa-file-word",
        },
        {
          href: { path: "/school/messaging" },
          title: "Messaging",
          icon: "fa fa-envelope",
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.school-nav {
  height: 100vh !important;
  position: sticky !important;
  top: 0;
}
</style>