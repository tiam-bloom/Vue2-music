//   router/index.js
import VueRouter from "vue-router";
import Vue from "vue";
// 引入组件
import store from "../store";
// 插件一定要使用
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: { name: "home" },
    },
    {
      name: "home",
      path: "/home",
      component: () => import("../components/Home.vue"),
    },
    {
      name: "searchResult",
      // 可选参数? pageNO
      path: "/search/:keywords?/:pageNO?",
      component: () => import("../components/List.vue"),
      // 路由独享守卫, 在进入路由前调用, bug:再次搜索时不调用
      beforeEnter(to, from, next) {
        // 避免通过地址栏输入的参数为空
        if (to.params.keywords) {
          next();
        } else {
          router.app.$message({
            message: "请输入关键字",
            type: "warning",
            showClose: true,
            duration: 1000,
          });
          if (from.name !== "home") next({ name: "home" });
        }
      },
    },
    {
      name: "error",
      path: "/error",
      component: () => import("../components/Error.vue"),
    },
  ],
});
// 全局后置钩子, 初始化时, 和切换之后调用
// 也可以在组件中使用beforeRouteEnter替代
router.afterEach((to) => {
  if (to.name === "searchResult") {
    getSongList(to.params.keywords, to.params?.pageNO);
  }
});
async function getSongList(keywords, pageNO) {
  // console.log("getSongList", keywords, pageNO);
  // 避免通过地址栏输入的参数为空
  store.commit("search/setKeywords", keywords);
  store.commit("search/setCurPageNO", +pageNO || 1); // +pageNO 转换为数字, 无法转换时为NaN, NaN||1 为1
  // 打开加载动画
  store.commit("pageState/setLoading", true);
  await store.dispatch("search/getSongs", { keywords, pageNO });
  // 关闭加载动画
  store.commit("pageState/setLoading", false);
}

export default router;
