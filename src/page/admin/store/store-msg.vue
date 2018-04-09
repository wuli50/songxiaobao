<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="店名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getStoreList({name:filters.name})">查询</el-button>
					<el-button type="primary" @click="getStoreList()">显示所有</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
        <!-- sortable:是否可以排序  @selection-change="selsChange"-->
		<el-table :data="storeList" highlight-current-row style="width: 100%;" height="600">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="_id" width="60" label="_id">
			</el-table-column>
			<el-table-column prop="name" label="店名" width="120">
			</el-table-column>
			<el-table-column prop="is_aduit_msg" label="店铺信息审核" width="120">
				<template slot-scope="scope">
					<el-button :type="scope.row.is_aduit_msg ? 'success':'primary' " @click="aduit('msg',scope.row)">{{scope.row.is_aduit_msg ?'已审核':'未审核'}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="is_aduit_food" label="店铺食物审核" width="120">
				<template slot-scope="scope">
					<el-button :type="scope.row.is_aduit_food ? 'success':'primary' " @click="aduit('food',scope.row)">{{scope.row.is_aduit_msg ?'已审核':'未审核'}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="distribution" label="配送费" width="100" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="120" sortable>
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200" fixed="right">
				<template scope="scope">
					<el-button type="primary" plain size="small" @click="findFood(scope.$index, scope.row)">查看菜品</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				filters:{
					name:""
				},
				storeList: [],

			}
		},
		methods: {
			// 获取店铺列表
			getStoreList(obj){
				// 参数查询条件
				var that = this;
				that.$http.post('api/store-msg/find',obj,{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.storeList = data.body.data;
					}
				})
			},
			// 删除店铺
			handleDel(index,row){
				console.log(index);
				console.log(row);
				var that = this;
				that.$http.post('api/store-msg/remove',{_id:row._id},{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.getStoreList();
					}
				})
			},
			// 审核
			aduit(type,row){
				var that = this;
				// 查询条件
				var find = {
					_id:row._id
				}
				// 修改条件
				var editmsg = {}
				if(type == 'msg'){
					editmsg.is_aduit_msg = true;
				}else{
					editmsg.is_aduit_food = true;
				}
				that.$http.post('api/store-msg/aduit',{
					find:find,   
					editmsg:editmsg
				},{emulateJSON: true})
				.then((data)=>{
					console.log(data);
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.storeList = data.body.data;
						that.getStoreList();
					}
					
				})

			},
			// 查看菜品
			findFood(index, row){
				console.log(row)
				this.$router.push({ 
					path: '/admin/store-food',
					query: {
						_id: row._id
					}
				})
			}
			
		},
		mounted() {
			this.getStoreList();
		}
	}

</script>

<style lang="less" scoped>
	.active-tips{
		color: #daa;
	}
</style>
