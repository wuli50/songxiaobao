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
        <span></span>
        <span></span>
        <span>总价</span>
      </li>
    </ul>
  </div>

  <div class="footer">
    <div class="allprice">10000.00</div>
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
    @on-cancel="onCancel">
      <p style="text-align:center;">你将支付{{总价}},确认付款么？</p>
    </confirm>
  </div>
</div>

 
</template>
<script>
import backHeader from "../../components/backHeader"
import {Card,Popup,Group,PopupRadio,Confirm} from "vux"
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
        // 订单信息
        order:{},
        // 支付方式
        option:"支付宝",
        optionsBuy:[
          '支付宝','微信'
        ],
        // 确认付款
        buyConfirm:false

      }
  },
    // 注册组件
  components:{
    backHeader,
    Card,Popup,Group,PopupRadio,Confirm
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
    }
  }
  .buy-title{
    text-align: center;
    font-size: 4vw;
    color: #555;
    font-weight: 600;
  }
</style>



