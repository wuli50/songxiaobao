
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

var StoreMsg = Song.StoreMsg;
var StoreFood = Song.StoreFood;
var UserMsg = Song.UserMsg;
// 处理请求头问题中间件
app.use(function (req, res, next){
  res.set('Access-Control-Allow-Origin', '*')
  next();
})

// 引入用户路由
app.use('/song-api/user-msg',require("./router/user-msg.js"))
// 引入店铺路由
app.use('/song-api/store-msg',require("./router/store-msg.js"));
// 引入食物路由
app.use('/song-api/store-food',require("./router/store-food.js"));

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
