<template>

<div id="chat" >
  <div id="SignIn" v-show="this.SignInShow" >
<div style="width: 80%;height: 80%;margin: 0 auto;
vertical-align: middle;box-shadow:0px 0px 10px 1px #ccc;border-radius: 5px;margin-top: 40px">
  <ul style="margin-top: 30px;height: 100%">
    <li style="margin: 0 auto;width: 80%;height: 30px"></li>
    <li style="margin: 0 auto;width: 80%;height: 200px" >
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497533680269&di=e4c662cee5739c381b0f93f8e22a475c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0191b15544f3e30000019ae992ea81.jpg"
           :src="this.mola"
           style="width: 100%;height: 100%;border-radius: 5px;"
      />
    </li>
    <li style="margin: 0 auto;width: 80%;">
    <input class="form-control"  placeholder="随便输入用户名" style="border:none; border-bottom: 1px #ccc  solid;box-shadow: none" ref="username" value=""/>
    </li>
    <li style="margin: 0 auto;width: 80%;">
      <input class="form-control"  placeholder="随便输入个签名" style="border:none; border-bottom: 1px #ccc  solid;box-shadow: none" ref="usersignature" value=""/>
    </li>
    <li style="margin: 0 auto;width: 80%;border-radius: 20px;overflow: hidden">
      <button class="btn  btn-default" style="float:right;margin-top: 20px;width: 100%;border-radius: 20px;background:#FF4151;color: #F4F5CE;" @touchstart="sendMessage"  >登录</button>
    </li>
  </ul>

</div>

  </div>
  <!--Sign-In-->
<div class="room"  ref="room">
  <ul>
    <li class="Room-Name"></li>
    <span style="padding: 10%">在线人数 :{{this.userList.length}}</span>
    <ul style="margin-top: 10px;height: 100%;overflow-y:scroll;text-align: center"  id="Room-1" v-show="UserInfo">
    <li class="Friend-Room"   v-for="(item,index) in this.userList" >
      <div class="Friend-Room-imgDiv" style="margin-top: 5px">
        <img :src="item.user_pic" style="width:100%;height: 100%"/>
      </div>
      <div class="Friend-Room-content">
        <span class="His-Name">{{item.user_name}}</span>
        <span class="His-status">{{item.user_signature}}</span>
      </div>
    </li>
    </ul>

  </ul>


</div>

<!-- Left-List-->
  <div class="Chatroom" ref="Chatroom"  >
      <div class="Chat-header">
            <div class="Back btn-default" @touchstart="hideChat" >隐藏</div>
            <div class="Chating-Name">无聊人的聊天室</div>
            <div class="Say-Love btn-default" @touchstart="signOut">注销</div>
      </div>
      <div class="Chat-Context" id="Chat-Context">
        <div id="Chatroom">


  <!--        <div  class="chatman">
            <p  class="chatmanP"></p>
            <div class="Friend-Room-imgDiv" style="margin-top: 2px" >
              <img  style="width:100%;height: 100%"/>
            </div>
          </div>-->





        </div>

<!--框体-->
      </div>
    <div class="push">
      <div class="Push-Magin" id="Push-Magin" v-if="this.UserInfo">
        <textarea class="form-control Push-Input" cols="5" id="chat-text" ></textarea>
        <div class="Friend-Room-imgDiv" style="margin-top: 2px" >
          <img  :src="this.UserInfo.user_pic" style="width:100%;height: 100%"/>
        </div>
        <span style="font-size: 15px;color:#8F9699;font-weight: 500;display: inline-block;margin-top: 5px;margin-left: 5px;width: 100px;overflow: hidden">{{this.UserInfo.user_name}}</span>
        <button  class="btn btn-default Push-Btn" @touchstart.stop="sendChat">Send</button>
      </div>
    </div>
    <!--发送按钮-->
  </div>
  <!--Right-List-->
</div>
</template>

<script type="text/ecmascript-6">
  var d=document
export default{
  sockets:{
      connect:function () {
      console.log("连接成功")

      },        //连接socket成功后的行为
      userPassSuccess:function(data){
          this.UserInfo=data
        console.log("userinfo"+data)
          this.SignInShow=false
        sessionStorage.cookie=JSON.stringify(data)
        console.log("接受到数据"+JSON.stringify(this.UserInfo))
    },  //接受到数据后事件
      otherMessage:function (data) {
        console.log("传过来的"+sessionStorage.cookie)
        if(data.user_id==JSON.parse(sessionStorage.cookie).user_id){

              var cr=document.getElementById("Chatroom")
              var a=document.createElement("div")
              a.className="chatman"
              cr.appendChild(a)
              var p=document.createElement("div")
              p.className="chatmanP"
              p.innerHTML=data.user_message
              a.appendChild(p)
              var b=document.createElement("div")
              b.className="Friend-Room-imgDiv"
              a.appendChild(b)
              var i=document.createElement("img")
              i.src=data.user_pic
              b.appendChild(i)
              i.scrollIntoView()

                           //如果本地用户名等于发送信息时的用户名则渲染一个dom
        }else {

          var cr=document.getElementById("Chatroom")
          var a=document.createElement("div")
          a.className="chatman"
          cr.appendChild(a)
          var b=document.createElement("div")
          b.className="Friend-Room-imgDiv"
          a.appendChild(b)
          var i=document.createElement("img")
          i.src=data.user_pic
          b.appendChild(i)
          var p=document.createElement("p")
          p.className="chatmanP"
          p.innerHTML=data.user_message
          a.appendChild(p)
                    //如果本地用户名不等于发送信息时的用户名则渲染一个dom
        }

      } ,  //接受到事件后判断和渲染聊天框
      userList:function (data) {
        sessionStorage.userlist=JSON.stringify(data)
        this.userList=data
        console.log(this.userList.length)
      }
  },
  data(){
      return{
          mola:0,
        SignInShow:true,
        UserInfo:null,
        message:null,
        userList:[],
        onoff:true
      }
  },
  created(){
         this.$http.get("/api/mola").then(
           res=>{
               this.mola=res.body
           }
         )
    if(sessionStorage.userlist){
             this.userList=JSON.parse(sessionStorage.userlist)
    }
    if(sessionStorage.cookie){
this.UserInfo=JSON.parse(sessionStorage.cookie)
      console.log("session"+this.UserInfo)
    }
  },
  mounted(){
    document.getElementById("chat").style.height=window.screen.height-50+"px"
    document.getElementById("SignIn").style.height=window.screen.height-50+"px"
    document.getElementById("Room-1").style.height=window.screen.height-50+"px"
    document.getElementById("Chat-Context").style.height=window.screen.height-200+"px"
    var jay=document.getElementsByClassName("jay-move")[0]
    jay.style.left=1*document.body.clientWidth/5+"px";
    document.getElementById("chat-text").focus()

    if(sessionStorage.cookie){
      this.SignInShow=false
    }
  },
  updated(){

  },
  methods: {
    sendMessage: function(val){
       var user_info={
           "user_id":this.$socket.id,
           "user_name":this.$refs.username.value.trim(),
           "user_pic":this.mola,
         "user_signature":this.$refs.usersignature.value.trim()
       }

      this.$socket.emit("user-pass",user_info)
      console.log("发送了user-pass")
    },
    hideChat:function () {
      if(this.onoff){
      this.$refs.room.style.flex=0
      this.$refs.Chatroom.style.flex=1
      document.getElementById("Push-Magin").style.width="100%"
      document.getElementsByClassName("Back")[0].innerHTML="显示"
      this.onoff=false
      }
      else {
        this.$refs.room.style.flex=0.3
        this.$refs.Chatroom.style.flex=0.7
        document.getElementById("Push-Magin").style.width=""
        this.onoff=true
        document.getElementsByClassName("Back")[0].innerHTML="隐藏"
      }

    },
    signOut:function () {
      sessionStorage.clear()
      this.$socket.disconnect()
      this.$router.go(0)
    },
    sendChat:function () {
      var message=document.getElementById("chat-text").value
      var sendmessage={
          "user_id":this.$socket.id,
        "user_message":message,
        "user_pic":JSON.parse(sessionStorage.cookie).user_pic
      }
      if(message!=""){
      this.$socket.emit("Chat-Message",sendmessage)
        console.log("已发送聊天记录")
      }

      document.getElementById("chat-text").value=""
      document.getElementById("chat-text").focus()
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
#chat
  display flex
  height 300px
  font-size 0
  color white
  #SignIn
    background white
    width 100%
    position absolute
    top 0
    display table
    z-index 99
  .Friend-Room-imgDiv
    width 30px
    height 30px
    display inline-block
    float left
    overflow hidden
    border-radius 50%
    border 1px whitesmoke solid
  .room
    flex 0.3
    background #25282D
    font-size 10px
    overflow hidden
   img
    height 30px
    width 30px
  .Room-Name
    height 50px
    line-height 40px
    background #22252A
    padding-left 5px
    font-size 15px
  .Chatroom
    flex 0.7
    background #F1F1F1
  .Friend-Room
    display flex
    background #25282D
    margin-top 5px
    margin-left 10px
    .Friend-Room-content
      flex 1
      display inline-block
      float left
      overflow hidden
      font-size 0
      margin-left 5px
      margin-top 1px
      color  #C7C7C7
      .His-Name
        font-size 14px
        display block
        white-space: nowrap
        text-overflow:ellipsis;
        width 100%
        overflow hidden
      .His-status
          opacity 0.5
          font-size 5px
          display block
          white-space: nowrap
          text-overflow:ellipsis;
          width 100%
          overflow hidden

  .Chatroom
      background #F7F7F7
      .Chat-header
        background #F1F1F1
        box-shadow 3px 0 5px 1px #E7E5E6
        height 50px
        display flex
      .Back
        margin-top 10px
        font-size 10px
        height 30px
        text-align center
        line-height 30px
        border 1px #ccc solid
        flex 0.2
        border-radius 2px
        margin-left 2px
      .Chating-Name
        flex 0.6
        font-size 15px
        color #A2A2A2
        text-align center
        line-height 50px
        font-weight 700
      .Say-Love
        margin-top 10px
        font-size 10px
        height 30px
        text-align center
        line-height 30px
        border 1px #ccc solid
        flex 0.2
        border-radius 2px
        margin-right 2px
      .Chat-Context
        overflow-y scroll
        .chatman
          width 100%
          height auto
          display flex
          margin-top 10px
        .chatmanP
          width 100%
          height auto
          font-size 14px
          color #5c4f71
          display inline-block
          flex 1
          background #E8F1F6
          margin-left 5px
          padding 5px
          border-radius 10px
  .push
    background #F1F1F1
    position absolute
    bottom 50px
    height 100px
    width 100%
    .Push-Magin
      margin-top 10px
      width 70%
      .Push-Img
        width 30px
      .Push-Input
        height 50px
      .Push-Btn
        width 100px
        font 12px
        font-weight 700
        height 30px
        float right
        margin-top 5px
        background #09A8E0
        color white
</style>
