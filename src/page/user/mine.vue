<template>
  <div class="user-page">
      <back-header>我的</back-header>
      <div class="header">
          <router-link class="header-box" to = "/mine/mine-msg">
              <img src="../../assets/img/mine/头像 (1).png" alt="">
              <div class="header-main right">
                  <div class="left">
                      <h2 v-if="user_name == ''">
                          <router-link to = "/login">登录</router-link>
                          /
                          <router-link to = "/login">注册</router-link>
                      </h2>
                      <h2 v-else>
                          <span>{{user_name}}</span>
                      </h2>
                      <p class="pho">
                          <img src="../../assets/img/mine/手机.png" alt="">
                          <span class="pho-num">登录后享更多特权</span>
                      </p>
                  </div>
                  <div class="right">
                      <img  class="more" src="../../assets/img/向右.png" alt="">
                  </div>
                  <div class="clear"></div>
              </div>
              <div class="clear"></div>
          </router-link>
      </div>
        <!-- 红包&钱包 -->
        <card>
            <div slot="content" class="card-demo-flex card-demo-content01 discounts">
                <div class="vux-1px-r">
                    <img src="../../assets/img/mine/红包.png" alt="">
                    <p>
                        优惠：<span>0</span>个
                    </p>
                </div>
                <div class="vux-1px-r">
                    <img src="../../assets/img/mine/钱包.png" alt="">
                    <p>
                        钱包：<span>0.00</span>元
                    </p>
                </div>
            </div>
        </card>
        <!-- 地址收藏 -->
        <ul class="address">
            <li>
                <router-link to="/mine/shop-ads">
                    <img src="../../assets/img/mine/收货地址.png" alt="">
                    <span>收货地址</span>
                </router-link>
            </li>
            <li>
                <router-link to="mine-like">
                    <img src="../../assets/img/mine/爱心.png" alt="">
                    <span>我的收藏</span>
                </router-link>
            </li>
        </ul>

  </div>
</template>
<script>
// 导入总线
import bus from '../../bus.js'
import backHeader from "../../components/backHeader"
export default {
  name:"mine",
  data(){
      return {
          user_name:this.getCookie('username')
      }
  },
  components:{
      backHeader,
  },
  methods:{
    // 获取用户地址信息
  },
  created(){
      bus.$emit('show-bar',true)
  }

}
</script>
<style scoped>
.left{
    float: left;
}
.right{
    float: right;
}
/* 头部 */
.header{
    height: 40vw;
    background-color: #0091FF;
    padding: 5vw 2vw;
}
.header-box{
    width: 90%;
    margin: 0 auto;
    line-height: 30vw;
}
.header-box img{
    height: 15vw;
}
.header-main{
    width: 80%;
    font-size: 5vw;
    line-height: 16vw;
    padding: 6vw 0 5vw;
}
img.more{
    height: 5vw;
}
h2,p{
    margin: 0px;
    padding: 0px;
    color:white;
    line-height: 8vw;
}
h2{
    font-size: 5vw;
    font-weight: 600;
    margin-top: 1vw;
}
.pho{
    font-size: 4vw;
}
.pho img{
    height:4.5vw;
}
a{
    font-size: 5vw;
    color:white;
}
/* 钱包优惠 */
.discounts{
    background-color: white;
    height: 25vw;
    width: 100%;
    display: flex;
    padding: 5vw;
    border-bottom : 1px solid #dddddd;
}
.discounts div{
    width: 50%;
    text-align: center;
}
.discounts div:nth-of-type(1){
    border-right:1px solid #dddddd;
}
.discounts img{
    height: 7.5vw;
}
.discounts p{
    color: #777;
    font-size: 3.5vw;
}
.address{
    margin-top: 5vw;
    border-top: 1px solid #dddddd;
    background-color: white;
}
.address,.address li{
    width: 100%;
}
.address li{
    padding: 1vw 4vw;
    border-bottom: 1px solid #dddddd;
    line-height: 8vw;
    color: #777;
}
.address li span{
    color:#777;
    font-size: 4vw;
    line-height: 8vw;
}
.address li img{
    height: 5vw;
}
</style>


