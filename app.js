
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var formidable = require('formidable')

app.use(bodyParser.urlencoded({
  extended: true
}));
// 数据库
var fs = require("fs");
var Song = require('./db/db.js');
var multer = require('multer');
var path = require('path');
// 缓存
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var multer = require('multer')
var storage = multer.diskStorage({
  // 设置数据存储的路径
  destination:'./src/assets/image/food',
  // 设置图片的文件命名
  filename:function(req,res,callback){
    var name = new Date().getDate();
    var random = Math.random();
    // 存储的对象创建完成后 自动调用回调函数
    // 两个参数，错误的原因和文件的名称
    callback(null,name+random+'.jpg');
    console.log(name+random+'.jpg')
  }
})
// 创建上传对象
var upload = multer({storage});


var StoreMsg = Song.StoreMsg;
var StoreFood = Song.StoreFood;
var UserMsg = Song.UserMsg;
// 中间件
app.use(function (req, res, next){
  res.set('Access-Control-Allow-Origin', '*')
  next();
})

app.options('/store-msg/add', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/store-msg/find', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/store-msg/update', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/store-food/find', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/user/login', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/user/join', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/store-food/add', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/user-msg/find', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/store-msg/login', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.options('/upimage',(req,res)=>{
  res.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.status(200).json({
    message: 'ok'
  })
})
app.post('/upimage',upload.single('photo'),function(req,res){
  console.log(req.body)
})

// 用户获取店铺信息
app.get('/store-msg/find', (req, res) => {
  console.log(req.query.id)
  if (req.query.id == undefined) {
    StoreMsg.find({}, function (err, data) {
      if (!err) {
        res.status(200).send(data)
      } else {
        res.status(200).json({
          message: "数据库读取失败"
        })
      }
    })
  } else {
    StoreMsg.find({
      id: req.query.id
    }, function (err, data) {
      if (!err) {
        res.status(200).send(data)
      } else {
        res.status(200).json({
          message: "数据库读取失败"
        })
      }
    })
  }

})
// 用户获取店铺菜品
app.get('/store-food/find', (req, res) => {
  StoreMsg.find({
    id: req.query.id
  }, function (err, data) {
    // console.log(data[0]._id)
    if (!err) {
      StoreFood.find({
        restaurant_object_id: data[0]._id
      }, (err, data) => {
        console.log(data.length)
        res.status(200).send(data);
      }).populate('restaurant_object_id')
    } else {
      res.status(200).json({
        message: "数据库读取失败"
      })
    }
  })
})
// 用户登录
app.post('/user/login', (req, res) => {
  var str = "";
  req.on("data", function (chunk) {
    str += chunk;
    var data = JSON.parse(JSON.parse(str).data);
    UserMsg.find({
      name: data.name
    }, function (err, dbdata) {
      if (err) {
        res.json({
          message: "数据读取失败",
          state: 0
        })
      } else {
        // 判断用户名存在？
        console.log(dbdata)
        if (dbdata.length == 0) {
          res.json({
            message: "用户名不存在，先去注册一个吧",
            state: 0
          })
        } else {
          if (dbdata[0].paw == data.paw) {
            res.json({
              message: "登录成功",
              state: 1
            })
          } else {
            res.json({
              message: "密码错误",
              state: 0
            })
          }
        }
      }
    })
  })
  req.on("end", function () {})

})
app.post('/user/join', (req, res) => {
  var str = "";
  req.on("data", function (chunk) {
    str += chunk;
    var data = JSON.parse(JSON.parse(str).data);
    // 判断用户名是否存在=>存入用户信息
    UserMsg.find({
      name: data.name
    }, function (err, dbdata) {
      if (err) {
        res.json({
          message: "数据读取失败",
          state: 0
        })
      } else {
        console.log(dbdata)
        if (dbdata.length > 0) {
          res.json({
            message: "用户名已存在，换一个吧",
            state: 0
          })
        } else {
          // 存储数据
          var usermsg = new UserMsg({
            id: new Date().getTime(),
            name: data.name,
            paw: data.password1,
            phone: data.phone
          })
          usermsg.save(function (err, data, status) {
            if (err) {
              res.json({
                message: "数据存储失败",
                state: 0
              })
            } else {
              res.json({
                message: "数据存储成功",
                state: 1
              })
            }
          })

        }
      }
    })


  })
  req.on("end", function () {})
})
//查看店铺信息
app.post('/store-msg/find', (req, res) => {
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
// 添加店铺
app.post('/store-msg/add',(req,res)=>{
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
app.post('/store-msg/login',(req,res)=>{
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
app.post('/store-msg/update', (req, res) => {
  var uploadDir = './src/assets/image';
  var form = new formidable.IncomingForm();
  //文件的编码格式
  form.encoding = 'utf-8';
  //文件的上传路径
  form.uploadDir = uploadDir;
  //文件的后缀名
  form.extensions = true;
  //文件的大小限制
  form.maxFieldsSize = 2 * 1024 * 1024;
  console.log(req)
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
// 添加菜品
app.post('/store-food/add',(req,res)=>{
  console.log(req.body)
  
})

// 搜索用户信息
app.get('/user-msg/find', (req, res) => {
  if (req.query.name == 'noname') {
    UserMsg.find({}, function (err, data) {
      if (!err) {
        res.status(200).json({
          data: data,
          state: 1
        })
      } else {
        res.status(200).json({
          message: "数据库读取失败",
          state: 0
        })
      }
    })
  } else {
    UserMsg.find({
      name: req.query.name
    }, function (err, data) {
      if (!err) {
        res.status(200).send({
          data: data,
          state: 1
        })
      } else {
        res.status(200).json({
          message: "数据库读取失败",
          state: 0
        })
      }
    })
  }

})


app.listen('5000', () => {
  console.log('login....')
})
