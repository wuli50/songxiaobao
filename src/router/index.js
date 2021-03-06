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
import StoreClass from '../page/user/store-class.vue'

import AdminLogin from "../page/admin/login.vue"
import AdminHome from "../page/admin/home.vue"
import AdminStoreMsg from '../page/admin/store/store-msg.vue'
import AdminStoreFood from '../page/admin//store/store-food.vue'
import AdminUserMsg from '../page/admin/user/user-msg.vue'
import AdminUserOrder from '../page/admin/user/user-order.vue'

import StoreLogin from "../page/store/login.vue"
import StoreHome from "../page/store/home.vue"
import StoreMsg from '../page/store/store-msg.vue'
import StoreFood from '../page/store/store-food.vue'
import StoreOrder from '../page/store/store-order.vue'


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
    path:"/order/oreder-msg/:_id",
    name:"oredermsg",
    component:OrderMsg
  },
  {
    path:"/home/store/:_id",
    name:"store",
    component:Store
  },
  {
    path:"/home/store-class/:type",
    name:"storeclass",
    component:StoreClass
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
        { path: '/admin/store-msg', component: AdminStoreMsg, name: '店铺基本信息', hidden: true },
        { path: '/admin/store-food', component: AdminStoreFood, name: '店铺食物信息', hidden: true },
        
        { path: '/admin/user-msg', component: AdminUserMsg, name: '用户基本信息', hidden: true },
        { path: '/admin/user-order', component: AdminUserOrder, name: '用户订单信息', hidden: true },
      ]
    },
    // 店家
    {
      path:"/store/login",
      component:StoreLogin
    },
    {
      path: '/store',
      component: StoreHome,
      name: '我的店铺',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/store/store-msg', component: StoreMsg, name: '店铺信息详情', hidden: true },
          { path: '/store/store-food', component: StoreFood, name: '店铺菜品详情', hidden: true },
          { path: '/store/store-order', component: StoreOrder, name: '店铺订单信息', hidden: true },
        ]
      },

]

// 创建并导出路由
export default new Router({
  routes
})

















































































