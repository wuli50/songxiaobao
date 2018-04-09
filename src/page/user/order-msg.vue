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
        
    </div>
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
          order:{}
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
            }
        })
    }

  },
  created(){
    var that = this;
    bus.$emit("show-bar", false);
    that.getOrderMsg({_id: that.$route.params.id})
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
        padding: 4xw;
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
</style>


