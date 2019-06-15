import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";

import "./axios";
// import "./http";

// 如果你想组件内使用 Vue Router 导航钩子，你必须注册一次：
import { Component } from "vue-property-decorator";
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
