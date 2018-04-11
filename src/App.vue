<template>
  <div id="app">
    <div class="tab-bar"></div>
    <!-- 路由页面部分 -->

    <router-view></router-view>
    
    <!-- 底部导航条 -->
    <!--时候展示底部导航 -->
    <transition name="down" v-if = "isShow">
      <tabbar class="tabbar">
        <tabbar-item link = "/home">
          <img src="./assets/img/icon/icon-home.png" alt="" slot="icon">
          <img src="./assets/img/icon/icon-home-click.png" alt="" slot="icon-active">
        </tabbar-item>

        <tabbar-item link = "/order">
          <img src="./assets/img/icon/icon-order.png" alt="" slot="icon">
          <img src="./assets/img/icon/icon-order-click.png" alt="" slot="icon-active">
        </tabbar-item>
        <tabbar-item link = "/mine">
          <img src="./assets/img/icon/icon-my.png" alt="" slot="icon">
          <img src="./assets/img/icon/icon-my-click.png" alt="" slot="icon-active">
        </tabbar-item>
      </tabbar>
    </transition>
  </div>
</template>

<script>
// import $ from 'jquery'
// console.log($)
import { Tabbar, TabbarItem } from 'vux'
// 导入总线
import bus from './bus.js'

export default {
  name: 'app',
  data(){
  	return {
      Tabbar,
      TabbarItem,
      // 时候需要导航条
      isShow:true
  	}
  },
  // 注册插件
  components:{
    Tabbar,
    TabbarItem
  },
  methods:{
  },
  created(){
    bus.$on('show-bar',(value)=>{
      this.isShow = value;
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
// 通用样式
html,body,#app{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.clear{
  clear: both;
}
a{
  text-decoration:none;
}
a:hover{
  text-decoration: none;
}
ul,ul li{
  margin: 0;
  padding: 0;
  list-style: none;
}
.left{
    float: left;
}
.right{
    float: right;
}

body {
  background-color: #fbf9fe;
}

.tabbar{
  position: fixed !important;
  line-height: 10vw;
}
</style>
