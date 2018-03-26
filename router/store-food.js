// 导入express模块
var express = require("express");
// 导入数据库
var Song = require("../db/db.js");
// 导入读取图片数据的功能模块
var formidable = require('formidable');
// 导入读取项目文件的功能模块
var fs = require("fs");

// 导入数据表
var StoreMsg = Song.StoreMsg;
var StoreFood = Song.StoreFood;

// 生成路由
var router = express.Router();


// 添加菜品【添加分类名】
router.post('/add',(req,res)=>{
    // 获取接口参数信息作为查询条件
  StoreMsg.find({name:req.body.storename},(err,storedata)=> {
    // 获取所在店铺的信息
    console.log(storedata[0])
    var storeclass = new StoreFood({
      description:req.body.data.description,
      // 分类名称
      name:req.body.data.name,
      food:[],
      // 作为store-food表的字段建立联系
      restaurant_object_id:storedata[0]._id
    })
    storeclass.save((err,data,status)=>{
      if(!err){
        res.json({
          state:1,
          message:'添加分类成功'
        })
      }else{
        res.json({
          state:0,
          message:'添加分类失败'
        })
      }
    })
  })
})
// 导出路由
module.exports = router;