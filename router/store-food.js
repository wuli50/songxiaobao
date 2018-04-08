// 导入express模块
var express = require("express");
// 导入数据库
var Song = require("../db/db.js");
// 导入读取图片数据的功能模块
var formidable = require('formidable');
// 导入读取项目文件的功能模块
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser());
var fs = require("fs");
var path = require('path');

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
      store_name:req.body.storename,
      restaurant_id:storedata[0]._id
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
// 查找菜品
router.post('/find', (req, res) => {
  // 根据接口参数获取查询条件
  // console.log(req.body)
  StoreFood.find(req.body,(err,data)=>{
      if(err){
          res.json({
              message:"数据读取失败",
              state:0
          })
      }else{
          res.json({
              data:data,
              state:1,
              message:"数据读取成功"
          })
      }
  })
})
// 添加食物【修改分类】
router.post('/addfood',(req,res)=>{
  var  uploadDir = './static/store_food_image';
  var form = new formidable.IncomingForm();
  //文件的编码格式
  form.encoding = 'utf-8';
  //文件的上传路径
  form.uploadDir = uploadDir;
  //文件的后缀名
  form.extensions = true;
  //文件的大小限制
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, function (err, fields, files){
    var food = fields;
    var file = files.image_path;
    var oldpath = path.normalize(file.path);
    var newfilename = fields.name + '.jpg';
    var newpath = uploadDir + '/food' + newfilename;
    var foodmsg = {
      name:food.name,
      // 招牌？
      is_essential:food.is_essential,
      // 月售
      month_sales:food.month_sales,
      // 价格
      specfoods_price:food.specfoods_price
    }
    console.log(foodmsg)
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.json({
          message: "图片存储失败，请重新提交",
          state: 0
        })
      } else {
        foodmsg.image_path = newpath;
        //update对数据进行修改
        StoreFood.update({_id:req.cookies.class_id},{$push:{"foods":foodmsg}},(err)=>{
            if(err){
              res.json({
                  state:0,
                  message:"数据修改失败"
              })
            }else{
              res.json({
                  state:1,
                  message:"数据修改成功"
              })
            }
        })
      }
    });
  })

})
// 修改食物分类和食物详情
router.post('/edit',(req,res)=>{
  StoreFood.update(req.body.tip,req.body.message,(err)=>{
    if(err){
      res.json({
          state:0,
          message:"数据修改失败"
      })
    }else{
      res.json({
          state:1,
          message:"数据修改成功"
      })
    }
  })
})
//移除
router.post('/remove',(req,res)=>{
  StoreFood.remove(req.body,(err)=>{
    if(err){
      res.json({
          state:0,
          message:"数据删除失败"
      })
    }else{
      res.json({
          state:1,
          message:"数据删除成功"
      })
    }
  })
})
// 导出路由
module.exports = router;