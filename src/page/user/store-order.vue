<template>
<div class="order">
  <back-header>确认订单</back-header>
  <div class="header">
    <card class="ads-card"
     :header="{title: '我的收货地址' }">
      <div slot="content" class="card-content">
        {{address.message}}
        <div class="ads-box">
          <span>{{address.order_name}}</span>
          <span>{{address.order_pho}}</span>
        </div>
      </div>
      
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
      <router-link  to="/mine/add-ads" class="add-ads">
        <div>+添加一个收货地址</div>
      </router-link>
      <div class="add-ads">
        <div @click="showMoreAds = false"> 关闭 </div>
      </div>
    </popup>
  </div>
  <div class="main">
    <div class="order-card">
      <group class="buy-way">
        <popup-radio title="请选择支付方式" :options="optionsBuy" v-model="option">
          <p slot="popup-header" class="buy-title">请选择支付方式</p>
        </popup-radio>
    </group>
    </div>

    <ul class="order-card">
      <li class="order-card-title">{{order.storeName}}</li>
      <li v-for="order in order.orderMsg">
        <span class="food">{{order.name}}</span>
        <span>X{{order.num}}</span>
        <span class="foodprice">{{order.price}}</span>
      </li>
      <li class="order-card-title">
        <span class="food"></span>
        <span>{{order.allNum}}</span>
        <span class="foodprice">￥{{order.allprice.toFixed(2)}}</span>
      </li>
    </ul>
  </div>

  <div class="footer">
    <div class="allprice">￥{{order.allprice.toFixed(2)}}</div>
    <div class="buyfood">
        <p @click="buyConfirm = !buyConfirm">确认支付</p>
    </div>
  </div>

  <div v-transfer-dom>
    <!--on-cancel	 	点击取消按钮时触发	
        on-confirm	(value)	点击确定按钮时触发, 参数为prompt中输入的值	
        on-show	 	弹窗出现时触发	
        on-hide	 	弹窗隐藏时触发 -->
    <confirm v-model="buyConfirm"
    :title="确认付款"
    @on-cancel="callOredrConfirm = !callOredrConfirm"
    @on-confirm="affOrder">
      <p style="text-align:center;">你将支付{{order.allprice.toFixed(2)}},确认付款么？</p>
    </confirm>
    <confirm v-model="callOredrConfirm"
    :title="取消订单"
    @on-confirm="onconfirm">
      <p style="text-align:center;">您将取消订单，确定么？？？？</p>
    </confirm>
    <toast v-model="showcelltoast" type="text" :time="800" is-show-mask="true"  :position="middle">正在跳转...</toast>
    <toast v-model="showAfftoast" type="text" :time="800" is-show-mask="true"  :position="middle" @on-hide="toOrderMsg">正在支付中...</toast>
    <toast v-model="showtoast" type="text" :time="800" is-show-mask="true"  :position="middle">支付完成</toast>
  </div>
</div>

 
</template>
<script>
import bus from "../../bus.js";
import backHeader from "../../components/backHeader"
import {Card,Popup,Group,PopupRadio,Confirm,Toast} from "vux"
export default {
  name:"store-order",
  data(){
      return {
        address:{
          message:'地址详情',
          order_name:"小宝",
          order_pho:12345678945
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
        // 订单信息
        order:{},
        // 支付方式
        option:"支付宝",
        optionsBuy:[
          '支付宝','微信'
        ],
        // 确认付款
        buyConfirm:false,
        showcelltoast:false,
        showAfftoast:false,
        showtoast:false,
        callOredrConfirm:false
      }
  },
    // 注册组件
  components:{
    backHeader,
    Card,Popup,Group,PopupRadio,Confirm,Toast
  },
  methods:{
    // 取消订单
    onconfirm(){
      var that = this;
      this.showtoast = !this.showtoast;
      setTimeout(() => {
        that.$router.push({ path: '/home/store/'+ that.order.storeId})
      }, 1000);
    },
    // 确认订单
    affOrder(){
      var that = this;
      this.showAfftoast = !this.showAfftoast;
      setTimeout(() => {
        this.showtoast = !this.showtoast;
      }, 1000);
    },
    toOrderMsg(){
      //将订单信息存入数据库，跳转订单详情 
      setTimeout(() => {
        this.$router.push({ path: '/order-msg'})
      }, 1000);
    }
  },
  created(){
    bus.$on("orderMessage",message =>{
      this.order = message;
    })
  },
  beforeDestroy () {
    bus.$off("orderMessage",this.order);
    this.order.option_way = this.option;
    this.order.order_ads = this.address;
    this.order.is_option = true;
    this.order.order_time = new Date();
    bus.$emit('orderMessage',this.order)
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
      .ads-box{
          display: flex;
          justify-content: space-between;
          color: #888;
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
    .add-ads{
      width: 100%;
      div{
        padding: 0.5vw;
        border: 1px solid #0091FF;
        margin: 3vw 10vw;
        text-align: center;
        border-radius: 1vw;
        line-height: 8vw;
        color: #0091FF;
        font-weight: bold;
      }
    }
  }
  .main{
    padding: 2vw;
    .order-card{
      background-color: white;
      padding: 3vw;
      margin: 3vw;
      color: #555;
      li{
       display: flex;
       justify-content: space-between; 
       .food{
         flex-grow:1;
       }
       .foodprice{
         display: block;
         width: 20vw;
         text-align: right;
       }
      }
      .order-card-title{
        font-size: 4vw;
        font-weight: 600;
      }
      // 选择支付方式
      .buy-way{
        .weui-cells.vux-no-group-title{
          margin-top: 0;
          font-size: 5vw;
          .weui-cell{
            font-size: 3vw;
            padding: 2vw;
            .vux-cell-bd.vux-no-group-title{
              line-height: 5vw;
            }
            .vux-cell-bd.vux-no-group-title>p{
              margin: 0;
            }
          }
        }
      }
    }
  }
  .footer{
    width: 100%;
    position: fixed;
    background-color: rgba(1, 1, 1, 0.6);
    color: white;
    display: flex;
    justify-content: space-between;
    height: 15vw;
    align-items: center;
    bottom: 0;
    font-size: 5vw;
    font-weight: 600;
    .allprice{
      margin-left: 5vw;
    }
    .buyfood{
      background-color: #0091FF;
      width: 30vw;
      line-height: 15vw;
      text-align: center;
      font-size: 4.5vw;
      p{
        margin: 0;
      }
    }
  }
  .buy-title{
    text-align: center;
    font-size: 4vw;
    color: #555;
    font-weight: 600;
  }
</style>



