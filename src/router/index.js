import Vue from "vue";
import VueRouter from "vue-router";

import RouteGuard from "../helpers/route-guard";

import splash from "../components/splash.vue";
import GuestHome from "../pages/GuestHome.vue";
import homepage from "../pages/homepage.vue";
import Login from "../pages/login.vue";
import Register from "../pages/Register.vue";
import GuestView from "../pages/Guest.vue";
import store from "../store/index";
import pricing from "../pages/pricing/pricing.vue";
import PaymentConfirmation from "../pages/pricing/payment-confirmation.vue";
import logout from "../pages/logout.vue";
import blog from "../pages/blog/posts-page.vue";

import studentRoutes from "../Dashboards/STUDENT/student-routes";
import teacherRoutes from "../Dashboards/TEACHER/teacher-routes";
import adminRoutes from "../Dashboards/ADMIN/admin-routes";
import schoolRoutes from "../Dashboards/SCHOOL/school-routes";
import mentorRoutes from "../Dashboards/MENTOR/mentor-routes";

Vue.use(VueRouter);

const AppRoutes = [
  {
    path: "/",
    component: GuestView,
    children: [
      {
        path: "",
        component: homepage,
        meta: {
          guest: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: "/splash",
    component: splash,
    meta: { helper: true },
  },
  {
    path: "/blog",
    component: blog,
    meta: {
      guest: true,
    },
  },
  {
    path: "/pricing/:userID",
    component: pricing,
    meta: { guest: true },
    props: true,
  },
  {
    path: "/payment-confirmation/:userID",
    component: PaymentConfirmation,
    meta: { guest: true },
    props: true,
  },
  {
    path: "/logout",
    component: logout,
    meta: { helper: true },
  },
];

const routes = [
  ...AppRoutes,
  ...studentRoutes,
  ...teacherRoutes,
  ...adminRoutes,
  ...schoolRoutes,
  ...mentorRoutes,
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("CANCEL_PENDING_REQUESTS");
  RouteGuard(to, from, next);
});

console.log("hello");

export default router;
