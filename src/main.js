// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 路由
import router from './router'

// 导入element
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';

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
Vue.use(ElementUI)
// 设置默认路径
router.push('/admin')

// cookie
Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};
Vue.prototype.getCookie = function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
     var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};

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
