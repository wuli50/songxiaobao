<template>
  <div class="top-back">
      <div class="back-box">
          <img src="../assets/img/返回.png" alt="" @click="back">
          <span class="title">
              <!-- 每个页面不一样用插槽来做替换 -->
              <slot></slot>
          </span>
      </div>
  </div>
</template>
<script>
export default {
  name:"backheader",
  data(){
      return{

      }
  },
  methods:{
      back(){
          this.$router.back();
      }
  }
}
</script>
<style scoped>
.back-box,.top-back{
    width: 100%;
    background-color: #0091FF;
}
.top-back{
    text-align: center;
    font-size: 5vw;
    font-weight: 600;
    color:white;
    line-height: 10vw;
}
.top-back img{
    height: 5vw;
    float: left;
    margin-top: 2.5vw;
    margin-left: 2.5vw;
}

</style>

