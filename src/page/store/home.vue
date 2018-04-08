<template>
	<el-row class="container">
        <!-- 头部 -->
		<el-col :span="24" class="header">
			<router-link to = "/store">
				<el-col :span="10" class="logo">
					{{sysName}}
				</el-col>
			</router-link>
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
				<el-menu>
					<el-menu-item index="0">
						<router-link to = "/store/store-msg"><i class="el-icon-message"></i>店铺信息管理</router-link>
					</el-menu-item>
					<el-menu-item index="1">
						<router-link to = "/store/store-food"><i class="el-icon-message"></i>店铺食物管理</router-link>
					</el-menu-item>
					
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
					<el-col :span="10" class="content-wrapper" style="margin:10px">	
						<el-button :type="storeMsg.is_aduit_msg?'success':'danger'" plain>{{storeMsg.is_aduit_msg?'店铺信息审核通过':'店铺信息待审核中'}}</el-button>			
					</el-col>
					<el-col :span="10" class="content-wrapper" style="margin:10px">	
						<el-button :type="storeMsg.is_aduit_food?'success':'danger'" plain>{{storeMsg.is_aduit_food?'食品信息审核通过':'食品信息待审核中'}}</el-button>			
					</el-col>
					<!-- 其他部分 -->
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
				sysName:'送小煲店家管理系统',
				adminUserName: ' ',
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
				},
				active: 0,
				storeMsg:{}
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
			logout(){
				this.setCookie('storename','',1)
				this.isLogin()
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			// 判断是否登录
			isLogin(){
				if(this.getCookie('storename') == ''){
					this.$message({
						showClose: true,
						message: '你还没有登录咧'
					});
					this.$router.push({ path: '/store/login'})
				}else{
					this.adminUserName = this.getCookie('storename')
				}
			},
			// 获取店铺基本数据
			getStore(){
				var that = this;
				// console.log(that.getCookie('storename'))
				that.$http.post('api/store-msg/find',{
					name:that.getCookie('storename')
				},{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.storeMsg = data.body.data[0];
					}
				})
			},
		},
		mounted() {

        },
        created(){
			bus.$emit('show-bar',false)
			this.isLogin()
			this.getStore()
			
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
			.logo{
				color: white;
			}
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