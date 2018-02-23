<template>
  <div class="add-ads">
      <back-header>添加收货地址</back-header>
      <div class="add-ads-box">
          <form @submit.prevent="submitAds">
                <group class="add-ads-group"  
                title="再来一个收货地址" label-width="20vw" label-margin-right="5vw" label-align="justify">
                    <x-input title="收货人" v-model="adsMessage.name" :required="true"></x-input>
                    <x-input title="联系方式" is-type="china-mobile" placeholder="必填" v-model="adsMessage.phone" :required="true"></x-input>
                    <x-address title="地址选择" v-model="adsMessage.addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
                    <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3" :required="true"></x-textarea>
                </group>
                <x-button action-type="submit" :gradients="['#1D62F0', '#19D5FD']">添加</x-button>
            </form>
            
      </div>
  </div>
</template>
<script>
import backHeader from "../../components/backHeader"
import { Group , XInput , XAddress , XButton , ChinaAddressData , XTextarea } from "vux"
export default {
  name:"add-ads",
  components:{
      backHeader,
      Group , XInput , XAddress , XButton , ChinaAddressData,XTextarea
  },
  data(){
      return{
          adsMessage:{
              name:'',
              phone:'',
              addressValue:['福建省', '福州市', '台江区'],
              adsMore:'',
          },
          addressData: ChinaAddressData,
      }
  },
  methods:{
      submitAds:function(){
            var that = this;
            var formData = JSON.stringify(this.userLogin);
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


