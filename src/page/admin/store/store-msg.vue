<template>
	<section>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="店名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="findStore">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->

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

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

		<!--编辑界面-->
		<!-- <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="店名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="editForm.address"></el-input>
				</el-form-item>
				<el-form-item label="公告" prop="promotion_info">
					<el-input type="textarea" v-model="editForm.promotion_info"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="新店" prop="is_new">
					<el-switch v-model="editForm.is_new"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog> -->

		<!--新增界面-->
		<!-- <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="店名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="公告" prop="promotion_info">
					<el-input type="textarea" v-model="addForm.promotion_info"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="addForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="新店" prop="is_new">
					<el-switch v-model="addForm.is_new"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog> -->
	</section>
</template>

<script>
	export default {
		data() {
			return {
				// filters: {
				// 	name: ''
				// },
				storeList: [],
				// total: 0,
				// page: 1,
				// listLoading: false,
				// sels: [],//列表选中列

				// editFormVisible: false,//编辑界面是否显示
				// editLoading: false,
				// //编辑界面数据
				// editForm: {},

				// addFormVisible: false,//新增界面是否显示
				// addLoading: false,
				// //新增界面数据
				// addForm: {
				// 	name: '',
				// 	address: "",
				// 	promotion_info: "",
				// 	phone: '',
				// 	is_new: false
				// }

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
