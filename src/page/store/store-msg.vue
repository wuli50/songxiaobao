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
			<el-form-item label="店铺性质" prop="type">
				<el-checkbox-group v-model="storeMsg.type">
				<el-checkbox label="同事一波" name="type"></el-checkbox>
				<el-checkbox label="一人狂欢" name="type"></el-checkbox>
				<el-checkbox label="宿舍小聚" name="type"></el-checkbox>
				<el-checkbox label="俩人优选" name="type"></el-checkbox>
				<el-checkbox label="美食" name="type"></el-checkbox>
				<el-checkbox label="午餐" name="type"></el-checkbox>
				<el-checkbox label="甜品" name="type"></el-checkbox>
				<el-checkbox label="粉面" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="店铺照片" prop="image_path">
				<input type="file" name="photo" id="photo" @change="onfilechange">
				<img :src="storeMsg.image_path" alt="">
        		<button type="button" @click="submit">确认上传</button>
			</el-form-item>
			<el-form-item label="店铺公告" prop="promotion_info">
				<el-input  type="textarea" v-model="storeMsg.promotion_info"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="submitForm">立即创建</el-button>
				<el-button @click="resetForm">重置</el-button>
			</el-form-item>
			</el-form>
	</section>
</template>

<script>
export default {
  data() {
    return {
      storeMsg: {
        name: "",
        address: "",
        phone: "",
        promotion_info: "",
        distribution: 0,
        type: [],
        // 是否审核店铺
        is_aduit_msg: false,
       	image_path: "../../assets/img/nav-icon1-dis@2x.png"
      },
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入店铺地址", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个店铺性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        promotion_info: [
          { required: true, message: "请填写店铺公告", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      var obj = this.storeMsg;
      console.log(obj);
      // this.$http.post('http://127.0.0.1:5000/add-store-msg',{
      // 	data:obj
      // }).then({

      // })
    },
    resetForm() {},
    // 上传图片
    submit: function() {
 
    },
    onfilechange: function(e) {
	  //获取到图片文件
	  console.log(e.target.files);
      var files = e.target.files || e.dataTransfer.files;
	  if (!files.length) 
	  {
		  return
	  }
	  this.storeMsg.image_path = files[0];
	  var formdata = new FormData()
	  formdata.append("image_path", files[0]);
	  this.$http.post("http://127.0.0.1:5000/add-store-image", formdata,{
      headers:{
              'Content-Type':'multipart/form-data'
          }
    }).then((data)=>{
      
    })
    }
  },
  mounted() {},
  created(){
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
