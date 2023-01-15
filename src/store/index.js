import Vue from "vue";
import Vuex from "vuex";

import pageState from "./pageState";
import search from "./search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pageState,
    search,
  },
});
