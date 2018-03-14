import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


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
import MineMsg from "../page/user/mine-msg.vue"
import OrderMsg from '../page/user/order-msg.vue'
import AdminLogin from "../page/admin/login.vue"
import AdminHome from "../page/admin/home.vue"
import AdminStoreMsg from '../page/admin//store/store-msg.vue'
// import AdminStoreMsg from '../page/admin/store-food.vue'

// 配置路由规则
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path:"/order",
    component:Order
  },
  {
    path:"/order/oreder-msg",
    component:OrderMsg
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
    path:"/mine",
    component:Mine
  },
  {
    path:"/mine/shop-ads",
    component:ShopAds
  },
  {
    path:"/mine/add-ads",
    component:AddAds
  },
  {
    path:"/mine/mine-msg",
    component:MineMsg
  },
  // 管理员
  {
    path:"/admin/login",
    component:AdminLogin
  },
  {
    path: '/admin',
    component: AdminHome,
    name: '管理系统首页',
    iconCls: 'el-icon-message',//图标样式class
    children: [
        { path: '/admin/store-msg', component: AdminStoreMsg, name: '店铺信息详情', hidden: true },
    ]
},

]

// 创建并导出路由
export default new Router({
  routes
})

















































































