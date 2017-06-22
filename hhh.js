var connect = require('connect');
var bodyParser =require('body-parser')
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var mongoose =require("mongoose")
// default port where dev server listens for incoming traffic
//--
var superagent  =require('superagent')
var app = express()
var server =require("http").Server(app)
var io=require('socket.io')(server)





var guest=[]
function xx(data) {
  return function () {
    guest.push(data)
  }
}
io.sockets.on("connection",function (socket) {
  console.log("进入一个新用户:"+socket.id)
  socket.on("user-pass",function (data) {
    console.log("接受到了"+data)
    if(data.user_name!==""){
      socket.emit("userPassSuccess",data)
      var oo=xx(data)
      oo()
      io.sockets.emit("userList",guest)
      console.log(guest)
    }
    else {
      console.log("不能为空")
    }
  })

  //验证用户名和密码
  socket.on("disconnect",function () {
    guest.forEach (function(x,i,a){
      if(x.user_id==socket.id){
        guest.splice(i,1)
        io.sockets.emit("userList",guest)
        console.log("删除 登录"+guest)
      }
    })

  })   //断开连接后
  socket.on("Chat-Message",function (data) {
    io.sockets.emit('otherMessage',data);
    console.log(data.user_message)
  }) //聊天反馈

})









var api =express.Router()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
api.get("/mola",function (req,res) {
  var apires=res
  superagent.get("https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E5%8A%A8%E6%BC%AB%E5%A4%B4%E5%83%8F&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=%E5%8A%A8%E6%BC%AB%E5%A4%B4%E5%83%8F&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&cg=head&pn="+Math.round(1000*Math.random())+"&rn=30&gsm=1e&1497533056573=")
    .end(function (err,res) {
      var a=res.text
      if(JSON.parse(a).data[Math.round(30*Math.random())].middleURL){
        var mola=JSON.parse(a).data[Math.round(30*Math.random())].middleURL
        console.log("百度随机头像图片:"+mola)
        apires.send(mola)}
      else {apires.send("https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1497532306&di=66b511e33f4a7f404c52dd14dd949036&src=http://img2.woyaogexing.com/2017/05/04/bec69f9541c97907!250x250.jpg")}
    })

})
//重要要去express看文档
mongoose.connect("mongodb://localhost:27017/hs",function (err) {
  if(err){
    console.log(err)
  }
  else {
    console.log("数据库成功")
  }

})
var Cat = mongoose.model('Cat', {
  HS_count:Number,
  HS_ID:Number
  ,HS_NAME: String
  ,HS_PIC: String
  ,HS_STORY: String
  ,HS_USE:Number
  ,HS_DEXTER:Number
  ,HS_JJC:Number
  ,HS_SYNTH:Number
  ,HS_PRIORITY:Number
});
//更新 根据Schema列表更新 新数据和老数据 data返回老数据
/*Cat.find({"HS_ID":1}).then(function (data) {
 if(data){console.log(data)}
 })*/
api.get("/",function (req,res) {
  Cat.find({"HS_ID":req.query.HS_ID}).then(function (data) {
    if(data[0].HS_count==0){data[0].HS_count=1}
    data[0].HS_USE=Math.round(data[0].HS_USE/data[0].HS_count)
    data[0].HS_DEXTER=Math.round(data[0].HS_DEXTER/data[0].HS_count)
    data[0].HS_JJC=Math.round(data[0].HS_JJC/data[0].HS_count)
    data[0].HS_PRIORITY=Math.round(data[0].HS_PRIORITY/data[0].HS_count)
    data[0].HS_SYNTH=Math.round(data[0].HS_SYNTH/data[0].HS_count)
    res.json(data[0])
  })
})
api.post("/submit",function (req,res) {
  res.send(req.body)

  Cat.findById(req.body._id,function (err,data) {
    console.log(data)
    req.body.HS_count=data.HS_count+1
    req.body.HS_USE=data.HS_USE+req.body.HS_USE
    req.body.HS_DEXTER=data.HS_DEXTER+req.body.HS_DEXTER
    req.body.HS_JJC=data.HS_JJC+req.body.HS_JJC
    req.body.HS_SYNTH=data.HS_SYNTH+req.body.HS_SYNTH
    req.body.HS_PRIORITY=data.HS_PRIORITY+req.body.HS_PRIORITY
    Cat.findByIdAndUpdate(req.body._id,req.body,function (err,data) {
      console.log("新数据:"+data)
    })
  })


}) //保存数据
app.use("/api",api)






server.listen(8080);
