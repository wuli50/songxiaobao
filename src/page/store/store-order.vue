<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.user_name" placeholder="用户名"></el-input>
                    <el-button type="primary" @click="getOrderList({store_name:filters.store_name})">查询</el-button>
				</el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getOrderList({is_end:false})" plain>点击查询未完成订单</el-button>
				</el-form-item>
                <el-button type="primary" @click="getOrderList({})">显示所有</el-button>
			</el-form>
		</el-col>

		<!--列表-->
        <!-- sortable:是否可以排序  @selection-change="selsChange"-->
		<el-table :data="orderList" highlight-current-row style="width: 100%;" height="600">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<!-- 具体食物 -->
                <el-table-column type="expand">
                    <!-- 列内插入 -->
                    <template slot-scope="scope">
                        <!-- 食物列表 -->
                        <el-table :data="scope.row.order_list" height="250" border style="width: 80%">
                            <el-table-column prop="name" label="食物名称" width="120"></el-table-column>
                            <el-table-column prop="price" label="价格（元）" width="120"></el-table-column>
                            <el-table-column prop="num" label="数量" width="120"></el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
			<el-table-column prop="user_name" label="用户名" width="120"></el-table-column>
			
			<el-table-column prop="is_end" label="订单完成状态" width="120">
				<template slot-scope="scope">
					<el-button :type="scope.row.is_end ? 'success':'primary' " @click="changeOrder('is_end',scope.row)">{{scope.row.is_end ?'已完成':'未完成'}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="is_cell" label="订单是否取消" width="120">
				<template slot-scope="scope">
					<el-button :type="scope.row.is_cell ? 'success':'primary' " @click="changeOrder('is_cell',scope.row)">{{scope.row.is_cell ?'已取消':'未取消'}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="option_way" label="支付方式" width="100" ></el-table-column>
			<el-table-column prop="order_time" label="订单时间" width="200" sortable></el-table-column>
			<el-table-column prop="all_price" label="总价" min-width="100" sortable></el-table-column>
            <el-table-column prop="address.name" label="收货人" width="120"></el-table-column>
            <el-table-column prop="address.ads" label="地址" width="120"></el-table-column>
            <el-table-column prop="address.msg" label="地址详情" width="120"></el-table-column>
            <el-table-column prop="address.phone" label="联系方式" width="120"></el-table-column>
			<el-table-column label="操作" width="100" fixed="right">
				<template scope="scope">
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
					store_name:""
				},
				orderList: [],

			}
		},
		methods: {
			// 获取店铺列表
			getOrderList(obj){
				// 参数查询条件
				var that = this;
				obj.store_name = that.getCookie('storename')
				console.log(obj)
				that.$http.post('api/order-msg/find',obj,{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.orderList = data.body.data;
					}
				})
			},
			// 删除店铺
			handleDel(index,row){
				console.log(index);
				console.log(row);
				var that = this;
				that.$http.post('api/order-msg/remove',{_id:row._id},{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.getOrderList({});
					}
				})
			},
			// 改变订单
			changeOrder(type,row){
				var that = this;
				// 查询条件
				var find = {
					_id:row._id
				}
				// 修改条件
				var editmsg = {}
				editmsg[type] = true
				that.$http.post('api/order-msg/update',{
					tip:find,   
					message:editmsg
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
						that.orderList = data.body.data;
						that.getOrderList({});
					}
					
				})
			}
			
		},
		mounted() {
            this.getOrderList({});
		}
	}

</script>

<style lang="less" scoped>
	.active-tips{
		color: #daa;
    }
</style>
