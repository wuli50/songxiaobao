<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
		</el-col>

		<!--列表-->
        <!-- sortable:是否可以排序 -->
		<el-table :data="storeList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="店铺活动">
							<span>{{ props.row.activities.length }}个</span>
						</el-form-item>
						<el-form-item label="活动详情:">
							<div v-for="active in props.row.activities"><p class="active-tips">{{ active.tips }}</p></div>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>

			<el-table-column prop="id" width="60" label="id">
			</el-table-column>
			<el-table-column prop="name" label="店名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="distribution" label="配送费" width="100" sortable>
			</el-table-column>
			<el-table-column prop="rating" label="评分" width="100" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="120" sortable>
			</el-table-column>
			<el-table-column prop="address" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
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
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
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
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				storeList: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					name: '',
					address: "",
					promotion_info: "",
					phone: '',
					is_new: false
				}

			}
		},
		methods: {
			
			// 查询店铺
			findStore(){

			},
			handleCurrentChange(val) {
				this.page = val;
				// this.getUsers();
			},
			//获取用户列表
			getStoreMsg() {
				this.$http.get('http://127.0.0.1:5000/user/store-msg')
                .then((data)=>{
                    // console.log(data.body)
                    this.storeList = data.body;
                })
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						// this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (storeid) {
				var that = this
				this.editFormVisible = true;
				var obj = {id:storeid}
				this.$http.post('http://127.0.0.1:5000/user/find-store-msg',{
					data:obj
				})
                .then((data)=>{
					// console.log(data.body[0])
					that.editForm = data.body[0];
                })
			},
			//显示新增界面
			handleAdd: function () {
				alert('1232')
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					address: "",
					promotion_info: "",
					phone: '',
					is_new: false
				}
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								// this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								// this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						// this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getStoreMsg();
		}
	}

</script>

<style lang="less" scoped>
	.active-tips{
		color: #daa;
	}
</style>
