import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../store/index";
import router from "../router/index";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
});

axios.interceptors.request.use(
  (config) => {
    //  Generate cancel token source
    let source = axios.CancelToken.source();

    // Set cancel token on this request
    config.cancelToken = source.token;

    // Add to vuex to make cancellation available from anywhere
    store.commit("ADD_CANCEL_TOKEN", source);

    if (sessionStorage.getItem("token"))
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");

    console.log(config);

    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    console.log(error);
    console.log(error.code);
    console.log(error.request);
    console.log(error.response);
    console.log(error.errorMessage);
    try {
      if (error.response && error.response.status === 401)
        router.push("/logout");
      else if (error.response && error.response.status === 404)
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        )
          return Promise.reject({
            errorMessage: error.response.data.message,
          });
        else
          return Promise.reject({
            errorMessage: "can't find the resource you are searching for!",
          });
      else if (error.code === "ECONNABORTED")
        return Promise.reject({
          errorMessage: "Your connection is weak! try again",
        });
      else if (axios.isCancel(error)) return;
      else
        return Promise.reject({
          errorMessage: error.response.data.message || error,
        });
    } catch {
      return Promise.reject({
        errorMessage: "something is wrong! try refreshing this page",
      });
    }
  }
);
Vue.use(VueAxios, axiosInstance);
