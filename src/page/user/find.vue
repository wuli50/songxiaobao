<template>
  <div class="user-page">
      <header>
          <div @click="back()">
              <img src="../../assets/img/home/返回 .png" alt="" class="left back" >
          </div>
          
          <span class="find">
              <img src="../../assets/img/home/搜索.png" alt="">
              <input type="text" placeholder="请输入你要的商品">
          </span>
          <span class="right">搜索</span>
          <div class="clear"></div>
      </header>
      <main>
          <h2>热门搜索</h2>
          <div class="hot">
              <span class="hotfood"  v-for = "v in hot">{{v.search_word}}</span>
          </div>
      </main>
  </div>
</template>
<script>
export default {
  name:"find",
  data(){
      return {
          hot:{},
      }

  },
  methods:{
      back(){
          location.href = "/"
      },
       getHot(){
          this.$http.get('/ele/shopping/v3/hot_search_words?latitude=31.96205&longitude=118.85778')
            .then((data)=>{
                this.hot = data.body;
                console.log(this.hot[0].search_word)
            })
      },
  },
  created(){
      this.getHot();
  }
}
</script>
<style scoped>
header{
    height: 15vw;
    padding:3vw 5vw;
    text-align: center;
    background-color: white;
}
img{
    height: 6vw;
}
img.back{
    height: 7vw;
}
.find{
    display: inline-block;
    background-color: #dfdfff;
    border: 1px solid #dfdfff;
    height: 8vw;
    padding: 1vw 2vw;
}
.find input{
    line-height: 5vw;
    background-color: #dfdfff;
    color: #999999;
    border: 0px;
}
span.right{
    line-height: 8vw;
}
main{
    padding: 2vw;
}
h2{
    font-size: 5vw;
}
.hotfood{
    margin: 1vw 1.5vw;
    display: inline-block;
    padding: 0.5vw 1vw; 
    background-color: #dddddd;
    text-align: center;
    border-radius: 1vw;
}
</style>

