<template>
    <div class="mine-msg">
        <back-header>我的信息</back-header>
        <group>
            <cell
            title="用户名"
            :value="user.name"
            :is-link="true"
            :border-intent="false"
            :arrow-direction="showUserName ? 'up' : 'down'"
            @click.native="showUserName = !showUserName"></cell>
            <template v-if="showUserName">
                <cell-box :border-intent="false" class="item">
                    <input type="text" v-model="user.name">
                </cell-box>
            </template>
        </group>
        <group>
            <cell
            title="修改密码"
            :is-link="true"
            :border-intent="false"
            :arrow-direction="showUserPaw ? 'up' : 'down'"
            @click.native="showUserPaw = !showUserPaw"></cell>
            <template v-if="showUserPaw">
                <cell-box :border-intent="false" class="item">
                    <x-input title="新密码" type="password" placeholder="密码必须4-8位" :min="min" :max="max"  v-model="user.password1"></x-input>
                </cell-box>
                <cell-box :border-intent="false" class="item">
                    <x-input title="确认密码" type="password" placeholder="请再次输入密码" v-model="user.password2" @on-blur = "pawConfirme"></x-input>
                </cell-box>
            </template>
        </group>
        <alert v-model="showAlert" :title="alert.title" is-link>{{alert.content}}</alert>
        <group  class="btn-out">
            <x-button plain type="primary">退出登陆</x-button>
        </group>

    </div>  
</template>
<script>
import bus from '../../bus.js'
import backHeader from "../../components/backHeader"
import { Group,Cell,CellBox,XInput,Alert,XButton } from "vux"
export default {
    name:"mine-msg",
    components:{
        backHeader,
        Group,Cell,CellBox,XInput,Alert,XButton
    },
    data(){
        return{
            user:{
                name:"小宝",
                password1:"",
                password2:"",
            },
            max:8,
            min:4,
            showUserName:false,
            showUserPaw:false,
            showAlert:false,
            alert:{
                title:"操作失败",
                count:''
            }
        }
    },
    methods:{
        pawConfirme:function(){
            var that = this;
            if(that.user.password2 != that.user.password1){
                that.showAlert = true;
                that.alert.content = "两次密码不一致，你要不在确认一哈"
            }
        },
    },
    created(){
        bus.$emit('show-bar',false)
    }
  
}
</script>
<style lang="less" scoped>
    .mine-msg{
        background-color: #F5F5F5;
        .item{
            padding: 2vw 5vw;
            color: #888;
            background-color: #F1F1F1;
            input{
                padding: 0 2vw;
            }
        }
    }
    
    
</style>

