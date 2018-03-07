<template>
<div class="order-msg">
    <back-header>订单详情</back-header>
</div>
  
</template>
<script>
import bus from '../../bus.js'
import backHeader from "../../components/backHeader"

export default {
  name:"order-msg",
  components:{
      backHeader,
  },
  data(){
      return{
          order:{}
      }
  },
  methods:{

  },
  created(){
      bus.$on("orderMessage",message =>{
        console.log(message)
        this.order = message;
    })
  },
   beforeDestroy () {
       bus.$off("orderMessage",this.order);
   }
}
</script>
<style lang="less" scoped>

</style>


