<template>
  <div class="store-class">
    <back-header>{{type[0]}}</back-header>
    <main>
      <!-- 店铺列表 -->
      <div class="store-list" v-if="storeList.length >0">
        <card :header="{title:'------ 为你找到的店铺 ------'}">
            <ul slot="content" class="list-store">
                <li v-for="sto in storeList">
                    <router-link class="list-box"  :to='{name:"store",params:{_id:sto._id}}'>
                        <img :src="sto.image_path" alt="" class="image-title">
                        <div class="store-main">
                            <ul class="main" >
                                <li class="main1">
                                    <div class="left">
                                        {{sto.name}}</div>
                                    <div class="right">
                                        <span>票</span>
                                    </div>
                                    <div class="clear"></div>
                                </li>
                                <li class="main2">
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
                        </div>
                        <div class="clear"></div>
                    </router-link>
                </li>
            </ul>
        </card>
      </div>
      <div class="store-list" v-else>
          <p>暂无数据</p>
      </div>
    </main>
  </div>
</template>
<script>
import backHeader from "../../components/backHeader"
import { Card } from 'vux'

export default {
  name:"storeclass",
  data(){
      return {
          type:[this.$route.params.type],
          storeList:[]
      }
  },
  components:{
      Card ,backHeader
  },
  methods:{
    //   获取商家
    getStoreList(obj){
        var that = this;
        var object = {};
        object.is_aduit_food = true;
        object.is_aduit_msg = true;
        object.type = {$in:that.type};
        for(var key in obj){
            object[key] = obj[key]
        }
        console.log(object)
        that.$http.post('api/store-msg/find',object,{emulateJSON: true})
        .then((data)=>{
            that.storeList = data.body.data;
            for(var i=0; i<data.body.data.length;i++){
                that.storeList[i].image_path = '../../.' + data.body.data[i].image_path;
            }
        })
    },
  },
  created(){
        console.log(this.type)
        this.getStoreList({})
    
  }
}
</script>
<style lang="less" scoped>
/* 商家列表 */
    .store-list{
        margin: 1vw 0 8vw;
        background-color: white;
        text-align: center;
        color: #555;
        margin-bottom: 15vw;
    }
    .image-title{
        margin: 1vw;
        width: 20%;
        height: 15vw;
        border-radius: 3vw;
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
        background-color: rgba(254, 90, 90, 0.8);
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

</style>

