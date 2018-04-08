// 导入express模块
var express = require("express");
// 导入数据库
var Song = require("../db/db.js");
// 导入读取图片数据的功能模块
var formidable = require('formidable');
// 导入读取项目文件的功能模块
var fs = require("fs");
var path = require('path');

// 导入数据表
var StoreMsg = Song.StoreMsg;
var StoreFood = Song.StoreFood;

// 生成路由
var router = express.Router();

//查看店铺信息
// 创建接口
router.post('/find', (req, res) => {
    // 根据接口参数获取查询条件
    // console.log(req.body)
    StoreMsg.find(req.body,(err,data)=>{
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
// 添加店铺【注册店铺】
router.post('/add',(req,res)=>{
  StoreMsg.find({name:req.body.name},(err,data)=>{
    if(data.length != 0){
      res.json({
        state:0,
        message:"此店名已存在,换一个吧"
      })
    }else{
      var storemsg = new StoreMsg({
        name:req.body.name,
        paw:req.body.paw
      })
      storemsg.save(function (error, data, status){
        if(!error){
          res.json({
            state:1,
            message:"注册成功"
          })
        }
      })
    }
  })
})
// 店铺登录
router.post('/login',(req,res)=>{
  StoreMsg.find({name:req.body.name},(err,data)=>{
    if(err){
      res.json({
        message:"数据库读取失败",
        state:0
      })
    }else{
        if(data.length == 0){
            res.json({
                message:"该店铺不存在，快去注册一个吧",
                state:0
            })
        }else{
            if(data[0].paw == req.body.paw){
                var time = new Date(); 
                time.setHours(time.getHours()+48);
                res.cookie('storename',req.body.name,{expires:time});
                res.json({
                    message:"登录成功",
                    state:1
                })
                
            }else{
                res.json({
                    message:"密码错误",
                    state:0
                }) 
            }
        }
    }
  })
})
// 修改店铺信息
router.post('/update', (req, res) => {
  // var uploadDir = './src/assets/image';
  var  uploadDir = './static/store_msg_image';
  var form = new formidable.IncomingForm();
  //文件的编码格式
  form.encoding = 'utf-8';
  //文件的上传路径
  form.uploadDir = uploadDir;
  //文件的后缀名
  form.extensions = true;
  //文件的大小限制
  form.maxFieldsSize = 2 * 1024 * 1024;
  // console.log(req)
  form.parse(req, function (err, fields, files) {
    StoreMsg.count({}, (err, num) => {
      var id = num+1;
      var store = fields;
      var file = files.image_path;
      var oldpath = path.normalize(file.path);
      var newfilename = fields.name + id + '.jpg';
      var newpath = uploadDir + '/store' + newfilename;
      var storemsg = {
        id:store.id,
        name: store.name,
        address: store.address,
        phone: store.phone,
        promotion_info: store.promotion_info,
        distribution: store.distribution,
        type: store.type,
        is_aduit_msg: store.is_aduit_msg,
        is_submit_msg:true,
        is_submit_food:false,
        is_aduit_food:false
      }
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          res.json({
            message: "图片存储失败，请重新提交",
            state: 0
          })
        } else {
          storemsg.image_path = newpath;
          //update对数据进行修改
          // 参数一，需要修改的数据的查询条件；参数二：修改的内容；参数三：修改结果
          StoreMsg.update({name:storemsg.name},storemsg,(err)=>{
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
})
// 审核店铺信息
router.post('/aduit',(req,res)=>{
  console.log(req.body);
  StoreMsg.update(req.body.find,req.body.editmsg,(err)=>{
    if(err){
      res.json({
          state:0,
          message:"数据审核失败"
      })
    }else{
      res.json({
          state:1,
          message:"数据审核成功"
      })
    }
  })
})
// 删除店铺
router.post('/remove',(req,res)=>{
  console.log(req.body);
  StoreMsg.remove(req.body,(err)=>{
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