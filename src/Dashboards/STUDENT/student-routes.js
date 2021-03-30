import student from "./student.vue";

import {
  courses,
  CreateProfile,
  chatrooms,
  quizes,
  CourseDetails,
  Profile
} from "./pages/index";

const routes = [
  {
    path: "/student",
    component: student,
    children: [
      {
        path: "",
        redirect: { name: "student-courses" },
        meta: { requireAuth: true },
      },
      {
        path: "courses",
        name: "student-courses",
        component: courses,
        meta: { requireAuth: true },
      },
      {
        path: "chatrooms",
        name: "student-chatrooms",
        component: chatrooms,
        meta: { requireAuth: true },
      },
      {
        path: "quizes",
        name: "student-quizes",
        component: quizes,
        meta: { requireAuth: true },
      },
      {
        path: "course/:courseID",
        name: "student-course-details",
        component: CourseDetails,
        meta: { requireAuth: true },
      },
      {
        path: "profile",
        name: "student-profile",
        component: Profile,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/student/create-profile/:studentID",
    name: "create-student-profile",
    component: CreateProfile,
    props: true,
    meta: { requireAuth: true },
  },
];

export default routes;
