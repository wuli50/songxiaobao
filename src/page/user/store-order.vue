<template>
<div class="order">
  <back-header>确认订单</back-header>
  <div class="header">
    <card class="ads-card"
     :header="{title: '我的收货地址' }">
      <div slot="content" class="card-content">
        {{address.ads + address.msg}}
        <div class="ads-box">
          <span>{{address.name}}</span>
          <span>{{address.phone}}</span>
        </div>
      </div>
      
      <div slot="footer" class="ads-footer">
        <p @click="showMoreAds = true">点击切换地址</p>
      </div>
    </card>
    <!-- 地址切换详情 -->
    <popup v-model="showMoreAds" position="bottom" max-height="50%">
      <group class="ads-list">
        <cell v-for = "(ads, index)  in adsList">
          <div class="ads-message" @click="seleAds(index,$event)">
            <p class="adsmsg">{{ads.ads + ads.msg}}</p>
            <p>{{ads.name}}</p>
            <p>{{ads.phone}}</p>
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
      <li class="order-card-title">{{order.store_name}}</li>
      <li v-for = "order in order.order_list">
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
        <span>{{order.all_food_num}}</span>
        <span class="foodprice">￥{{order.all_price}}</span>
      </li>
    </ul>
  </div>

  <div class="footer">
    <div class="allprice">￥{{order.all_price.toFixed(2)}}</div>
    <div class="buyfood">
        <p @click="buyConfirm = !buyConfirm">确认支付</p>
    </div>
  </div>
  <!--on-cancel	 	点击取消按钮时触发	
        on-confirm	(value)	点击确定按钮时触发, 参数为prompt中输入的值	
        on-show	 	弹窗出现时触发	
        on-hide	 	弹窗隐藏时触发 -->
  <div v-transfer-dom>
    <confirm v-model="buyConfirm"
    :title="确认付款"
    @on-cancel="callOredrConfirm = !callOredrConfirm"
    @on-confirm="affOrder">
      <p style="text-align:center;">你将支付{{order.all_price.toFixed(2)}},确认付款么？</p>
    </confirm>
    <confirm v-model="callOredrConfirm"
    :title="取消订单"
    @on-confirm="onconfirm">
      <p style="text-align:center;">您将取消订单，确定么？？？？</p>
    </confirm>
    <toast v-model="showcelltoast" type="text" :time="800" is-show-mask="true"  :position="middle">正在跳转...</toast>
    <toast v-model="showAfftoast" type="text" :time="800" is-show-mask="true"  :position="middle" @on-hide="toOrderMsg">正在支付中...</toast>
    <toast v-model="showtoast" type="text" :time="800" is-show-mask="true"  :position="middle">支付完成</toast>
  <alert v-model="showAlert" :title="alert.title" is-link>{{alert.content}}</alert>
  </div>
</div>

 
</template>
<script>
import bus from "../../bus.js";
import backHeader from "../../components/backHeader"
import {Card,Popup,Group,PopupRadio,Confirm,Toast,Alert} from "vux"
export default {
  name:"store-order",
  data(){
      return {
        name:this.getCookie('username'),
        address:{
          msg:'',
          ads:'',
          phone:'',
          name:''
        },
        showMoreAds:false,
        adsList:[],
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
        callOredrConfirm:false,
        // alter
        showAlert:false,
        alert:{
            title:"操作",
            content:""
        },
        order_id:''
      }
  },
    // 注册组件
  components:{
    backHeader,
    Card,Popup,Group,PopupRadio,Confirm,Toast,Alert
  },
  methods:{
     // 获取地址列表
    getAdsList(){
      var that = this;
      that.$http.post('/api/user-msg/find',{name:that.name},{emulateJSON: true})
      .then((data)=>{
        // console.log(data.body.data[0].addreses)
        that.adsList = data.body.data[0].addreses
        that.address = data.body.data[0].addreses[0]
      })
    },
    // 选择地址
    seleAds(i,e){
      this.address = this.adsList[i]
    },

    // 取消订单
    onconfirm(){
      var that = this;
      this.showtoast = !this.showtoast;
      setTimeout(() => {
        that.$router.push({ path: '/home/store/'+ that.order.store_id})
      }, 1000);
    },

    // 确认支付【展示支付toast】
    affOrder(){
      var that = this;
      this.showAfftoast = !this.showAfftoast;
      // 存储订单数据
      //将订单信息存入数据库，跳转订单详情 
      this.order.option_way = this.option;
      this.order.adress = this.address;
      this.order.is_option = true;
      this.order.is_cell = false;
      this.order.is_end = false;
      var time = new Date()
      this.order.order_time = time.toLocaleString();
      var order_msg = this.order;
      that.$http.post('api/order-msg/add',{
        find:{name:that.getCookie('username')},
        message:order_msg
      },{emulateJSON: true})
      .then(data=>{
          console.log(data)
          if(data.body.state == 0){
          }else{
               setTimeout(() => {
                 that.order_id = data.body.data._id;
                  that.showtoast = !that.showtoast;
                }, 1000);
              
          }
      })
    },

    //支付
    toOrderMsg(){
      setTimeout(() => {
        this.$router.push({
          name: 'oreder-msg',
          params: {
            id: this.order_id
          }
        })
      }, 1000);
    }
  },
  created(){
    this.getAdsList()
    bus.$on("orderMessage",message =>{
      this.order = message;
      this.order.all_price = parseFloat(this.order.all_food_price) + parseFloat(this.order.store_distribution)
      this.order.is_option = false;
      this.order.user_name = this.name
    })
  },
  beforeDestroy () {
    bus.$off("orderMessage",this.order);
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



