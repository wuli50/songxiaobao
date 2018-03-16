var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var formidable = require('formidable')

app.use(bodyParser.urlencoded({
    extended:true
}));
// 数据库
var fs = require("fs");
var Song = require('./db/db.js');
var multer = require('multer');
var path=require('path');

var StoreMsg = Song.StoreMsg;
var StoreFood = Song.StoreFood;
var UserMsg = Song.UserMsg;


app.options('/user/store-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/user/store-foods',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/user/login',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/user/join',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/user/find-store-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/add-store-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/find-user-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
// 用户获取店铺信息
app.get('/user/store-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    console.log(req.query.id)
    if(req.query.id == undefined){
        StoreMsg.find({},function(err,data){
            if(!err){
                res.status(200).send(data)
            }else{
                res.status(200).json({
                    message:"数据库读取失败"
                })
            }
        })
    }else{
        StoreMsg.find({id:req.query.id},function(err,data){
            if(!err){
                res.status(200).send(data)
            }else{
                res.status(200).json({
                    message:"数据库读取失败"
                })
            }
        })
    }
    
})
// 用户获取店铺菜品
app.get('/user/store-foods',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    StoreMsg.find({id:req.query.id},function(err,data){
        // console.log(data[0]._id)
        if(!err){
            StoreFood.find({restaurant_object_id:data[0]._id},(err,data)=>{
                console.log(data.length)
                res.status(200).send(data);
            }).populate('restaurant_object_id')
        }else{
            res.status(200).json({
                message:"数据库读取失败"
            })
        }
    })
})
// 用户登录
app.post('/user/login',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    var str="";
    req.on("data",function(chunk){
        str+=chunk;
        var data = JSON.parse(JSON.parse(str).data);
        UserMsg.find({name:data.name},function(err,dbdata){
            if(err){
                res.json({
                    message:"数据读取失败",
                    state:0
                })
            }else{
                // 判断用户名存在？
                console.log(dbdata)
                if(dbdata.length == 0){
                    res.json({
                        message:"用户名不存在，先去注册一个吧",
                        state:0
                    })
                }else{
                    if(dbdata[0].paw == data.paw){
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
    req.on("end",function(){
    })
    
})
app.post('/user/join',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    var str="";
    req.on("data",function(chunk){
        str+=chunk;
        var data = JSON.parse(JSON.parse(str).data);
        // 判断用户名是否存在=>存入用户信息
        UserMsg.find({name:data.name},function(err,dbdata){
            if(err){
                res.json({
                    message:"数据读取失败",
                    state:0
                })
            }else{
                console.log(dbdata)
                if(dbdata.length > 0){
                    res.json({
                        message:"用户名已存在，换一个吧",
                        state:0
                    })
                }else{
                    // 存储数据
                    var usermsg = new UserMsg({
                        id:new Date().getTime(),
                        name:data.name,
                        paw:data.password1,
                        phone:data.phone
                    })
                    usermsg.save(function(err,data,status){
                        if(err){
                            res.json({
                                message:"数据存储失败",
                                state:0
                            })
                        }else{
                            res.json({
                                message:"数据存储成功",
                                state:1
                            })
                        }
                    })

                }
            }
        })
        

    })
    req.on("end",function(){
    })
})
// 管理员编辑店铺信息
app.post('/user/find-store-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    var str="";
    req.on("data",function(chunk){
        str+=chunk;
        var data = JSON.parse(str).data;
        console.log(data);
        StoreMsg.find(data,function (err,dbdata) {
            // console.log(dbdata)
            res.status(200).send(dbdata)
        })
    })
    req.on("end",function(){
    })
})

// 上传图片
app.post('/add-store-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    var uploadDir='./src/assets/image';
    var form = new formidable.IncomingForm();
    //文件的编码格式
    form.encoding='utf-8';
    //文件的上传路径
    form.uploadDir=uploadDir;
    //文件的后缀名
    form.extensions=true;
    //文件的大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files){
    var name=fields.name;
    var address = fields.address;
    var phone = fields.phone;
    var promotion_info = fields.promotion_info;
    var distribution = fields.distribution;
    var type = fields.type;
    var is_aduit_msg = fields.is_aduit_msg;
    var is_aduit_food = fields.is_aduit_food;
    var file = files.image_path;
    var oldpath = path.normalize(file.path);
    // console.log(oldpath)
    var newfilename = name + file.name;
    var newpath = uploadDir +'store'+ newfilename;
    // console.log(newpath)
    var storemsg = new StoreMsg({
        name: name,
        address: address,
        phone: phone,
        promotion_info: promotion_info,
        distribution: distribution,
        type: type,
        is_aduit_msg: is_aduit_msg,
        is_aduit_food:is_aduit_food
    })
    fs.rename(oldpath,newpath,function(err){
        if(err){
            res.json({
                message:"图片存储失败，请重新提交",
                state:0
            })
        }
        else {
            storemsg.filePath=newpath;
            console.log(storemsg)
            storemsg.save(function(error,data,status){
                if(!error){
                    res.json({
                        message:"提交成功，等待管理员审核",
                        state:1
                    })
                }else{
                    res.json({
                        message:"数据存储失败",
                        state:0
                    })
                }
            });
            
        }
      });
  })
})

// 搜索用户信息
app.get('/find-user-msg',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    if(req.query.name == 'noname'){
        UserMsg.find({},function(err,data){
            if(!err){
                res.status(200).json({
                    data:data,
                    state:1
                })
            }else{
                res.status(200).json({
                    message:"数据库读取失败",
                    state:0
                })
            }
        })
    }else{
        UserMsg.find({name:req.query.name},function(err,data){
            if(!err){
                res.status(200).send({
                    data:data,
                    state:1
                })
            }else{
                res.status(200).json({
                    message:"数据库读取失败",
                    state:0
                })
            }
        })
    }
    
})



app.listen('5000',()=>{
    console.log('login....')
})