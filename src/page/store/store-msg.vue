<template>
	<section>
		<el-form :model="storeMsg" :rules="rules" ref="storeMsg" label-width="100px" class="store-form">
			<el-form-item label="店铺名称" prop="name">
				<el-input v-model="storeMsg.name"></el-input>
			</el-form-item>
			<el-form-item label="店铺地址" prop="address">
				<el-input v-model="storeMsg.address"></el-input>
			</el-form-item>
			<el-form-item label="店铺电话" prop="phone">
				<el-input v-model="storeMsg.phone"></el-input>
			</el-form-item>
      <el-form-item label="配送费" prop="distribution">
				<el-input-number v-model="storeMsg.distribution" :step="0.5" :min="0"></el-input-number>
			</el-form-item>
      <!-- 多选 -->
			<el-form-item label="店铺性质">
				<el-checkbox-group v-model="storeMsg.type" @change="CheckedTypeChange">
            <el-checkbox v-for="type in types" :label="type" :key="type" >{{type}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="店铺照片" prop="image_path">
				<input type="file" name="photo" id="photo" @change="onfilechange">
        <img :src="storeMsg.image_path" alt="">
			</el-form-item>
			<el-form-item label="店铺公告" prop="promotion_info">
				<el-input  type="textarea" v-model="storeMsg.promotion_info"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="submitForm" :disabled="storeMsg.is_submit_msg">立即创建</el-button>
				<el-button @click="resetForm">重置</el-button>
        <el-button type="primary"  @click="submitForm" v-if="storeMsg.is_submit_msg" >我要修改</el-button>

			</el-form-item>
			</el-form>
	</section>
</template>

<script>
export default {
  data() {
    return {
      storeMsg: {
        id:0,
        name: "",
        address: "",
        phone: "",
        promotion_info: "",
        distribution: 0,
        type: [],
        // 是否审核店铺
        is_aduit_msg: false,
        is_aduit_food:false,
       	image_path: ""
      },
      types:['同事一波', '一人狂欢', '宿舍小聚', '俩人优选','美食','午餐','甜品','粉面'],
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入店铺地址", trigger: "blur" }
        ],
        phone:[
          { required: true, message: "请输入店铺电话", trigger: "blur" }          
        ],
        type: [
          {
            required: true,
            message: "请至少选择一个店铺性质",
            trigger: "change"
          }
        ],
        promotion_info: [
          { required: true, message: "请填写店铺公告", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取商店数据
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
            that.storeMsg.image_path = '../../.'+data.body.data[0].image_path;
          }
      })
    },
    // 改变type
    CheckedTypeChange(){
      console.log(this.storeMsg.type)
    },
    submitForm() {
      var that = this;
      var formdata = new FormData();
      //读取data中所要上传的内容循环append到fordata中
      for (var key in that.storeMsg) {  
        if (key) {
          formdata.append(key, that.storeMsg[key])
        }
      }
      that.$http.post("api/store-msg/update", formdata,{
        headers:{
                'Content-Type':'multipart/form-data'
            }
      }).then((data)=>{
         if (data.body.state == 0) {
            that.$message.error(data.body.message);
          } else{
            that.$message({
              message: data.body.message,
              type: 'success'
            });
          }
      })
    },
    resetForm() {},
    //获取到图片文件
    onfilechange: function(e) {
      console.log(e.target.files);
        var files = e.target.files || e.dataTransfer.files;
      if (!files.length) 
      {
        return
      }
      this.storeMsg.image_path = files[0];
    },
  },
  mounted() {},
  created(){
    this.getStore()
    
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
