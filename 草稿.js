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

  // admin、storeFood
  // 查询店铺
  findStore(){

  },
  handleCurrentChange(val) {
    this.page = val;
    // this.getUsers();
  },
  //删除
  handleDel: function (index, row) {
    this.$confirm('确认删除该记录吗?', '提示', {
      type: 'warning'
    }).then(() => {
      this.listLoading = true;
      let para = { id: row.id };
      removeUser(para).then((res) => {
        this.listLoading = false;
        //NProgress.done();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      });
    }).catch(() => {

    });
  },
  //显示编辑界面
  handleEdit: function (storeid) {
    var that = this
    this.editFormVisible = true;
    var obj = {id:storeid}
    this.$http.post('http://127.0.0.1:5000/user/find-store-msg',{
      data:obj
    })
            .then((data)=>{
      // console.log(data.body[0])
      that.editForm = data.body[0];
            })
  },
  //显示新增界面
  handleAdd: function () {
    alert('1232')
    this.addFormVisible = true;
    this.addForm = {
      name: '',
      address: "",
      promotion_info: "",
      phone: '',
      is_new: false
    }
  },
  //编辑
  editSubmit: function () {
    this.$refs.editForm.validate((valid) => {
      if (valid) {
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.editLoading = true;
          //NProgress.start();
          let para = Object.assign({}, this.editForm);
          para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
          editUser(para).then((res) => {
            this.editLoading = false;
            //NProgress.done();
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.$refs['editForm'].resetFields();
            this.editFormVisible = false;
            // this.getUsers();
          });
        });
      }
    });
  },
  //新增
  addSubmit: function () {
    this.$refs.addForm.validate((valid) => {
      if (valid) {
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.addLoading = true;
          //NProgress.start();
          let para = Object.assign({}, this.addForm);
          para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
          addUser(para).then((res) => {
            this.addLoading = false;
            //NProgress.done();
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.$refs['addForm'].resetFields();
            this.addFormVisible = false;
            // this.getUsers();
          });
        });
      }
    });
  },
  selsChange: function (sels) {
    this.sels = sels;
  },
  //批量删除
  batchRemove: function () {
    var ids = this.sels.map(item => item.id).toString();
    this.$confirm('确认删除选中记录吗？', '提示', {
      type: 'warning'
    }).then(() => {
      this.listLoading = true;
      //NProgress.start();
      let para = { ids: ids };
      batchRemoveUser(para).then((res) => {
        this.listLoading = false;
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      });
    }).catch(() => {

    });
  }