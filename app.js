
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

// 由于需要处理的接口很多，所以对服务器入口文件进行了分路由操作方便项目的管理
// 引入用户路由
app.use('/api/user-msg',require("./router/user-msg.js"))
// 引入店铺路由
app.use('/api/store-msg',require("./router/store-msg.js"));
// 引入食物路由
app.use('/api/store-food',require("./router/store-food.js"));
// 引入订单路由
app.use('/api/order-msg',require("./router/order-msg.js"));

app.listen('5000', () => {
  console.log('login....')
})
