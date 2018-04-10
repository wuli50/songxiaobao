<template>
<div class="order-msg">
    <back-header>订单详情</back-header>
    <div class="header box">
         <router-link class="order-title" :to='{name:"store",params:{_id:order.store_id}}'>
        <img :src="order.store_image" alt="">
        <b class="title">{{order.store_name}}</b>
         </router-link>
    </div>
    <div class="order-main box">
        <ul class="order-card">
            <li class="order-card-title"><b class="title">订单菜品详情</b></li>
            <li class="order-card-title li-top">
                <span class="food">菜品</span>
                <span>数量</span>
                <span class="foodprice">价格</span>
            </li>
            <li v-for = "order in order.order_list" class="order-card-title">
                <span class="food">{{order.name}}</span>
                <span>X{{order.num}}</span>
                <span class="foodprice">{{order.price}}</span>
            </li>
            <li class="order-card-title">
                <span class="food">配送费</span>
                <span></span>
                <span class="foodprice">{{order.store_distribution}}</span>
            </li>
            <li class="order-card-title">
                <span class="food"></span>
                <span>X{{order.all_food_num}}</span>
                <span class="foodprice">￥{{order.all_price}}</span>
            </li>
        </ul>
    </div>
    <div class="order-footer box">
        <ul class="order-card">
            <li class="order-card-title"><b class="title">配送信息</b></li>
            <li class="order-footer-title">
                <span>商家地址</span>
                <span>{{storeMsg.address}}</span>
            </li>
            <li class="order-footer-title">
                <span>联系方式</span>
                <span>{{storeMsg.phone}}</span>
            </li>
            <li class="order-footer-title">
                <span>订单时间</span>
                <span>{{order.order_time}}</span>
            </li>
            <li class="order-footer-title">
                <span>支付方式</span>
                <span>{{order.is_option?order.option_way:'未支付'}}</span>
            </li>
        </ul>
    </div>
    <router-link class="footer"  :to="{path: '/home'}">回到首页</router-link>
</div>
  
</template>
<script>
import bus from '../../bus.js'
import backHeader from "../../components/backHeader"

export default {
  name:"order-msg",
  components:{
      backHeader,
  },
  data(){
      return{
          order:{},
          storeMsg:{}
      }
  },
  methods:{
    //   获取订单详情
    getOrderMsg(obj){
        var that = this;
        that.$http.post('api/order-msg/find',obj,{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
            } else{
                that.order = data.body.data[0];
                that.getStoreMsg({_id: that.order.store_id})
            }
        })
    },
    getStoreMsg(obj){
        var that = this;
      that.$http.post('api/store-msg/find',obj,{emulateJSON: true})
      .then((data)=>{
          console.log(data);
          if (data.body.state == 0) {
          } else{
            that.storeMsg = data.body.data[0];
            that.storeMsg.image_path = '../../.'+data.body.data[0].image_path;
          }
      })
    }

  },
  created(){
    var that = this;
    bus.$emit("show-bar", false);
    that.getOrderMsg({_id: that.$route.params._id})
    
  },
   beforeDestroy () {
   }
}
</script>
<style lang="less" scoped>
.box{
    padding: 2.5vw;
    background-color: #fff;
    margin-bottom: 2.5vw;
    font-size: 2.5vw;
    color: #555;
}
.header{
    text-align: center;
    font-size: 4vw;
    img{
        width: 16vw;
        height: 16vw;
        display: block;
        margin: 2.5vw auto;
        border-radius: 50%;
        border: 1vw solid rgba(0, 0, 0, 0.1)
    }
}
.order-main{
    .order-card-title{
        display: flex;
        justify-content: space-between;
        padding: 1vw 2vw;
        .food{
            flex-grow: 1;
        }
        .foodprice{
            width: 10vw;
            text-align: right;
            margin-left: 5vw;
        }
    }
    .li-top{
        font-weight: 600;
    }
}
.order-footer-title{
    display: flex;
    justify-content: space-between;
    padding: 1vw 2vw;
}
.footer{
    text-align: center;
    position: fixed;
    border-radius: 5px;
    width: 100%;
    padding: 2vw;
    bottom: 0;
    border: 1px solid #555;
    color: #555;
    background-color: #fff;
}
</style>


