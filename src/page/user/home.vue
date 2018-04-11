<template>
    <div class="user-page">
        <!-- 顶部 -->
        <nav>
            <div class="top">
                <div class="address">
                    <img src="../../assets/img/home/address.png" alt="">
                    <span class="ads-name">{{address}}</span>
                </div>
                <!-- 天气 -->
                <!-- <div class="weather">
                    {{weather.description}}
                    <img :src="getImag(weather.image_hash)" alt=""  class = "wetimg">
                </div> -->
                <div class="clear"></div>
            </div>
            <div class="main-fix" :class="findFixed == true? 'findFixed':''">
                <div class="find">
                    <router-link to="/findstore">
                        <img src="../../assets/img/home/findstore.png" alt="">
                        <span>搜索你想找的店铺</span>
                    </router-link>
                </div>
            </div>
            <!-- 热门精选 -->
            <!-- <div class="hot table-responsive">
                 <table class="table" id="hot">
                    <tbody>
                        <tr>
                            <td  v-for = "v in hot">{{v.search_word}}</td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
        </nav>

        <!--分类轮播-->
        <swiper dots-position = "center" 
            height = "50vw"
            class="classfood">
                <swiper-item>
                    <div class="sort-box">
                        <div v-for="(type,index) in typeList" class="home-type">
                            <router-link :to='{name:"storeclass",params:{type:type.name}}'>
                                <img :src="type.image_path" alt="">
                                <p>{{type.name}}</p>
                            </router-link>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item>
                </swiper-item>    
        </swiper>
        <!-- 商家列表 -->
        <div class="store-list">
            <card :header="{title:'------ 推荐商家 ------'}">
                <ul slot="content" class="list-store">
                    <li v-for="sto in storeList">
                        <router-link class="list-box"  :to='{name:"store",params:{_id:sto._id}}'>
                            <img :src="sto.image_path" alt="" class="image-title">
                            <div class="store-main">
                                <ul class="main" >
                                    <li class="main1">
                                        <div class="left">
                                            <!-- <span v-if="sto.is_new">新店</span> -->
                                            {{sto.name}}</div>
                                        <div class="right">
                                            <span>票</span>
                                        </div>
                                        <div class="clear"></div>
                                    </li>
                                    <li class="main2">
                                        <!-- <div class="left">月售4750 评分:{{sto.rating}}</div> -->
                                        <div class="right">
                                            <span>小宝专送</span>
                                        </div>
                                        <div class="clear"></div>
                                    </li>
                                    <li class="main3">
                                        <div class="left">￥0起送 |
                                            <span>配送费{{sto.distribution}}元</span></div>
                                        <div class="right">30分钟</div>
                                        <div class="clear"></div>
                                    </li>
                                </ul>
                                <!-- 活动 -->
                                <!-- <ul class="footer">
                                    <li class="ati-num" @click.prevent = "showAti">
                                                {{sto.activities.length}}个活动
                                    </li>
                                    <li class="ati" v-for = "(act,index) in sto.activities" v-show = "index < 2">
                                        <span :style="{backgroundColor:'#'+ act.icon_color}">{{act.icon_name}}</span>
                                        <span>{{act.tips}}</span>
                                    </li>
                                    
                                </ul>      -->
                            </div>
                            <div class="clear"></div>
                        </router-link>
                    </li>
                </ul>
            </card>
        </div>

        <!-- 点击向上 -->
        <div class="totop" v-show = "toTopShow" @click="toTop">
            <img src="../../assets/img/home/向上.png" alt="">
        </div>
    </div>
</template>

<script>
// 导入总线
import bus from '../../bus.js'

// 导入总线
import { Swiper , SwiperItem} from 'vux'
import { Card } from 'vux'


export default {
  name:"home",
  data(){
      return {
          typeList:[
              {
                  name:'同事一波',
                  image_path:'../../../static/home-image/icon-tongshi.png'
              },
              {
                  name:'一人狂欢',
                  image_path:'../../../static/home-image/icon-yiren.png'
              },
              {
                  name:'宿舍小聚',
                  image_path:'../../../static/home-image/icon-sushe.png'
              },{
                  name:'超市便利',
                  image_path:'../../../static/home-image/icon-chaoshi.png'
              },{
                  name:'美食',
                  image_path:'../../../static/home-image/icon-meishi.png'
              },{
                  name:'甜品',
                  image_path:'../../../static/home-image/icon-tianping.png'
              },{
                  name:'夜宵',
                  image_path:'../../../static/home-image/icon-sushe.jpg'
              },{
                  name:'粉面',
                  image_path:'../../../static/home-image/icon-fenmian.jpg'
              }
          ],
          address:"福州市",
          weather:{},
          storeList:[],
        //   监听滚动事件
          findFixed:false,
          toTopShow:false,
      }
  },
  components:{
      Swiper,
      SwiperItem,
      Card 
  },
  methods:{
    //   获取推荐商家
    getStoreList(obj){
        var that = this;
        that.$http.post('api/store-msg/find',obj,{emulateJSON: true})
        .then((data)=>{
            that.storeList = data.body.data;
            for(var i=0; i<data.body.data.length;i++){
                that.storeList[i].image_path = '../../.' + data.body.data[i].image_path;
            }
        })
    },
    
    // 滚动监听
    handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = document.querySelector('.main-fix').offsetTop
        // console.log(scrollTop)
        if (scrollTop > offsetTop) {
            this.findFixed = true;
        } else {
            this.findFixed = false;
        }
        var totop = document.querySelector('.store-list').offsetTop;
        if(scrollTop > totop){
            this.toTopShow = true;
        }else{
            this.toTopShow = false;
        }
    },
    toTop(){
        // document.documentElement.scrollTop = 0;
        // 动画效果
        $(document.documentElement).animate({
            'scrollTop' : '0'
        },500)
    },
  },
  created(){
      bus.$emit('show-bar',true);
      this.getStoreList({is_aduit_food:true,is_aduit_msg:true});
  },
  mounted(){
      window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    //   离开时解除事件监听
    window.removeEventListener('scroll', this.handleScroll)
},
  

}
</script>
<style scoped>
@import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
.user-page{
    background-color: #dddddd;
}
    /* 头部 */
    nav{
        width:100%;
        background-color:  #E6664D;
        color: white;
        height: 30vw;
    }
    .top{
        padding: 1.5vw;
        position: relative;
    }
    .address{
        width: 75%;
    }
    .address img{
        height: 4.5vw;
    }
    .ads-name{
        font-weight: 600;
        font-size: 4.5vw;
        color: white;
        line-height: 5.5vw;
    }
    img.wetimg{
        height: 8vw;
    }
    .weather{
        position: absolute;
        top:1.5vw;
        right:1.5vw;
        font-size: 3vw;
        line-height: 2vw;
    }
    /* 搜索框 */
    .main-fix{
        width: 100%;
        background-color: #E6664D;
        padding: 2.5vw;
    }
    .find{
        width: 80%;
        margin:0vw auto;
        background-color: white;
        line-height: 4.5vw;
        text-align: center;
        border-radius: 1.5vw;
        font-size: 3.5vw;
        padding: 2.1vw;
    }
    /* 搜索框定位样式 */
    .findFixed{
        position: fixed;
        top:0;
        z-index: 100;
    }
    .find img{
        height: 4.5vw;
    }
    .find a span{
        color:#777777;
        position: relative;
    }
    .hot{
        margin-top: 3vw;
    }
    .hot,.hot .table,.hot .table tr{
        border: 0px;
        padding: 0px;
        margin: 0px;
        border-image-width:0;
        border-color: #E6664D;
    }
    #hot{
        border-top-width:0;
        border-color: #E6664D;
        background-color: #E6664D;
    }
    .hot table tr td{
        padding: 0 2.1vw ;
        font-size: 1.2rem;
    }
    /* 分类轮播 */
    .classfood{
        background-color: white;
    }
    .sort-box{
        display: flex;
        flex-wrap: wrap;
        padding: 3vw;
        width: 100%;
    }
    .sort-box .home-type{
        display: inline-block;
        text-align: center;
        width: 25%;

    }
    .sort-box .home-type img{
        width: 12vw;
        height: 12vw;
        border-radius: 50%;
    }
    .sort-box .home-type p{
        display: block;
        text-align: center;
        font-size: 3.5vw;
        color:#777;
    }
    /* 分类轮播的点 */
    .vux-indicator-center i{
        border: 6vw;
        color:#999;
    }
    .vux-indicator-center a>i.active{
        color: #555 !important;
    }
    .big-pic{
        width: 100%;
        background-color:white;
        padding: 1.5vw 3vw;
    }
    .big-pic img{
        width: 100%;
    }
    /* 商家列表 */
    .store-list{
        margin: 1vw 0 8vw;
        background-color: white;
        text-align: center;
        color: #555;
    }
    .image-title{
        margin: 1vw;
        border-radius: 3vw
    }
    .store-list .weui-panel__hd{
        color: #333;
    }
    .list-store{
        margin: 0px;
        padding: 0px;
    }
    .list-store>li{
        padding: 0.5vw;
        border-bottom: 1px solid #dddddd;
    }
    .list-box{
        width: 100%;
    }
    .list-box img{
        width: 20%;
        float: left;
    }
    .list-box .store-main{
        width: 75%;
        margin: 1vw;
        float: right;
        /* border: 1px solid salmon */
    } 
    .store-main .left{
        float: left;
    }
    .store-main .right{
        float: right;
    }
    .store-main .main,.main li{
        width: 100%;
        padding: 0.5vw;
    }
    .main1 div:nth-of-type(1){
        font-weight: 600;
        font-size: 4vw;
    }
    .main1 div.left span{
        font-size: 3vw;
        color: #906715;
        font-weight: 600;
        background-color: #FFE920;
        padding: 0.1vw 0.7vw;
        border-radius: 1vw;
    }
    .main1 div:nth-of-type(2) span{
        font-size: 3vw;
        border: 1px solid #aaaaaa;
        color: #aaaaaa;
        padding: 0.2vw 0.5vw;
        border-radius: 1vw;
    } 
    .main2,.main3{
        font-size: 3vw;
        color: #555;
    }
    .main2 div.right span{
        background-color: #EF9B38;
        color: white;
        padding: 0.2vw 0.5vw;
        border-radius: 1vw;
    }
    ul.footer{
        border-top: 1px solid #dddddd;
        width: 100%;
    }
    .footer .ati{
        color: #555;
        font-size: 3vw;
        width: 100%;
        text-align: left;
        padding: 0.5vw;
    }
    .footer .ati span:nth-of-type(1){
        /* background-color: #E21918; */
        color: white;
        padding: 0.1vw 0.5vw;
        border-radius: 1vw;
        margin-left: 1vw;
    }
    .ati-num{
        color: #999;
        font-size: 3vw;
        text-align: right;
    }
    /* 向上图片 */
    .totop{
        position: fixed;
        bottom: 20vw;
        right: 5vw;
    }
    .totop img{
        height: 10vw;
    }

    


</style>


