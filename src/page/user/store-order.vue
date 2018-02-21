<template>
<div class="order">
  <back-header>确认订单</back-header>
  <div class="header">
    <card class="ads-card"
     :header="{title: '我的收货地址' }">
      <p slot="content" class="card-content">
        {{address.message}}
      </p>
      <div slot="footer" class="ads-footer">
        <p @click="showMoreAds = true">点击切换地址</p>
      </div>
    </card>
    <!-- 地址切换详情 -->
    <popup v-model="showMoreAds" position="bottom" max-height="50%">
      <group class="ads-list">
        <cell v-for="ads in adsList">
          <div class="ads-message">
            <p class="adsmsg">{{ads.adsmsg}}</p>
            <p>{{ads.orderName}}</p>
            <p>{{ads.orderPho}}</p>
          </div>
        </cell>
      </group>
      <div style="padding: 15px;text-align: right;">
        <x-button @click="showMoreAds = false" plain type="primary"> 关闭 </x-button>
      </div>
    </popup>
  </div>
  <div class="main">
    <ul class="order-card">
      <li class="order-card-title">{{order.storeName}}</li>
      <li v-for="order in order.orderMsg">
        <span>{{order.name}}</span>
        <span>X{{order.num}}</span>
        <span>{{order.price}}</span>
      </li>
      <li class="order-card-title">
        <span></span>
        <span></span>
        <span>总价</span>
      </li>
    </ul>
  </div>

  <div class="footer">
    <div>总价</div>
    <div>确认支付</div>
  </div>
</div>
 
</template>
<script>
import backHeader from "../../components/backHeader"
import {Card,Popup,Group} from "vux"
export default {
  name:"store-order",
  data(){
      return {
        address:{
          message:'地址详情',
          allads:0,
        },
        showMoreAds:false,
        adsList:[{
          adsmsg:"地址详情1",
          orderName:"收货人姓名",
          orderPho:"收货人电话"
        },{
          adsmsg:"地址详情2",
          orderName:"收货人姓名",
          orderPho:"收货人电话"
        }],
        order:{}
      }
  },
    // 注册组件
  components:{
    backHeader,
    Card,Popup,Group
  },
  methods:{

  },
  created(){
    eventBus.$on("orderMessage",message =>{
      console.log(message)
      this.order = message;
    })
  },
  beforeDestroy () {
    eventBus.$off("orderMessage",this.order)
  }
}
</script>
<style lang="less" scoped>
  .header{
    padding: 3vw;
    background-color: #0091FF;
    .ads-card{
      padding: 0 3vw;
      .ads-footer{
        float: right;
        color: #0091FF;
      }
    }
    .ads-list{
      .ads-message{
        border-bottom: 1px solid #ddd;
        padding: 0vw 2vw;
      }
      p{
        font-size: 2.5vw;
        padding: 1.3vw;
        margin: 0;
      }
    }
    x-button{
      color: #0091FF;
      font-weight: 600;
      padding: 1vw;
      border-radius: 1vw;
      background-color: white;
    }
  }
  .main{
    padding: 5vw;
    .order-card{
      background-color: white;
      padding: 3vw;
      color: #555;
      li{
       display: flex;
       justify-content: space-between; 
      }
      .order-card-title{
        font-size: 4vw;
        font-weight: 600;
      }
    }
  }
</style>



