<template>
    <section>
        <div>
            <el-button class="add-food-btn" type="info" plain icon="el-icon-edit" @click="addFoodClassShow=true">添加分类</el-button>
        </div>
        <div>
            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!-- 食品列表 -->
            <el-table :data="foodsList" style="width: 100%" height="600"  @selection-change="selsChange">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <!-- 分类具体食物 -->
                <el-table-column type="expand">
                    <!-- 列内插入 -->
                    <template slot-scope="scope">
                        <el-button size="small" @click="showFoodEditForm(scope.row)">编辑分类食物</el-button>
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
                        <el-button size="small" @click="showClassEditForm(scope.row)">编辑</el-button>
                        <el-button size="small" type="primary" @click="showAddFood(scope.row)">添加食品</el-button>
                        <el-button type="danger" size="small" @click="removeClass(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑类别界面 editForm -->
        <el-dialog title="编辑" :visible.sync="editClassFormShow" :close-on-click-modal="false">
            <el-form :model="editFoodClassForm" label-width="80px" ref="editFoodClassForm">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="editFoodClassForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告" prop="description">
                    <el-input v-model="editFoodClassForm.description" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editClassFormShow = false">取消</el-button>
                <el-button type="primary" @click.native="editClassSubmit" >提交</el-button>
            </div>
        </el-dialog>
         <!-- 编辑食物界面 editForm -->
        <el-dialog title="编辑食物" :visible.sync="editFoodFormShow" :close-on-click-modal="false">
            <el-form label-width="80px" >
                <div class="text item food-box" v-for="(food , index) in editFoodForm" >
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="food.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="specfoods_price'">
                        <el-input v-model="food.specfoods_price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌商品" prop="is_essential'">
                        <el-switch v-model="food.is_essential"></el-switch>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormShow = false">取消</el-button>
                <el-button type="primary" @click.native="editFoodSubmit" >确认修改</el-button>
            </div>
        </el-dialog>

        <!-- 新增食物分类界面 -->
        <el-dialog title="新增菜品分类" :visible.sync="addFoodClassShow" :close-on-click-modal="false">
            <el-form :model="FoodClassForm" label-width="80px" ref="FoodClassForm">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="FoodClassForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告" prop="description">
                    <el-input v-model="FoodClassForm.description" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormShow = false">取消</el-button>
                <el-button type="primary" @click.native="addclassSubmit" >提交分类添加</el-button>
            </div>
        </el-dialog>

        <!-- 新增分类食物 -->
        <el-dialog title="新增食物" :visible.sync="addFoodShow" :close-on-click-modal="false">
            <el-form label-width="80px" ref="food" :model="food">
                <div class="text item">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="food.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="specfoods_price'">
                        <el-input v-model="food.specfoods_price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌商品" prop="is_essential'">
                        <el-switch v-model="food.is_essential"></el-switch>
                    </el-form-item>
                    <el-form-item label="食品照片" prop="image_path">
                        <input type="file" name="image_path"  @change="onfilechange">
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormShow = false">取消</el-button>
                <el-button type="primary" @click.native="addFoodSubmit" >提交添加</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import utils from "../../util.js";
export default {
  data() {
    return {
        // 
        is_submit_food:false,
      // 筛选条件
        filters: {
            name: ""
        },
      // 食物列表
        foodsList: [],
      //列表选中列
        sels: [],
      // 编辑数据
        editFormShow:false,
        editForm:{
        },
        addFoodClassShow:false,
        FoodClassForm:{
            description : "",
            name : "汉堡类",
        },
        // 修改分类
        editClassFormShow:false,
        editClassid:'',
        editFoodClassForm:{
            description : "",
            name : "",
        },
        // 新增食物
        addFoodShow:false,
        // 添加食物所在的分类_id
        add_class_is:'',
        food:{
            name : "",
            is_essential : false,
            image_path : "",
            month_sales : 0,
            specfoods_price : 11.0,
        },
        // 修改食物
        editFoodFormShow:false,
        editFoodid:'',
        editFoodForm:[],
    };
  },
  methods: {
    //   获取食物列表
    getFoodList(obj){
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
                console.log(that.foodsList)
            }
        })
    },
    //   删除
    remove(row) {
      //列表信息
      console.log(row);
    },
    // 监听选中列的变化
    selsChange(sels) {
      console.log(this.sels);
      this.sels = sels;
    },
    // 添加分类
    addclassSubmit(){
        var that = this;
        that.$http.post("api/store-food/add",{
            storename:that.getCookie('storename'),
            data:that.FoodClassForm
        },{emulateJSON: true})
        .then((data)=>{
             if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getFoodList({store_name:that.getCookie('storename')})
            }
        })
    },
    // 修改分类
    // 显示分类编辑页面
    showClassEditForm(row){
        var that = this;
        //读取相应分类信息
        that.editClassFormShow = true
        that.$http.post('api/store-food/find',{_id:row._id},{emulateJSON: true})
        .then((data)=>{
            that.editFoodClassForm = data.body.data[0];
            that.editClassid = row._id
        })
    },
    // 提交分类修改
    editClassSubmit(){
        var that = this;
        that.$http.post('api/store-food/edit',{
            tip:{_id:that.editClassid},
            message:that.editFoodClassForm
        },{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getFoodList({store_name:that.getCookie('storename')})
            }
        })
    },
    // 添加食物
    // 展示添加食物列表[存储类的_id]
    showAddFood(row){
        var that = this;
        that.addFoodShow = true;
        that.add_class_is = row._id;
        that.setCookie("class_id",row._id,1)
    },
    // 提交添加食品
    addFoodSubmit(){
        var that = this;
        var formdata = new FormData();
        //读取data中所要上传的内容循环append到fordata中
        for (var key in that.food) {  
            if (key) {
                formdata.append(key, that.food[key])
                }
            }
            that.$http.post('api/store-food/addfood',formdata,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getFoodList({store_name:that.getCookie('storename')})
            }
        })
    },
    // 修改food
    showFoodEditForm(row){
        var that = this;
        //读取相应分类信息
        that.$http.post('api/store-food/find',{_id:row._id},{emulateJSON: true})
        .then((data)=>{
            console.log(data)
            that.editFoodForm = data.body.data[0].foods;
            that.editFoodid = row._id
            that.editFoodFormShow = true;
        })

    },
    editFoodSubmit(){
        var that = this;
        that.$http.post('api/store-food/edit',{
            tip:{_id:that.editFoodid},
            message:{
                foods:that.editFoodForm
            }
        },{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getFoodList({store_name:that.getCookie('storename')})
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
            },
    //获取到图片文件
    onfilechange: function(e) {
      console.log(e.target.files);
        var files = e.target.files || e.dataTransfer.files;
      if (!files.length) 
      {
        return
      }
      this.food.image_path = files[0];
    },
  },
  mounted() {
  },
  created(){
    var that = this;
    that.getFoodList({store_name:that.getCookie('storename')})
  }
};
</script>

<style lang="less" scoped>
.add-food-btn{
    margin:20px;
}
.active-tips {
  color: #daa;
}
.food-box{
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    padding-top: 10px;
}
</style>
