<template>
  <div class="shop-ads">
      <back-header>我的收货地址</back-header>
      <router-link to="/mine/add-ads">
        <button class="add-ads">添加收货地址</button>
      </router-link>
      <div class="ads-box" v-for="ads in adsList">
        <form-preview :header-label="ads[0].label" :header-value="ads[0].value"  :body-items="ads.slice(1)" :footer-buttons="buttons2"></form-preview>
      </div>
      
  </div>
</template>
<script>
import bus from '../../bus.js'
import backHeader from "../../components/backHeader"
import {FormPreview,XButton} from "vux"
export default {
  name:"shop-ads",
  components:{
      backHeader,
      FormPreview,XButton
  },
  created(){
      bus.$emit('show-bar',false)
  },
  data(){
    return {
      adsList:[
        [
          {
            label: '收货人',
            value: '。。。'
          }, {
            label: '地址详情',
            value: '。。。'
          }, {
            label: '联系电话',
            value: '。。。'
          }
        ]
      ],
      buttons2: [{
        style: 'primary',
        text: "删除该地址",
        onButtonClick: (name) => {
          alert('点击')
        }
      }]
    }
  }
}
</script>
<style lang="less" scoped>
.ads-box{
  padding: 5vw;
  .vux-form-preview.weui-form-preview{
    .weui-form-preview__hd{
      height: 0;
      line-height: 0;
      overflow: hidden;
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



