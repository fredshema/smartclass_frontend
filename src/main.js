import "core-js/stable";
import "regenerator-runtime/runtime";
import "intersection-observer";
import "./helpers/axios";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss";
import {
  BootstrapVue,
  BIconBell,
  BIconPersonCircle,
  BIconJournalAlbum,
  BIconChatLeftDots,
  BIconQuestionSquare,
  BIconArrowLeft,
  BIconCaretDownSquareFill,
  BIconCloudDownload,
  BIconArrowRepeat,
  BIconX,
  BIconPlusSquare,
  BIconXCircle,
  BIconTrashFill,
  BIconSearch,
  BIconArrowRightCircleFill
} from "bootstrap-vue";
import spinner from "./components/spinner.vue";
import vueSmoothScroll from "vue-smooth-scroll";
import VueNumber from "vue-number-animation";
import AppLoading from "./components/AppLoading/AppLoading.vue";
import "./helpers/notifications";
import Vuelidate from "vuelidate";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import VueSidebarMenu from "vue-sidebar-menu";
import LoadingButton from "./components/custom-button/loading-button.vue"

Vue.component("BIconBell", BIconBell);
Vue.component("BIconX", BIconX);
Vue.component("BIconArrowRightCircleFill", BIconArrowRightCircleFill);
Vue.component("BIconSearch", BIconSearch);
Vue.component("BIconTrashFill", BIconTrashFill);
Vue.component("BIconXCircle", BIconXCircle);
Vue.component("BIconPlusSquare", BIconPlusSquare);
Vue.component("BIconArrowRepeat", BIconArrowRepeat);
Vue.component("BIconCloudDownload", BIconCloudDownload);
Vue.component("BIconCaretDownSquareFill", BIconCaretDownSquareFill);
Vue.component("BIconArrowLeft", BIconArrowLeft);
Vue.component("BIconChatLeftDots", BIconChatLeftDots);
Vue.component("BIconQuestionSquare", BIconQuestionSquare);
Vue.component("BIconJournalAlbum", BIconJournalAlbum);
Vue.component("BIconPersonCircle", BIconPersonCircle);
Vue.component("spinner", spinner);
Vue.component("AppLoading", AppLoading);
Vue.component("LoadingButton", LoadingButton);

Vue.use(Vuelidate);
Vue.use(vueSmoothScroll);
Vue.use(VueNumber);
Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);
Vue.use(CKEditor);

Vue.prototype.$title = (title) =>
  (document.title = `${title ? title : "Welcome"} | Smartclass`);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
