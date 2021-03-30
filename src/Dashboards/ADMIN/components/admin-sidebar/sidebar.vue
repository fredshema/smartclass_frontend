<template>
  <sidebar-menu
    :menu="menu"
    :showOneChild="true"
    theme="white-theme"
    class="bg-light admin-nav"
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
          href: { path: "/admin/home" },
          title: "Home",
          icon: "fa fa-home",
        },
        {
          href: { path: "/admin/announcements" },
          title: "Announcements",
          icon: "fa fa-bell",
        },
        {
          href: { path: "/admin/students/1" },
          title: "Students",
          icon: "fa fa-graduation-cap",
        },
        {
          href: { path: "/admin/teachers" },
          title: "Teachers",
          icon: "fa fa-male",
        },
        {
          href: { path: "/admin/schools" },
          title: "Schools",
          icon: "fa fa-university",
        },
        {
          href: { path: "/admin/mentors" },
          title: "Mentors",
          icon: "fa fa-user-secret",
        },
        {
          href: { path: "/admin/chatroom" },
          title: "Chatroom",
          icon: "fa fa-list-alt",
        },
        {
          href: { path: "/admin/blog-posts" },
          title: "Blog Posts",
          icon: "fa fa-list-alt",
        },
        {
          title: "Resources",
          icon: "fa fa-folder",
          child: [
            {
              href: { path: "/admin/resources/quizes" },
              title: "Quizes",
            },
            {
              href: { path: "/admin/resources/books" },
              title: "Books",
            },
            {
              href: { path: "/admin/resources/papers" },
              title: "Papers",
            },
            {
              href: { path: "/admin/resources/videos" },
              title: "Videos",
            },
            {
              href: { path: "/admin/resources/summaries" },
              title: "Summaries",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.admin-nav {
  height: 100vh !important;
  position: sticky !important;
  top: 0;
}
</style>