<template>
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
        editForm:{

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
.active-tips {
  color: #daa;
}
</style>
