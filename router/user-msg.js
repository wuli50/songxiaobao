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

// 导入数据表
var UserMsg = Song.UserMsg;

// 生成路由
var router = express.Router();
// 增加用户[注册用户]
router.post('/add',(req,res)=>{
    console.log(req.body)
})
// 查询
router.post('/find', (req, res) => {
    // 根据接口参数获取查询条件
    // console.log(req.body)
   UserMsg.find(req.body,(err,data)=>{
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
// 修改食物分类和食物详情
router.post('/edit',(req,res)=>{
    UserMsg.update(req.body.tip,req.body.message,(err)=>{
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
    UserMsg.remove(req.body,(err)=>{
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