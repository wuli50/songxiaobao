import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 设置eventbus来传值
window.eventBus = new Vue()

// import Hello from '@/components/Hello'

// 导入组件
// import Home from '@/components/HelloFromVux'
import Home from '../page/user/home.vue'
import Mine from "../page/user/mine.vue"
import Store from "../page/user/store.vue"
import Order from "../page/user/order.vue"
import Findstore from "../page/user/find.vue"
import Storeorder from "../page/user/store-order.vue"
import Login from "../page/user/login.vue"
import ShopAds from '../page/user/shop-ads.vue'
import AddAds from "../page/user/add-ads.vue"

// 配置路由规则
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path:"/mine",
    component:Mine
  },
  {
    path:"/order",
    component:Order
  },
  {
    path:"/home/store/:id",
    name:"store",
    component:Store
  },
  {
    path:"/findstore",
    component:Findstore
  },
  {
    path:"/store-order",
    component:Storeorder
  },
  {
    path:"/login",
    component:Login
  },
  {
    path:"/mine/shop-ads",
    component:ShopAds
  },
  {
    path:"/mine/add-ads",
    component:AddAds
  }

]

// 创建并导出路由
export default new Router({
  routes
})

















































































