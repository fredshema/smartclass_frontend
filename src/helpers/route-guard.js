import decode from "jwt-decode";
import store from "../store/index";
import appRouter from "../router/index";

export default (to, from, next) => {
  const token = sessionStorage.getItem("token");
  if (!!token) {
    isLoggedIn(to, next);
  } else {
    isNotLoggedIn(to, next);
  }
};

function isLoggedIn(to, next) {
  if (to.matched.some((record) => record.meta.guest)) {
    navigateToUserPage(to, next);
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    setUserData(to, next);
  } else if (to.matched.some((record) => record.meta.helper)) {
    next();
  } else if (to.matched.some((record) => record.meta.notFound)) {
    next();
  }
}

function isNotLoggedIn(to, next) {
  if (to.matched.some((record) => record.meta.guest)) {
    next();
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    goToRoute("/login", next);
  } else if (to.matched.some((record) => record.meta.helper)) {
    next();
  } else if (to.matched.some((record) => record.meta.notFound)) {
    next();
  }
}

function navigateToUserPage(to, next) {
  const token = sessionStorage.getItem("token");
  const tokenData = decode(token);

  switch (tokenData.data.user_type) {
    case "student":
      goToRoute("/student", next);
      break;
    case "admin":
      goToRoute("/admin", next);
      break;
    case "teacher":
      goToRoute("/teacher", next);
      break;
    case "schoolAD":
      goToRoute("/school", next);
      break;
    default:
      goToRoute("/login", next);
      break;
  }
}

function setUserData(to, next) {
  const token = sessionStorage.getItem("token");
  const tokenData = decode(token);
  switch (tokenData.data.user_type) {
    case "student":
      store.dispatch("student/setStudentData", tokenData.data);
      if (!to.path.includes("student")) {
        next("/student");
      } else {
        next();
      }
      break;
    case "admin":
      store.dispatch("admin/setAdminData", tokenData.data);
      if (!to.path.includes("admin")) {
        next("/admin");
      } else {
        next();
      }
      break;
      case "teacher":
        store.dispatch("teacher/setTeacherData", tokenData.data);
        if (!to.path.includes("teacher")) {
          next("/teacher");
        } else {
          next();
        }
        break;
      case "schoolAD":
        store.dispatch("school/setSchoolData", tokenData.data);
        if (!to.path.includes("school")) {
          next("/school");
        } else {
          next();
        }
        break;
    }
}

function goToRoute(route, next) {
  if (appRouter.currentRoute.path != route) {
    next(route);
  }
}
