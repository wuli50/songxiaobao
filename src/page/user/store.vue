<template>
    <div class="user-page">
        <header>
            <!-- blur的路径只能是网络路径 -->
            <div class="hed-box">
                <div class="top">
                    <img src="../../assets/img/返回.png" alt="" @click="back">
                </div>
                <div class="hed-main">
                    <div class="center">
                        <img :src="Store.image_path" class="top-img">
                        <ul class="stor-title right">
                            <li><span>{{Store.name}}</span></li>
                            <li>￥0起送 | <span>配送费{{Store.distribution}}元</span></li>
                            <li>
                                <span style="">
                                    公告：{{Store.promotion_info.slice(0,18)+"..."}}
                                </span>
                            </li>
                        </ul>
                        <div class="clear"></div> 
                    </div>
                    <!-- 活动 -->
                    <!-- <div class="hed-actives">
                        <ul>
                            <li>
                                <span :style="{backgroundColor:'#'+ Store.activities[0].icon_color}">
                                    {{Store.activities[0].icon_name}}
                                    </span>
                                <span>{{Store.activities[0].tips}}</span>
                                <span class="right">{{Store.activities.length}}个活动</span>
                                <div class="clear"></div>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </header>

        <!-- 内容 -->
        <div class="main">
            <!-- 标签页 -->
            <sticky>
                <tab :line-width=3
                    active-color='#0091ff' 
                    custom-bar-width = "10vw"
                    v-model="index"
                    class="tab">
                    <tab-item class="vux-center" 
                        :selected="demo === item" 
                        v-for="(item, index) in TabList" 
                        @click="demo = item" 
                        :key="index">{{item}}
                        </tab-item>
                </tab>
            </sticky>
            <!-- 菜单和店铺详情 -->
            <div class="my-tap">
                <transition name="myTap">
                    <div>
                        <!-- 菜单 -->
                        <div class="merch" v-show="index == 0" :key = "0">
                            <!-- 分类 -->
                            <div class="left">
                                <ul>
                                    <li v-for = "(c,index) in classList" class="classname">
                                        <a :href="'#'+index">{{c.name}}</a></li>
                                </ul>
                            </div>
                            <!-- 食物 -->
                            <div class="right">
                                <ul class="class-main">
                                    <li v-for = "(c,index) in classList">    
                                        <ul>
                                            <li class="classtitle" :id="index">
                                                <span>{{c.name}}</span>
                                                <span>{{c.description}}</span></li>
                                            <li class="mer-class" v-for = "(food,i) in c.foods"  v-if="i<4">
                                                <div class="mer-class-box">
                                                    <div class="left">
                                                        <img :src="food.image_path" alt="">
                                                    </div>
                                                    <div class="right">
                                                        <ul class="mer-main">
                                                            <li>{{food.name}}</li>
                                                            <li><span v-show="food.is_essential">招牌</span></li>
                                                            <li>月售{{food.month_sales}}份</li>
                                                            <li>
                                                                <p><span>5折</span>每单都有优惠</p>
                                                            </li>
                                                        </ul>
                                                        <!-- 数量加减 -->
                                                        <div class="price">
                                                            <b>￥{{food.specfoods_price}}</b><s>${{food.specfoods_price*2}}</s>
                                                            <div class="money">
                                                                <span class="reduce" 
                                                                 v-if = "setcomNum[food.name].num>0"
                                                                @click="comNum[food.name].num--;allFoodList(-comNum[food.name].price,-1)"></span>
                                                                
                                                               <input type="num" name="num" id="num" v-model="setcomNum[food.name].num"/>
                                                            
                                                            <span class="add" 
                                                                @click="comNum[food.name].num++;allFoodList(comNum[food.name].price,1)"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clear"></div> 
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="clear"></div> 
                        </div>
                        <!-- 店铺 -->
                        <div class="store-main" v-show="index == 1" :key = "1">
                            <div class="msg-top"> 
                                <h2>配送信息</h2>
                                <p>配送费{{Store.distribution}}元</p>
                            </div>
                            <!-- <div class="msg-ati">
                                <h2>活动与服务</h2>
                                <span class="right">{{Store.activities.length}}个活动</span>
                                <div class="clear"></div>
                                <ul class="ati">
                                    <li v-for = "(act,index) in Store.activities">
                                        <span :style="{backgroundColor:'#'+ act.icon_color}">{{act.icon_name}}</span>
                                        <span>{{act.tips}}</span>
                                    </li>
                                </ul>
                            </div> -->
                            <div class="msg-foot">
                                <ul>
                                    <li>
                                        <h2>店家信息</h2>
                                        <p v-if = "Store.promotion_info">{{Store.promotion_info}}</p>
                                        <p v-else>暂无信息</p>
                                    </li>
                                    <li>
                                        <h3>商家电话</h3>
                                        <span class="right">{{Store.phone}}</span>
                                        <div class="clear"></div>
                                    </li>
                                    <li>
                                        <h3>地址</h3>
                                        <span class="right">{{Store.address}}</span>
                                        <div class="clear"></div>
                                    </li>
                                    <!-- <li>
                                        <h3>评分</h3>
                                        <span class="right">{{Store.opening_hours[0]}}</span>
                                        <div class="clear"></div>
                                    </li> -->
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </transition> 
            </div>
        </div>

        <!-- 底部购物车 -->
        <div class="shop-car">
            <div class="car" @click="orderShow = !orderShow">
                <img src="../../assets/img/store/购物车.png" alt="">
                <badge :text = "allNum" v-if="allNum>0" class="all-num"></badge>
            </div>
            <div class="allmoney">
                <p>￥<span>{{allprice.toFixed(2)}}</span></p>
                <p>{{Store.description}}</p>
            </div>
            <div class="payment">
                <span v-if="allprice == 0">购物车空空~</span>
                <span v-else  @click="goStoreOrder">
                   <div class="go-buy">
                  去结算
                   </div>
                </span>
            </div>
            <div class="orderlist" v-if="orderShow && allprice > 0">
                <ul>
                    <li class="order-title"> 
                        <span>菜品名称</span>
                        <span>单价</span>
                        <div class="list-num">
                        </div>
                    </li>
                    <li v-for = "(food, i) in orderList" class="order-food">
                        <span>{{i}}</span>
                        <span>{{food.price.toFixed(2)}}</span>
                        <div class="list-num">
                            <span class="reduce"
                            v-if = "setcomNum[i].num>0"
                            @click="comNum[i].num--;allFoodList(-comNum[i].price)"></span>
                            
                            <input type="num" name="num" id="num" class="num"  v-model="setcomNum[i].num"/>
                        
                            <span class="add"
                            @click="comNum[i].num++;allFoodList(comNum[i].price)"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
// 导入总线
import bus from "../../bus.js";

import { Blur, Tab, TabItem, Sticky, Swiper, SwiperItem, XNumber,Badge } from "vux";
import { setTimeout } from "timers";
import { ECONNABORTED } from "constants";
import { ifError } from 'assert';
export default {
  name: "store",
  data() {
    return {
      storeId: this.$route.params._id,
      Store: {},
      url: "https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg",
      // 标签页数据
      TabList: ["商品", "店铺"],
      demo: "商店",
      index: 0,
      // 商品分类
      classList: [],
      // 商品数量
      comNum: {
        // 商品名称 ： {num:数量，price：单价}
      },
      // 总价
      allprice: 0,
      allNum: 0,
      orderShow: true
    };
  },
  // 计算属性
  computed: {
    setcomNum: function() {
        return this.comNum;
    },
    orderList:function(){
        let obj = {};
        for(var key in this.comNum){
            if(this.comNum[key].num > 0){
                obj[key] = this.comNum[key]
            }
        }
        return obj;
    }
  },
  // 注册组件
  components: {
    Blur, Tab, TabItem,Swiper, SwiperItem, XNumber, Sticky, Badge
  },
  // 方法
  methods: {
    back() {
      this.$router.back();
      // location.href = "/";
    },
    // 获取店家信息
    getStore() {
      var that = this;
      console.log(that.storeId)
      that.$http.post('api/store-msg/find',{
        _id:that.storeId
      },{emulateJSON: true})
      .then((data)=>{
        console.log(data)
          if (data.body.state == 0) {
            alert(data.body.message);
          } else{
            that.Store = data.body.data[0];
            
            that.Store.image_path = '../../.'+data.body.data[0].image_path;
          }
      })
    },
    // 获取菜单数据
    getClasslist() {
       var that = this;
      // console.log(that.getCookie('storename'))
      that.$http.post('api/store-food/find',{
        restaurant_id:that.storeId
      },{emulateJSON: true})
        .then(data => {
          console.log(data.body)
          this.classList = data.body.data;
          this.classList.forEach((value, index) => {
            value.foods.forEach((value, i) => {
              var foodName = value.name;
              //一个死坑！！！！【深入响应式原理，查看对象可以发现以下两种方法在Vue中是不同的】
              // https://cn.vuejs.org/v2/guide/reactivity.html
              // this.$set(this.comNum,foodName,0)
              this.classList[index].foods[i].image_path = '../../.'+data.body.data[index].foods[i].image_path;
              this.$set(this.comNum, foodName, {
                num: 0,
                price: value.specfoods_price
              });
            });
          });
        });
    },
    // 滚动监听
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector(".tab").offsetTop;
      // 监听滚动 控制左侧分类栏
      if (scrollTop > 148) {
        $(".merch>.left").css({
          position: "fixed",
          top: "12vw"
        });
      } else {
        $(".merch>.left").css({
          position: "relative",
          top: "0"
        });
      }
    },
    // 总价计算
    allFoodList(price,num) {
      this.allprice += price;
      this.allNum += num;
    },
    // 跳转订单页面
    goStoreOrder(){
      console.log('123')
      if(this.getCookie('username')){
        this.$router.push({path:'/store-order'})
      }else{
        alert('你还没有登录哦，先去登录吧')
        this.$router.push({path:'/login'})
      }
    }
  },
  watch() {},
  // 挂载阶段
  created() {
    // 是否有底部导航条
    bus.$emit("show-bar", false);
    this.getClasslist();
    this.getStore();
    this.handleScroll();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    //   离开时解除事件监听
    window.removeEventListener("scroll", this.handleScroll);
  },
  beforeDestroy (){
    // 组件卸载前设置使用bus传递值
    var orderList = [];
    for(var i in this.orderList){
      var ordermsg = {}
      ordermsg.name = i;
      ordermsg.num = this.orderList[i].num;
      ordermsg.price = this.orderList[i].price;
      orderList.push(ordermsg);
    }
    // 传参
    var data = {}
    data.store_name = this.Store.name;
    data.store_distribution =this.Store.distribution
    data.order_list = orderList;
    data.store_id=this.Store._id;
    data.store_image=this.Store.image_path;
    data.all_food_price=this.allprice;
    data.all_food_num = this.allNum
    console.log(data)
    bus.$emit("orderMessage",data)
  }
};
</script>
<style scoped>
.left {
  float: left;
}
.right {
  float: right;
}
p {
  margin: 0;
}
.top {
  line-height: 10vw;
}
.top img {
  height: 5vw;
  margin-left: 2vw;
}
.hed-main {
  width: 100%;
  padding: 5vw;
  padding-bottom: 0;
}
.hed-main p {
  margin-bottom: 1vw;
}
.hed-main p img {
  height: 16vw;
  width: 16vw;
}
header ul li {
  color: white;
  line-height: 5vw;
  font-size: 3vw;
}
.hed-box {
  height: 38vw !important;
  background-color: rgba(70, 146, 174, 0.5);
}
.top-img{
  width: 20vw;
  margin-right: 5vw;
}
.stor-title {
  width: calc(100% - 25vw);
}
.stor-title li:nth-of-type(1) {
  font-size: 4.5vw;
  font-weight: 600;
}
.hed-actives li span:nth-of-type(1) {
  background-color: #875554;
  padding: 0.1vw 0.6vw;
  border-radius: 1vw;
}
/* 内容 */
.main {
  /* margin-bottom: 18vw; */
  height: calc(100% - 50vw);
  background-color: white;
  border-bottom: 1px solid #dddddd;
}
/* 商品 */
.my-tap {
  width: 100%;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 15vw;
}
.merch {
  width: 100%;
  text-align: center;
}
/* 引导边框 */
.merch .left,
.class-main,
.mer-main,
.price,
.num {
  /* border: 1px solid saddlebrown; */
}
/* 左侧列表 */
.merch .left {
  width: 20vw;
}
.classname a {
  color: #555;
}
.merch > .left {
  overflow-y: scroll;
  height: 57vw;
  position: relative;
}
.merch > .right {
  overflow-y: scroll;
  height: 300vw;
}
.merch ul li {
  padding: 2.5vw 1vw;
  font-size: 3.5vw;
  color: #777;
  border-bottom: 1px solid #dddddd;
}
.merch .right {
  width: calc(100% - 21vw);
}
.merch .class-main li {
  line-height: 4vw;
  padding: 1vw;
  text-align: left;
}
.merch .class-main .classtitle span:nth-of-type(1) {
  font-size: 4vw;
  font-weight: 600;
}
.mer-class-box {
  margin-bottom: 2vw;
}
.mer-class-box .left {
  position: relative;
}
.mer-class-box .left img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.mer-class-box .left span {
  background-color: #f18147;
  color: white;
  padding: 0.1vw 0.6vw;
  position: absolute;
  z-index: 2;
  border-radius: 1vw;
}
.mer-main li {
  border-bottom: 1px solid white !important;
}
.mer-main li:nth-of-type(1) {
  color: #555;
  font-weight: 600;
  font-size: 4.2vw;
}
.mer-main li:nth-of-type(2) {
  color: #999;
  font-size: 2.5vw;
  line-height: 2vw;
}
.mer-main li:nth-of-type(3) {
  font-size: 3vw;
  line-height: 2vw;
}
.mer-main li:nth-of-type(4) p {
  margin: 0;
  padding: 0;
  border: 1px solid #ff4015;
  font-size: 3vw;
  line-height: 3.2vw;
  display: inline;
  padding-right: 1vw;
}
.mer-main li:nth-of-type(4) p span {
  color: white;
  margin-right: 1vw;
  background-color: #ff4015;
  padding: 0 0.5vw;
}
.price {
  font-size: 4vw;
  line-height: 5vw;
  position: relative;
}
.price b {
  color: #ff4015;
  margin-right: 1.5vw;
}
.price s {
  font-size: 3.2vw;
}
.weui-cell {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
.weui-cell a {
  margin-bottom: 0.5vw;
}
/* 数量 */
div.money {
  position: absolute;
  right: 5vw;
  bottom: -2vw;
  width: 20vw;
  height: 8vw;
  line-height: 8vw;
  text-align: center;
}

div.money span {
  display: inline-block;
  width: 6vw;
  height: 6vw;
  background-size: cover;
  position: absolute;
  top: 1vw;
}

div.money span.reduce {
  /* display: none; */
  width: 7vw;
  height: 7vw;
  position: absolute;
  left: 0;
  top: 0.5vw;
  background-image: url(../../assets/img/store/减.png);
}
div.money span.add {
  background-image: url(../../assets/img/store/加.png);
  position: absolute;
  right: 0;
}
div.money input {
  margin: 0 auto;
  width: 5vw;
  padding: 0rem;
  text-align: center;
  height: 5vw;
  border: 0px;
  /* display: none; */
}
/* 店铺详情 */
.store-main {
  background-color: #dfdfdf;
}
.store-main h2 {
  margin: 0;
  padding: 0;
  color: #555;
  font-weight: 600;
  font-size: 4.5vw;
  margin-bottom: 1vw;
}
.store-main h3 {
  margin: 0;
  padding: 0;
  color: #555;
  font-weight: 600;
  font-size: 4vw;
  margin-bottom: 1vw;
}
.store-main p,
.store-main feSpecularLighting {
  font-size: 3vw;
  color: #999;
  margin: 1vw 0.5vw;
}
.msg-ati,
.msg-top,
.msg-foot {
  background-color: white;
  padding: 3vw 2vw;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 2vw;
}
.msg-ati .ati li {
  line-height: 6vw;
  color: #999;
  font-size: 3vw;
}
.msg-ati .ati li span:nth-of-type(1) {
  background-color: #995;
  color: white;
  border-radius: 1vw;
  padding: 0vw 0.5vw;
}
.msg-foot {
  border-bottom: 0;
}
.msg-foot li {
  border-bottom: 1px solid #dddddd;
  padding: 2vw;
}
.msg-foot li h3 {
  width: 30%;
  display: inline-block;
}
.msg-foot li span {
  display: inline-block;
  width: 60%;
  font-size: 3vw;
  color: #999;
  margin: 1vw 0.5vw;
  text-align: right;
}
/* 底部购物车 */
.shop-car {
  position: fixed;
  bottom: 0;
  height: 15vw;
  line-height: 15vw;
  background-color: #505050;
  color: white;
  width: 100%;
  border-top: 1px solid #aaaaaa;
}
.car {
  position: absolute;
  height: 16vw;
  width: 16vw;
  top: -8vw;
  left: 8vw;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 15vw;
  /* padding: 0.5vw; */
  background-color: #363636;
  z-index: 3;
}
.car img {
  height: 13vw;
}
.allmoney {
  width: 30vw;
  position: absolute;
  height: 15vw;
  top: 3vw;
  left: 25vw;
}
.allmoney p {
  line-height: 5vw;
  font-size: 3vw;
  color: #dddddd;
}
.allmoney p:nth-of-type(1) {
  font-weight: 600;
  font-size: 4.5vw;
  color: white;
}
.payment {
  width: 30vw;
  line-height: 15vw;
  text-align: center;
  background-color: #363636;
  position: absolute;
  right: 0;
  top: 0;
}
.all-num{
  position: absolute;
  right: 0;
  top: 0;
}
/* 购物车订单列表 */
.orderlist {
  background-color: white;
  position: absolute;
  width: 100vw;
  bottom: 15vw;
  color: #969696;
  z-index: 2;
}
.orderlist ul{
    padding: 1.5vw;
    border: 0.5vw solid #aaa;
    border-top-right-radius: 2vw;
    border-top-left-radius: 2vw;
    padding-bottom: 8vw;
}
.orderlist li {
  border-bottom: 1px solid #ddd;
  line-height: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw 1vw;
}
.orderlist li span:nth-of-type(1){
    flex-grow:1;
}
.orderlist .order-title{
    font-weight: 600;
}
.list-num{
    display: flex;
    justify-content: space-between;
    width: 15vw;
    margin-left: 2vw;
}
.list-num span{
    width: 5vw;
    height: 5vw;
    background-image: url(../../assets/img/store/减.png);
    background-size: cover;
}
.list-num .add{
    background-image: url(../../assets/img/store/加.png);
}
.list-num .num{
    width: 5vw;
    border: none;
    text-align: center;
}
.go-buy{
  font-size: 4vw;
  font-weight: 600;
}
</style>

