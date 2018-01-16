<template>
<div class="user-page">
    <back-header>订单</back-header>
    <!-- 登录时的页面 -->
    <div class="online" v-if="online">
        <ul>
            <li class="a-order">
                <!-- 订单页 -->
                <ul>
                    <li class="order-header">
                        <img src="../../assets/img/home/购物车.png" alt="" class="left">
                        <div class="right">
                            <h2>店铺名称
                                <span class="right">订单状态</span>
                                <!-- <div class="clear"></div> -->
                            </h2>
                            <p>订单时间：</p>
                            
                            
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li class="order-main">
                        <span>商品名称</span> 
                        <span>商品数量</span>
                        <span>商品总价</span>
                    </li>
                    <li class="order-foot">
                        <router-link to="/">
                            <span>查看详情</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>


    </div>
    <!-- 没登录的页面 -->
    <div class="" v-else>

    </div>
</div>
</template>
<script>
import backHeader from "../../components/backHeader"

export default {
  name:"order",
  data(){
      return {
          online:true
      }
  },
    // 注册组件
  components:{
      backHeader,
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
.order-header .right{
    width: calc(100% - 15vw);
}
.order-header .right span{
    font-size: 3.5vw;
    font-weight: 400;
    text-align: right;
    color: #FF6D0F;
}
.order-main {
    text-align: center;
    color:#999;
}
.order-foot{
    text-align: right;
}
.order-foot span{
    padding: 0.2vw 1vw;
    border: 1px solid #0081ff;
    border-radius: 1vw;
}




</style>


