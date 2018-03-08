<template>
 <div>
    <back-header>{{islogin==0?"登录":"注册"}}</back-header>
    <div class="login-btn">
        <button-tab v-model="islogin">
            <button-tab-item @on-item-click="consoleIndex()">登录</button-tab-item>
            <button-tab-item @on-item-click="consoleIndex()">注册</button-tab-item>
        </button-tab>
    </div>
    <div class="login-form">
        <!-- 登录 -->
        <div v-if="islogin==0">
            <form @submit.prevent = "submitLogin">
                <group class="login-group"
                title="已经注册了的小宝这里登录勒" label-width="20vw" label-margin-right="5vw" label-align="justify">
                    <x-input title="用户名" v-model="userLogin.name" :required="true"></x-input>
                    <x-input title="密码" type="password" placeholder="必填" v-model="userLogin.psw" :required="true"></x-input>
                </group>
                <x-button action-type="submit" :gradients="['#1D62F0', '#19D5FD']">登录</x-button>
            </form>
        </div>
        <!-- 注册 -->
        <div v-if="islogin==1">
            <form @submit.prevent="submitJoin">
                <group class="join-group"
                title="注册一下加入我们" label-width="20vw" label-margin-right="5vw" label-align="justify">
                    <x-input title="用户名" v-model="userJoin.name" :min="min" :max="max" placeholder="用户名必须2-8位"></x-input>
                    <x-input title="密码" type="password" placeholder="密码必须2-8位" :min="min" :max="max"  v-model="userJoin.password1"></x-input>
                    <x-input title="确认密码" type="password" placeholder="请再次输入密码" v-model="userJoin.password2" @on-blur = "pawConfirme"></x-input>
                    <x-input title="电话" v-model="userJoin.phone" placeholder="输入手机号" is-type="china-mobile"></x-input>
                </group>
                <x-button action-type="submit" :gradients="['#1D62F0', '#19D5FD']">注册</x-button>
            </form>
        </div>
    </div>
    <div>
      <alert v-model="showAlert" :title="alert.title" is-link>{{alert.content}}</alert>
    </div>
 </div>
  
</template>
<script>
import backHeader from "../../components/backHeader"
import { ButtonTab, ButtonTabItem,Group,XInput,XNumber,XAddress,XButton,ChinaAddressData,AlertModule,Alert,XTextarea,cookie} from 'vux'
import { setTimeout } from 'timers';
export default {
    name:"login",
    data(){
        return{
            islogin:0,
            name:"小宝",
            max:8,
            min:2,
            userJoin:{
                name:"小宝",
                password1:"",
                password2:"",
                phone:'',
            },
            userLogin:{
                name:"",
                psw:"",
            },
            addressData: ChinaAddressData,
            showAlert:false,
            alert:{
                title:"操作失败",
                content:""
            }
            
        }
    },
    components:{
        backHeader,
        ButtonTab,ButtonTabItem,Group,XInput,XNumber,XAddress,XButton,ChinaAddressData,AlertModule,Alert,XTextarea
    },
    // 方法
    methods:{
        // 登录
        submitLogin(){
            var that = this;
            var formData = JSON.stringify(this.userLogin);
            console.log(formData);
            if(that.userLogin.name == ''){
                that.showAlert = true;
                that.alert.content = "用户名不能为空"
            }else if(that.userLogin.psw == ''){
                that.showAlert = true;
                that.alert.content = "密码不能为空"
            }else{
                // 发送请求 判断是否可以登录
                this.$http.post('http://127.0.0.1:5000/user/login',{
                    data:formData
                }).then(data=>{
                    console.log(data)
                    if(data.body.state == 0){
                        that.showAlert = true;
                        that.alert.content = data.body.message
                    }else{
                        that.showAlert = true;
                        that.alert.content = "登录成功";
                        that.alert.title = "赶紧去选购吧"
                        cookie.set('username', that.userLogin.name);
                        setTimeout(function(){
                            that.$router.push({ path: '/home'})
                        },1000)
                    }
                })
            }
        },
        pawConfirme:function(){
            var that = this;
            if(that.userJoin.password2 != that.userJoin.password1){
                that.showAlert = true;
                that.alert.content = "两次密码不一致，你要不在确认一哈"
            }
        },
        // 注册
        submitJoin(){
            var that = this;
            var formData = JSON.stringify(this.userJoin);
            console.log(formData)
            this.$http.post('http://127.0.0.1:5000/user/join',{
                data:formData
            }).then(data=>{
                console.log(data)
                if(data.body.state == 0){
                    that.showAlert = true;
                    that.alert.content = data.body.message
                }else{
                    that.showAlert = true;
                    that.alert.content = "注册成功";
                    that.alert.title = "赶紧去选购吧"
                    cookie.set('username', that.userJoin.name);
                    setTimeout(function(){
                        that.$router.push({ path: '/home'})
                    },1000)
                    
                }
            })
        }
    },
    created(){
        
    }    
    
}
</script>
<style lang="less" scoped>
    .login-btn{
        margin: 5vw;
        margin-top: 10xw;
        .vux-button-group > a.vux-button-group-current{
            background-color: #0091FF;
            font-weight: 600;
        }
        .vux-button-group > a.vux-button-tab-item-last:after,
        .vux-button-group > a.vux-button-tab-item-first:after{
            border-color: #0091FF;
        }
    }
    .login-form>div{
        width: 100%;
    }
    .login-form{
        padding: 5vw;
        height: 100%;
        display: flex;
        align-items: center;
        .join-group,.login-group{
            width: 100%;
            border-radius: 5vw;
            overflow: hidden;
            box-shadow: 2vw 2vw 2vw  #ddd;
        }
    }
    button{
        margin-top: 10vw;
    }
    

</style>




