<template>
    <section>
        <div v-if = "is_submit_food==false">
            <el-button class="add-food-btn" type="info" plain icon="el-icon-edit" @click="addFormShow=true">暂时还没有添加食物，去添加一些吧</el-button>
        </div>
        <div v-else>
            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!-- 列表 -->
            <el-table :data="userList" style="width: 100%" height="250"  @selection-change="selsChange">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="id" label="id"  width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="paw" label="密码" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="180">
                </el-table-column>
                <el-table-column label="操作" width="180"  fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showEditForm(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
                <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            </el-col>
        </div>
        <!-- 编辑界面 editForm -->
        <el-dialog title="编辑" :visible.sync="editFormShow" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="paw">
                    <el-input v-model="editForm.paw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormShow = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" >提交</el-button>
            </div>
        </el-dialog>
        <!-- 新增食物界面 -->
        <el-dialog title="新增菜品分类" :visible.sync="addFormShow" :close-on-click-modal="false">
            <el-form :model="addFoodForm" label-width="80px" ref="addFoodForm">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="addFoodForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告" prop="description">
                    <el-input v-model="addFoodForm.description" auto-complete="off"></el-input>
                </el-form-item>
                
                <el-card class="box-card"  v-for="(food, index) in addFoodForm.foods" >
                    <div slot="header" class="clearfix">
                        <span>添加食品</span>
                        <el-button @click.prevent="removeFood(index)">删除</el-button>
                    </div>
                    <div class="text item">
                        <el-form-item label="名称" prop="'foods.' + index + '.name'">
                            <el-input v-model="food.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="价格" prop="'foods.' + index + '.specfoods_price'">
                            <el-input v-model="food.specfoods_price" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌商品" prop="'foods.' + index + '.is_essential'">
                            <el-switch v-model="food.is_essential"></el-switch>
                        </el-form-item>
                        <el-form-item label="店铺照片" prop="'foods.' + index + '.specfoods_price'">
                            <input type="file" name="image_path"  @change="onfilechange(index)">
                        </el-form-item>
                    </div>
                </el-card>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button @click="addFood">新增食物</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormShow = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" >提交</el-button>
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
      foodList: [],
      //列表选中列
      sels: [],
    //   编辑数据
        editFormShow:false,
        editForm:{
        },
        addFormShow:false,
        addFoodForm:{
            description : "",
            name : "汉堡类",
            foods : [ 
                {
                    name : "墨西哥鸡肉卷",
                    is_essential : false,
                    image_path : "00e2fdc050a98bf2e7f228245304cdfbjpeg",
                    month_sales : 34,
                    specfoods_price : 14.9,
                }
            ],
        }
    };
  },
  methods: {
    //   删除
    remove(row) {
      //列表信息
      console.log(row);
    },
    // 批量删除
    batchRemove() {
      var ids = this.sels.map(item => item.id).toString();
    },
    // 监听选中列的变化
    selsChange(sels) {
      console.log(this.sels);
      this.sels = sels;
    },
    // 显示编辑页面
    showEditForm(row){
        var that = this;
        utils.findUser(that,row.name,function(data){
            if (data.state == 0) {
                that.$message.error(data.message);
            } else {
                that.editForm = data.data[0];
                that.editFormShow = true;
            }
        })
    },
    editSubmit(){

    },
    // 新增页面
    removeFood(index) {
        if (index !== -1) {
          this.addFoodForm.foods.splice(index, 1)
        }
    },
    addFood() {
        this.addFoodForm.foods.push({
            name : "墨西哥鸡肉卷",
            is_essential : false,
            image_path : "00e2fdc050a98bf2e7f228245304cdfbjpeg",
            month_sales : 34,
            specfoods_price : 14.9,
        });
    },
    //获取到图片文件
    onfilechange: function(e,index) {
      console.log(e);
      console.log(index)
        // var files = e.target.files || e.dataTransfer.files;
        if (!files.length) 
            {
                return
            }
        // this.storeMsg.image_path = files[0];
    }
  },
  mounted() {
    var that = this;
    utils.findUser(that, "noname", function(data) {
      console.log(data);
      if (data.state == 0) {
        that.$message.error(data.message);
      } else {
        that.userList = data.data;
      }
    });
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
</style>
