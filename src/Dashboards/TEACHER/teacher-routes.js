import teacher from "./teacher.vue";

import {
  classes,
  CreateProfile,
  chatrooms,
  classDetails,
  Profile,
} from "./pages/index";

const routes = [
  {
    path: "/teacher",
    component: teacher,
    children: [
      {
        path: "",
        redirect: { name: "teacher-classes" },
        meta: { requireAuth: true },
      },
      {
        path: "classes",
        name: "teacher-classes",
        component: classes,
        meta: { requireAuth: true },
      },
      {
        path: "chatrooms",
        name: "teacher-chatrooms",
        component: chatrooms,
        meta: { requireAuth: true },
      },
      {
        path: "class/:classID",
        name: "teacher-class-details",
        component: classDetails,
        meta: { requireAuth: true },
      },
      {
        path: "profile",
        name: "teacher-profile",
        component: Profile,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/teacher/create-profile/:teacherID",
    name: "create-teacher-profile",
    component: CreateProfile,
    props: true,
    meta: { requireAuth: true },
  },
];

export default routes;
