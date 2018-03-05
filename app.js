var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
// 数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SongDB',{useMongoClient:true})
var db = mongoose.connection;
db.on('open',function(){
    console.log('数据库连接成功')
})
db.on('error',function(){
    console.log('数据库连接失败')
})

app.options('/yuanshi',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    console.log('收到了一个请求')
    res.status(200).json({
        message:'ok'
    })
    // console.log(req.query);
})
app.post('/yuanshi',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    console.log('收到了123一个请求')
    var str="";
    // from data 和 request payload 的区别
    req.on("data",function(chunk){
        console.log(chunk)
        str+=chunk;
    })
    req.on("end",function(){
      console.log(str)
    })
    res.status(200).json({
        message:"ok"
    })
})

app.listen('5000',()=>{
    console.log('login....')
})