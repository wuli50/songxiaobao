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
var storeMsgSchema = new Schema({
	name: String,
	age: Number,
	gender: Boolean,
	phone: String,
	email: String,
	detail: String,
	createTime: Date
},{collection: 'song-msg'});

var StoreMsg = mongoose.model('StoreMsg',storeMsgSchema);

// 导出一个构造方法
module.exports = StoreMsg;