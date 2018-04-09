<template>
  <div class="shop-ads">
      <back-header>我的收货地址</back-header>
      <router-link to="/mine/add-ads">
        <button class="add-ads">添加收货地址</button>
      </router-link>
      <div class="ads-box" v-for="ads in adsList">
        <ul class="ads-msg">
          <li class="ads-msg-li">
            <b>收货人</b><span>{{ads.name}}</span>
          </li>
          <li class="ads-msg-li">
            <b>联系方式</b><span>{{ads.phone}}</span>
          </li>
          <li class="ads-msg-li">
            <b>收货地址</b><span>{{ads.ads}}</span>
          </li>
          <li class="ads-msg-li">
            <b>地址详情</b><span>{{ads.msg}}</span>
          </li>
          <li style="text-align: right"><x-button mini="true" plain type="primary" @click.native = "removeAds(ads._id)">删除该地址</x-button></li>
        </ul>
      </div>
      <alert v-model="showAlert" :title="alert.title" is-link>{{alert.content}}</alert>
      
  </div>
</template>
<script>
import bus from '../../bus.js'
import backHeader from "../../components/backHeader"
import {FormPreview,XButton,Alert} from "vux"
export default {
  name:"shop-ads",
  components:{
      backHeader,
      FormPreview,XButton,Alert
  },
  created(){
      bus.$emit('show-bar',false);
      this.getAdsList()
  },
  data(){
    return {
      name:this.getCookie('username'),
      adsList:[
        {
          name: "111",
          phone : "15478945612",
          ads : "福建省福州市鼓楼区",
          msg : "",
        }
      ],
      showAlert:false,
        alert:{
            title:"提示",
            count:''
        },
    }
  },
  methods:{
    // 获取地址列表
    getAdsList(){
      var that = this;
      that.$http.post('/api/user-msg/find',{name:that.name},{emulateJSON: true})
      .then((data)=>{
        console.log(data.body.data[0].addreses)
        that.adsList = data.body.data[0].addreses
      })
    },
    // 删除地址
    removeAds(id){
      var that = this
      that.$http.post('api/user-msg/edit',{
          find:{name:that.name},
          message:{ $pull: { "addreses": { _id: id}}}
      },{emulateJSON: true})
      .then((data)=>{
          that.showAlert = true;
          that.alert.content = data.body.message;
          that.getAdsList();
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ads-box{
  padding: 5vw;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .ads-msg{
    .ads-msg-li{
      display: flex;
      justify-content: space-between;
      span{
        flex-grow:1;
        margin-left: 15px;
      }
    }
  }
  
}
.add-ads{
  width: calc(100%-10vw);
  margin: 5vw;
  background-color: rgba(1, 1, 1, 0);
  color: #0091FF;
  border: 1px solid #0091FF;
  border-radius: 5vw;
  line-height: 10vw;
  margin-bottom: 0;
}
</style>



