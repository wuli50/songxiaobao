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
var OrderMsg = Song.OrderMsg;

// 生成路由
var router = express.Router();

// 添加订单
router.post('/add',(req,res)=>{
    console.log(req.body.find)
    UserMsg.find(req.body.find,(err,userdata)=> {
        var ordermsg = new OrderMsg(req.body.message)
        ordermsg.user_id = userdata[0]._id;
        console.log(ordermsg)
        ordermsg.save((err,data,status)=>{
            if(!err){
                res.json({
                    state:1,
                    message:'添加订单成功',
                    data:data
                })
            }else{
                res.json({
                state:0,
                message:'添加订单失败'
                })
            }
        })
    })
    
})
// 查询数据
router.post('/find', (req, res) => {
    // 根据接口参数获取查询条件
    console.log(req.body)
    OrderMsg.find(req.body,(err,data)=>{
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

// 修改数据
router.post('/update',(req,res)=>{
    OrderMsg.update(req.body.tip,req.body.message,(err)=>{
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

// 导出路由
module.exports = router;