var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
// 数据库
var fs = require("fs");
var Song = require('./db/db.js');
var StoreMsg = Song.StoreMsg;
var StoreFood = Song.StoreFood;


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
app.options('/user/login',(res,req)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})
app.options('/user/join',(res,req)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
    res.status(200).json({
        message:'ok'
    })
})

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
app.post('/user/login',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    console.log(req.body)
})
app.post('/user/join',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    console.log(req.body)
})

app.listen('5000',()=>{
    console.log('login....')
})