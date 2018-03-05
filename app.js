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
    res.status(200).json({
        message:'ok'
    })
})
app.post('/yuanshi',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    var str="";
    // from data 和 request payload 的区别
    req.on("data",function(chunk){
        str+=chunk;
    })
    req.on("end",function(){
    })
    res.status(200).json({
        message:"ok"
    })
    // var msg = JSON.parse(str)
    console.log(msg.data);
})

app.listen('5000',()=>{
    console.log('login....')
})