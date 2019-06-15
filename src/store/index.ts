import Vue from "vue";
import Vuex, { Store } from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";
// modules
// import user from './modules/user'

Vue.use(Vuex);

// console.log(state);

const store: Store<any> = new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  modules: {
    //添加自定义模块
  }
});

export default store;

// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);
// const state: any = {
//   test: `i'm value`
// };
// const getters: any = {
//   // test: state => state.test
// };
// const mutations: any = {};
// const actions: any = {};

// export default new Vuex.Store({
//   state,
//   getters,
//   mutations,
//   actions
// });
