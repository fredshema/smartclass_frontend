import adminView from "./admin-view.vue";

import {
  Announcements,
  BlogPosts,
  Books,
  Teachers,
  Videos,
  Students,
  Summaries,
  Schools,
  Mentors,
  Combinations,
  PrivateLibary,
  Home,
  Modules,
  Papers,
  Quizes,
  Quiz,
  AdminProfile,
  Chatroom
} from "./pages";

const routes = [
  {
    path: "/admin",
    component: adminView,
    children: [
      {
        path: "",
        redirect: { name: "admin-metrics" },
        meta: { requireAuth: true },
      },
      {
        path: "home",
        name: "admin-metrics",
        component: Home,
        meta: { requireAuth: true },
      },
      {
        path: "profile",
        name: "admin-profile",
        component: AdminProfile,
        meta: { requireAuth: true },
      },
      {
        path: "announcements",
        name: "admin-announcements",
        component: Announcements,
        meta: { requireAuth: true },
      },
      {
        path: "students/:page",
        name: "admin-students",
        component: Students,
        meta: { requireAuth: true },
      },
      {
        path: "teachers",
        name: "admin-teachers",
        component: Teachers,
        meta: { requireAuth: true },
      },
      {
        path: "schools",
        name: "admin-schools",
        component: Schools,
        meta: { requireAuth: true },
      },
      {
        path: "mentors",
        name: "admin-mentors",
        component: Mentors,
        meta: { requireAuth: true },
      },
      {
        path: "blog-posts",
        name: "admin-blog-posts",
        component: BlogPosts,
        meta: { requireAuth: true },
      },
      {
        path: "chatroom",
        name: "admin-chatroom",
        component: Chatroom,
        meta: { requireAuth: true },
      },
      {
        path: "resources/books",
        name: "admin-resources-books",
        component: Books,
        meta: { requireAuth: true },
      },
      {
        path: "resources/papers",
        name: "admin-resources-papers",
        component: Papers,
        meta: { requireAuth: true },
      },
      {
        path: "resources/videos",
        name: "admin-resources-videos",
        component: Videos,
        meta: { requireAuth: true },
      },
      {
        path: "resources/quizes",
        name: "admin-resources-quizes",
        component: Quizes,
        meta: { requireAuth: true },
      },
      {
        path: "resources/quiz/:id",
        name: "admin-resources-quiz",
        component: Quiz,
        meta: { requireAuth: true },
      },
      {
        path: "resources/summaries",
        name: "admin-resources-summaries",
        component: Summaries,
        meta: { requireAuth: true },
      },
      {
        path: "accessories/modules",
        name: "admin-accessories-modules",
        component: Modules,
        meta: { requireAuth: true },
      },
      {
        path: "accessories/combinations",
        name: "admin-accessories-combinations",
        component: Combinations,
        meta: { requireAuth: true },
      },
      {
        path: "accessories/library",
        name: "admin-accessories-library",
        component: PrivateLibary,
        meta: { requireAuth: true },
      },
    ],
  },
];

export default routes;
