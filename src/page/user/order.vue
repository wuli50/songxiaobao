<template>
<div class="user-page">
    <back-header>订单</back-header>
    <!-- 登录时的页面 -->
    <div class="online" v-if="online">
        <ul>
            <li class="a-order" v-for = "(order , index ) in orderList">
                <!-- 订单页 -->
                <ul>
                    <li class="order-header">
                        <img :src="order.store_image" alt="" class="left">
                        <div class="right">
                            <h2 class="order-title">{{order.store_name}} 
                                <span class="order-state" @click="option(order.all_price,order._id)">{{order.is_option?'已支付':'未支付'}}</span>
                            </h2>
                            <p>订单时间：<span>{{order.order_time}}</span></p>
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li class="order-main">
                        <span>{{order.order_list[0].name}}{{order.order_list.length>1 ?'等':''}}</span> 
                        <span>{{order.all_food_num}}件商品</span>
                        <span>共￥{{order.all_price}}元</span>
                    </li>
                    <li class="order-foot">
                        <div v-if="order.is_end == false" class="order-state">
                            <span>{{order.is_cell?'订单已取消':'取消订单'}}</span>
                            <span>确认送达</span>
                        </div>
                        <span v-else>订单已完成</span>
                        <router-link :to='{name:"oredermsg",params:{_id:order._id}}'>
                            <span>查看详情</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- 没登录的页面 -->
    <div class="not-online" v-else >
        <p>哎呀妈呀！你还没有登录呢，快去登录吧</p>
        <router-link :to='{path:"/login"}'>我要登录</router-link>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
      :title="确认付款"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
        <p style="text-align:center;">你将支付{{all_price}},付款么？</p>
      </confirm>
      <!-- 取消订单 -->
      <confirm v-model="showConfirm"
      :title="取消订单"
      @on-cancel="onCancel"
      @on-confirm="onCellConfirm">
        <p style="text-align:center;">你将支付{{all_price}},付款么？</p>
      </confirm>
      <toast v-model="showoptionend" type="text" :time="800" is-show-mask  :position="middle">支付成功</toast>
    </div>
</div>
</template>
<script>
import backHeader from "../../components/backHeader"
import {Confirm,Toast} from "vux"

export default {
  name:"order",
  data(){
      return {
          online:true,
          user_name:this.getCookie('username'),
          orderList:[],
          all_price:'',
          order_id:'',
          showConfirm:false,
          showoptionend:false
      }
  },
    // 注册组件
  components:{
      backHeader,Confirm,Toast
  },
  methods:{
    //   获取订单列表
      getOrderList(obj){
        var that = this;
        that.$http.post('/api/order-msg/find',obj,{emulateJSON: true})
        .then((data)=>{
            console.log(data)
            that.orderList = data.body.data;
        })
      },
    //   点击支付
      option(price,id){
          var that = this;
          that.all_price = price;
          that.order_id = id;
          that.showConfirm = !that.showConfirm
      },
    //   重新支付订单
    onConfirm(){
        var that = this;
        that.$http.post('/api/order-msg/update',{
            tip:{_id:that.order_id},
            message:{is_option:true}
        },{emulateJSON: true})
        .then((data)=>{
            if(data.body.state == 1){
                that.showoptionend = !that.showoptionend;
                that.getOrderList({user_name:that.user_name})
            }
            
        })
    }
  },
  created(){
      var that = this
      if(this.getCookie('username')){
          this.online = true
      }else{
          this.online = false
      }
      that.getOrderList({user_name:that.user_name})
  } 
}
</script>
<style scoped>
.online{
    background-color: #dfdfdf;
    height: 100%;
}
.a-order{
    border-bottom: 1px solid #dddddd;
    margin-bottom: 3vw;
    background-color: white;
    padding: 5vw 5vw 3vw;
}
.a-order ul li img{
    height: 10vw;
}
.a-order ul li h2{
    margin: 0;
    padding: 0;
    font-size: 4vw;
    font-weight: 600;
}
.a-order ul li p{
    color: #999999;
    font-size: 3vw;
}
.order-header{
    display: flex;
    justify-content: space-between;
}
.order-header .right{
    width: calc(100% - 15vw);
    margin-left: 5vw;
}
.order-title{
    display: flex;
    justify-content: space-between;
}
.order-state{
    font-size: 3.5vw;
    font-weight: 400;
    text-align: right;
    color: #FF6D0F;
}
.order-main {
    display: flex;
    justify-content: space-between;
    text-align: center;
    color:#999;
    margin-left: 20vw;
    margin-bottom: 5vw;
}
.order-foot{
    text-align: right;
    color: rgb(218, 117, 110);
}

.order-foot span{
    padding: 0.2vw 1vw;
    border: 1px solid #0081ff;
    border-radius: 1vw;
}
.order-state{
    margin: 1vw 0;
}
.order-state span{
    color: rgb(218, 117, 110);
    border: 1px solid rgb(218, 117, 110);
}
/* 未登录 */
.not-online{
    width: 100%;
    text-align: center;
    margin: 20vw 0;
    font-size: 4vw;
}
</style>


