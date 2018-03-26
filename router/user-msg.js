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

// 导出路由
module.exports = router;