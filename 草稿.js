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

getshortList(){
    this.$http.get('/ele/shopping/restaurants?latitude=26.048036&longitude=119.221893&offset=10&limit=20&extras[]=activities&terminal=h5')
      .then((data)=>{
          // 剪切选取需要的需要的数据
          this.storeList = data.body.slice(0,20);
      })
}
// 跨域问题旧办法
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