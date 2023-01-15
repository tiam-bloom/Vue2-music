import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 全局事件总线版本
new Vue({
  render: h => h(App),
  beforeCreate() {
    // 安装全局事件总线 $bus
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
