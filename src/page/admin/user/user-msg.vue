<template>
    <div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
					<el-button type="primary" @click="getUserList({name:filters.name})">查询</el-button>
					<el-button type="primary" @click="getUserList()">显示所有</el-button>
				</el-form-item>
            </el-form>
        </el-col>
        <!-- 用户列表 -->
        <el-table :data="userList" style="width: 100%" height="600">
            <el-table-column  type="selection" width="55">
            </el-table-column>
            <!-- 分类用户地址 --> <!-- 列内插入 -->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <!-- 食物列表 -->
                    <el-table :data="scope.row.addreses" height="250" border style="width: 80%">
                        <el-table-column prop="name" label="昵称" width="120"></el-table-column>
                        <el-table-column prop="ads" label="地址" width="120"></el-table-column>
                        <el-table-column prop="msg" label="地址详情" width="120"></el-table-column>
                        <el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
                        <el-table-column label="操作" width="150" >
                            <template slot-scope="foodscope">
                                <el-button type="danger" size="small" @click="removeAds(scope.row,adsscope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户名" width="120"></el-table-column>
            <el-table-column prop="paw" label="密码" width="200"></el-table-column>
            <el-table-column prop="phone" label="联系方式" width="200"></el-table-column>
            <!-- 操作  fixed="right"-->
            <el-table-column label="操作" width="300" >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="showUserEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" plain size="small" @click="findOrder(scope.$index, scope.row)">查看订单</el-button>
                    <el-button type="danger" size="small" @click="removeUSer(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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
    
    </div>
</template>

<script>
import utils from "../../../util.js";
export default {
  data() {
    return {
      // 筛选条件
      filters: {
        name: ""
      },
      // 用户列表
      userList: [],
      //列表选中列
      sels: [],
    //   编辑数据
        editFormShow:false,
        editUserId:'',
        editForm:{

        }
    };
  },
  methods: {
    //   用户信息列表
    getUserList(obj){
        var that = this;
        that.$http.post('api/user-msg/find',obj,{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.userList = data.body.data;
            }
        })
    },
    // 展示用户编辑
    showUserEdit(row){
        var that = this;
        that.$http.post('api/user-msg/find',{_id:row._id},{emulateJSON: true})
        .then((data)=>{
            console.log(data);
            that.editForm = data.body.data[0];
            that.editUserId = row._id
            that.editFormShow = true
        })
    },
    // 提交对用户的修改
    editSubmit(){
        var that = this;
        that.$http.post('api/user-msg/edit',{
            tip:{_id:that.editUserId},
            message:that.editForm
        },{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getUserList();
            }
        })
    },
     // 删除用户
    removeUser(row){
        var that = this;
        that.$http.post('api/user-msg/remove',{_id:row._id},{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getUserList();
            }
        })
    } ,
    // 删除用户地址
    removeAds(user,ads){
        var that = this;
        that.$http.post('api/store-food/edit',{
            tip:{_id:user._id},
            message:{ $pull: { addreses: { _id: ads._id }}}
        },{emulateJSON: true})
        .then((data)=>{
            if (data.body.state == 0) {
                that.$message.error(data.body.message);
            } else{
                that.$message({
                    message: data.body.message,
                    type: 'success'
                });
                that.getUserList();
            }
        })
    },
    // 查看订单
    findOrder(index, row){
        this.$router.push({ 
            path: '/admin/user-order',
            query: {
                _id: row._id
            }
        })
    }
  },
  mounted() {
    var that = this;
    that.getUserList()
  }
};
</script>

<style lang="less" scoped>
.active-tips {
  color: #daa;
}
</style>
