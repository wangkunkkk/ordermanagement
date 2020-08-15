import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.use(ElementUI);
// 全局bus
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')