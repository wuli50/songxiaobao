<template>
	<el-row class="container">
        <!-- 头部 -->
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo">
				{{sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
                <el-dropdown  trigger="hover">
                    <span class="el-dropdown-link" style="color:#fff">
                        {{adminUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的信息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside>
				<!--导航菜单-->
                <!-- default-openeds:当前激活菜单的index -->
				<el-menu :default-openeds="[1]">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>店铺管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1"><router-link to = "/admin/store-msg">店铺信息管理</router-link></el-menu-item>
                            <el-menu-item index="1-2"><router-link to = "/login">店铺食物管理</router-link></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
					<el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1"><router-link to = "/admin/store-msg">用户信息管理</router-link></el-menu-item>
                            <el-menu-item index="2-2"><router-link to = "/login">用户订单管理</router-link></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view>
                                
                            </router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import bus from '../../bus.js'
	export default {
		data() {
			return {
				sysName:'送小煲后台管理系统',
				adminUserName: '小煲',
				adminUserPho: './login.png',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
			},
			handleopen() {
			},
			handleclose() {
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {


			},
			
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {

        },
        created(){
            bus.$emit('show-bar',false)
        },
	}

</script>

<style scoped lang="less">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #555;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-right-width: 1px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>