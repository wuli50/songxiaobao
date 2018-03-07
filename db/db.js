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
	address: String,
	image_path: String,
	is_new: Boolean,
	phone: String,
	opening_hours: Array,
    promotion_info: String,
    // 评分
    rating:Number,
    // 月售量
    recent_order_num:Number,
    // 配送费
    distribution:String,
    activities:[
        {
            icon_color:String,
            icon_name:String,
            tips:String
        }
    ]
},{collection: 'store-msg'});

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
    restaurant_object_id:{type:Schema.Types.ObjectId,ref:'StoreMsg'}
},{collection: 'store-food'})
// 一个构造对象
var StoreMsg = mongoose.model('StoreMsg',storeMsgSchema);
var StoreFood = mongoose.model('StoreFood',storeFoodSchema);

// 导出一个构造方法
module.exports = {
    StoreMsg:StoreMsg,
    StoreFood:StoreFood
};