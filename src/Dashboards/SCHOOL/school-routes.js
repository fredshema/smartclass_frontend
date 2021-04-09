import schoolView from "./school-view.vue";

import {
  Students,
  Quiz,
  Quizes,
  Teachers,
  schoolProfile,
  Assignments,
  Notes,
  Books,
  Summaries,
  Chatroom,
  Messaging
} from "./pages";

const routes = [
  {
    path: "/school",
    component: schoolView,
    meta: { requireAuth: true },
    children: [
      {
        path: "",
        redirect: { name: "school-teachers" },
        meta: { requireAuth: true },
      },
      {
        path: "teachers",
        name: "school-teachers",
        component: Teachers,
        meta: { requireAuth: true },
      },
      {
        path: "students/:page",
        name: "school-students",
        component: Students,
        meta: { requireAuth: true },
      },
      {
        path: "assignments",
        name: "school-assignments",
        component: Assignments,
        meta: { requireAuth: true },
      },
      {
        path: "messaging",
        name: "school-messaging",
        component: Messaging,
        meta: { requireAuth: true },
      },
      {
        path: "chatroom",
        name: "school-chatrooms",
        component: Chatroom,
        meta: { requireAuth: true },
      },
      {
        path: "notes",
        name: "school-notes",
        component: Notes,
        meta: { requireAuth: true },
      },
      {
        path: "summaries",
        name: "school-summaries",
        component: Summaries,
        meta: { requireAuth: true },
      },
      {
        path: "books",
        name: "school-books",
        component: Books,
        meta: { requireAuth: true },
      },
      {
        path: "quizes",
        name: "school-quizes",
        component: Quizes,
        meta: { requireAuth: true },
      },
      {
        path: "quiz/:id",
        name: "school-quiz",
        component: Quiz,
        meta: { requireAuth: true },
      },
      {
        path: "profile",
        name: "school-profile",
        component: schoolProfile,
        meta: { requireAuth: true },
      },
    ],
  },
];

export default routes;
