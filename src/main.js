// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 路由
import router from './router'

// 根组件
import App from './App'
import VueResource from "vue-resource"

// 导入jquery
import $ from 'jquery'
// 导入bootstar 实现滚动监听
import "../node_modules/bootstrap/dist/js/bootstrap.js"

Vue.config.productionTip = false
// 插入路由插件
Vue.use(VueResource);
// 设置默认路径
router.push('/home')

// 响应式[监听屏幕大小的改变]
function calcHtml(){
  var html = document.querySelector('html');
  var width = document.documentElement.clientHeight;
  html.style.fontSize = width / 375 *20 + 'px';
}
window.onresize = function(){
  // calcHtml();
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')