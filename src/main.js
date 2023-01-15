import Vue from "vue";
import App from "./App.vue";
// 引入Vuex的store
import store from "./store";
import router from "./router";
Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// VueX+VueRouter
new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    console.log(
      "%c摩西摩西, 欢迎!",
      "color: #fff; background: #f40; font-size: 24px;border-radius:0 15px 15px 0;padding:10px;"
    );

    console.log(
      "%c                                           ",
      "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;width:1px;height:40px;padding:2px;"
    );
  },
}).$mount("#app");
