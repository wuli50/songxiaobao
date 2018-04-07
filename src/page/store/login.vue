<template>
  <section>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="login-box" tab-position="left">
        <el-tab-pane label="登录" name="login">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="top" label-width="0px" class="demo-ruleForm login-container" >
              <h3 class="title">店家登录</h3>
              <el-form-item label="店名" prop="name">
                <el-input type="text" v-model="loginForm.name" auto-complete="off" placeholder="店名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="paw">
                <el-input type="password" v-model="loginForm.paw" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%" @click.native.prevent="login">登录</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="join">
            <el-form :model="joinForm" :rules="rules" ref="joinForm" label-position="top" label-width="0px" class="demo-ruleForm login-container" >
              <h3 class="title">店家注册</h3>
              <el-form-item label="店名" prop="name">
                <el-input type="text" v-model="joinForm.name" auto-complete="off" placeholder="店名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="paw">
                <el-input type="password" v-model="joinForm.paw" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPaw">
                <el-input type="password" v-model="joinForm.checkPaw" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="join" >注册</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
  </section>

</template>
<script>
import bus from '../../bus.js'
import utils from '../../util.js'

  export default {
    data() {
      var validatePaw2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.joinForm.paw) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
        return {
            activeName: 'login',
            joinForm: {
              name: '',
              paw:"",
              checkPaw: ''
            },
            loginForm:{
              name: '',
              paw:"",
            },
            rules: {
              name: [
                  { required: true, message: '请输入店铺名', trigger: 'blur' },
              ],
              paw: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
              ],
              checkPaw: [
                { validator: validatePaw2, trigger: 'blur' }
              ],
            },
        };
    },
    created(){
      bus.$emit('show-bar',false)
    },
    methods: {
      handleClick(tab, event) {
      },
      login(){
        var that = this;
        that.$http.post('/api/store-msg/login',that.loginForm,{emulateJSON: true})
        .then((data)=>{
          if (data.body.state == 0) {
            that.$message.error(data.body.message);
          } else{
            that.$message({
              message: data.body.message,
              type: 'success'
            });
            //传入账号名，密码，和保存天数3个参数
            that.setCookie("storename",that.loginForm.name,5)
            that.$router.push({ path: '/store'})

          }
        })
      },
      join(){
        var that = this;
        that.$http.post('/api/store-msg/add',that.joinForm,{emulateJSON: true})
        .then((data)=>{
          if (data.body.state == 0) {
            that.$message.error(data.body.message);
          } else{
            that.$message({
              message: data.body.message,
              type: 'success'
            });
          }
        })
      }
    }
  }

</script>

<style lang="less" scoped>
.login-box{
  margin: 180px auto;
  background-color: white;
  width: 700px;
  .login-container {
        border-radius: 5px;
        background-clip: padding-box;
        margin: 10px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
          .title {
              margin: 0px auto 40px auto;
              text-align: center;
              color: #505458;
          }
          .remember {
              margin: 0px 0px 35px 0px;
          }
    }

}
    

</style>
