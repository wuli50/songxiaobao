// 修改用户信息
function updataUser(object) {
    
}
// 查找用户信息that,name
function findUser(that,name,then) {
    that.$http.get('http://127.0.0.1:5000/find-user-msg?name='+name)
    .then((res)=>{
        then(res.body)
    })
    
    
}

module.exports={
    updataUser:updataUser,
    findUser:findUser
}