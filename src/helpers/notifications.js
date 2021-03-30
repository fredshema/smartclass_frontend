import Vue from "vue";

const notificationBus = new Vue();
Vue.prototype.$bus = notificationBus;
Vue.prototype.$notify = (param) => {
  if (!param) return;
  console.log(param);
  const title = param.title || "";
  const message = param.message || "";
  const status = `alert-${param.status || "success"}`;
  const timeout = param.timeout || 4000;
  const parmanent = param.parmanent || false;

  notificationBus.$emit("notify-me", {
    permanent: parmanent,
    timeout: timeout,
    status: status,
    data: {
      title: title,
      text: message,
    },
  });
};
