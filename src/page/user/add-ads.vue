<template>
  <div class="add-ads">
      <back-header>添加收货地址</back-header>
      <div class="add-ads-box">
          <form @submit.prevent="submitAds">
                <group class="add-ads-group"  
                title="再来一个收货地址" label-width="20vw" label-margin-right="5vw" label-align="justify">
                    <x-input title="收货人" v-model="adsMessage.name" :required="true"></x-input>
                    <x-input title="联系方式" is-type="china-mobile" placeholder="必填" v-model="adsMessage.phone" :required="true"></x-input>
                    <!-- <x-address title="地址选择" v-model="adsMessage.addressValue" raw-value :list="addressData" value-text-align="left"></x-address> -->
                    <x-input title="地区"  placeholder="请填写省市县（区）" v-model="adsMessage.ads" :required="true"></x-input>
                    <x-textarea title="详细信息" placeholder="请填写详细信息" v-model="adsMessage.msg" :show-counter="false" :rows="3" :required="true"></x-textarea>
                </group>
                <x-button action-type="submit" :gradients="['#1D62F0', '#19D5FD']">添加</x-button>
            </form>
            <alert v-model="showAlert" :title="alert.title" is-link>{{alert.content}}</alert>
      </div>
  </div>
</template>
<script>
import backHeader from "../../components/backHeader"
import { Group , XInput , XAddress , XButton , ChinaAddressData , XTextarea,Alert } from "vux"
export default {
  name:"add-ads",
  components:{
      backHeader,
      Group , XInput , XAddress , XButton , ChinaAddressData,XTextarea,Alert
  },
  data(){
      return{
          name:this.getCookie('username'),
          adsMessage:{
              name:'',
              phone:'',
              ads:'福建省福州市鼓楼区',
              msg:'',
          },
        showAlert:false,
        alert:{
            title:"提示",
            count:''
        },
        addressData: ChinaAddressData,
      }
  },
  methods:{
    //   添加收货地址
      submitAds:function(){
            var that = this;
            console.log(that.name)
            that.$http.post('api/user-msg/edit',{
                find:{name:that.name},
                message:{$push:{"addreses":that.adsMessage}}
            },{emulateJSON: true})
            .then((data)=>{
                that.showAlert = true;
                that.alert.content = data.body.message;
            })
      }
  }
}
</script>
<style lang="less" scoped>
.add-ads-box{
    margin: 5vw;
    .add-ads-group{
        border-radius: 5vw;
        overflow: hidden;
        box-shadow: 1vw 1vw 1vw #ddd;
        margin-bottom: 5vw;
    }
}

</style>


