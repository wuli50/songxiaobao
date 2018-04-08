

// 加载模块
const mongoose = require("mongoose");
// 用es6中的Promise来取代 mongoose里集成的已经过时的
// promise
mongoose.Promise = Promise;
// 连接数据库
mongoose.connect("mongodb://localhost/SongDB");
const db = mongoose.connection;
// 是否打开数据库成功
db.on("open", () => {
  console.log("打开数据库成功！");
});
db.on('error',function(){
    console.log('数据库连接失败')
})
// 创建 Schema 构造函数
var Schema = mongoose.Schema;
// 创建 store-msg 表结构
var storeMsgSchema = new Schema({
    id:Number,
    name: String,
    paw:String,
    address: String,
    phone: String,
    promotion_info: String,
    distribution: Number,
    type: Array,
    is_aduit_msg: Boolean,
    is_submit_msg:Boolean,
    is_submit_food:Boolean,
    is_aduit_food:Boolean,
    image_path: String
},{collection: 'store-msg'});
// 创建 store-food 表结构
var storeFoodSchema = new Schema({
    // 备注
    description:String,
    // 分类名称
    name:String,
    foods:[{
        name:String,
        // 招牌？
        is_essential:Boolean,
        image_path:String,
        // 月售
        month_sales:Number,
        // 价格
        specfoods_price:Number
    }],
    store_name:String,
    restaurant_id:String
},{collection: 'store-food'})
// 创建用户表
var userMsgSchema = new Schema({
    name:String,
    paw:String,
    phone:String,
    addreses:[{
        name:String,
        phone:String,
        ads:String,
        msg:String,
    }],

},{collection: "user-msg"})
// 一个构造对象
var StoreMsg = mongoose.model('StoreMsg',storeMsgSchema);
var StoreFood = mongoose.model('StoreFood',storeFoodSchema);
var UserMsg = mongoose.model('UserMsg',userMsgSchema);

// 导出一个构造方法
module.exports = {
    StoreMsg:StoreMsg,
    StoreFood:StoreFood,
    UserMsg:UserMsg
};