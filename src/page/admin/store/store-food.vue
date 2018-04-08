<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="店名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getFoodList({store_name:filters.name})">查询</el-button>
					<el-button type="primary" @click="getFoodList()">显示所有</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!-- 食品列表   @selection-change="selsChange" -->
        <el-table :data="foodsList" style="width: 100%" height="600">
            <el-table-column  type="selection" width="55">
            </el-table-column>
            <!-- 分类具体食物 -->
            <el-table-column type="expand">
                <!-- 列内插入 -->
                <template slot-scope="scope">
                    <!-- 食物列表 -->
                    <el-table :data="scope.row.foods" height="250" border style="width: 80%">
                        <el-table-column prop="name" label="食物名称" width="120"></el-table-column>
                        <el-table-column prop="specfoods_price" label="价格（元）" width="120"></el-table-column>
                        <el-table-column prop="month_sales" label="月售量" width="120"></el-table-column>
                        <el-table-column prop="is_essential" label="品牌" width="120">
                            <template slot-scope="foodscope">
                                <el-tag
                                :type="foodscope.row.is_essential ? 'success':'primary' "
                                close-transition>{{foodscope.row.is_essential ?'品牌':'非品牌'}}</el-tag>
                            </template>
                        </el-table-column>
                        <!-- month_sales -->
                        <el-table-column label="操作" width="150" >
                            <template slot-scope="foodscope">
                                <el-button type="danger" size="small" @click="removeFood(scope.row,foodscope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="分类名称" width="120"></el-table-column>
            <el-table-column prop="description" label="备注" width="400"></el-table-column>
            <!-- 操作  fixed="right"-->
            <el-table-column label="操作" width="300" >
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="removeClass(scope.row)">删除</el-button>
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
				foodsList: [],

			}
		},
		methods: {
			// 获取食物列表
			getFoodList(obj){
				// 参数查询条件
				var that = this;
				that.$http.post('api/store-food/find',obj,{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.foodsList = data.body.data;
					}
				})
            },
            // 删除分类
            removeClass(row){
                var that = this;
				that.$http.post('api/store-food/remove',{_id:row._id},{emulateJSON: true})
				.then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.getFoodList();
					}
				})
            } ,
            // 删除菜品
            removeFood(msg,food){
                console.log(msg)
                var that = this;
                that.$http.post('api/store-food/edit',{
                    tip:{_id:msg._id},
                    message:{ $pull: { foods: { _id: food._id }}}
                },{emulateJSON: true})
                .then((data)=>{
					if (data.body.state == 0) {
						that.$message.error(data.body.message);
					} else{
						that.$message({
							message: data.body.message,
							type: 'success'
						});
						that.getFoodList();
                    }
                })
            }
        },
		mounted() {
            if(this.$route.query._id){
                this.getFoodList({restaurant_id:this.$route.query._id});
            }else{
                this.getFoodList();
            }
		}
	}

</script>

<style lang="less" scoped>
	.active-tips{
		color: #daa;
	}
</style>
