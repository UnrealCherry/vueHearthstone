<template>
<div id="star" v-if="this.somedata" @touchstart="moveage($event)" @click="moveage($event)" >
 <!--<div class="showstar-start " @touchstart="hover($event)"  @touchend="hoverend($event)"></div>
  <div class="showstar-err" v-if="false"><i class="glyphicon glyphicon-remove"></i></div>
  <div class="showstar-ok" v-if="false"><i class="glyphicon glyphicon-ok"></i></div>-->
  <div v-if="this.onload" style="width: 100%;height: 100%;position: fixed;top: 0;background: white;text-align: center;padding: 50%;">{{this.precent}}%</div>
  <div class="center">
    <!--<div  style="height: 80px;background: #A9EDE8"></div>-->
<div class="star-ul"  v-for="(Arr,index) in 5" :class="UseArr[index]"  >
  <div class="font">{{scroe[index]}}</div>
  <ul>
<li v-for="(item,index) in 6"  >
    <img class="star-zero" src="/static/timg/animal (108)_0155_图层 3.jpg"  :index=index  @touchstart="clickchange($event)" @click="clickchange($event)" />
<!--星星数量-->
  </li>
  </ul>
   <span style="margin-left: 20px; font-size: 20px;text-align: center;color: #ccc;font-weight: 700;line-height: 20px">{{somedata[UseArr[index]]}}</span>
</div>
    <!--<div  style="height: 50px;background: #A9EDE8"></div>-->
  </div>
  <div style="background: rgb(250, 252, 254);margin: 0px;height: 40px">
    <button class="btn btn-default btn-ok" style="float:right;width:100px;margin-top: 3px" type="submit" @touchstart="reload" @click="reload">刷新</button>
    <button class="btn btn-default btn-ok btn-okay" style="margin-right: 2px;float: right;width: 100px;margin-top: 3px" type="submit"
            @touchstart="submiter" @click="submiter"
    >提交</button>
  </div>

</div>
</template>

<script type="text/ecmascript-6">
  var dataa={"_id":0,"HS_USE":1, "HS_DEXTER":1, "HS_JJC":1, "HS_SYNTH":1, "HS_PRIORITY":1,"HS_count":0}
  var timee=0
  export default{
  props: {
    somedata: Object
  },
  data(){
    return {
      Number: 15,    //不能大于155
      Number158: 155,
      timer: 0,
      scroe: ["实用性", "灵活度", "竞技场", "优先合成", "综合能力"],
      UseArr: ["HS_USE", "HS_DEXTER", "HS_JJC", "HS_SYNTH", "HS_PRIORITY"],
      showstar:true,
      send:true,
      onload:true,
      precent:0
    }
  },
  computed: {

  },
    created(){
      var vm=this
     for(var i=3;i<154;i++){
       var newImg = new Image()
      newImg.src=this.imgurl(i)
       newImg.onload=(function (i) {
         vm.precent++
         console.log(vm.precent)
         if(vm.precent==150){
             vm.onload=false
         }
       })(i)
     }
    },
  updated(){
    dataa['_id']=this.somedata._id
   var starzero=document.getElementsByClassName("star-zero")
    for(var z=0;z<starzero.length;z++){
        starzero[z].src="/static/timg/animal (108)_0155_图层 3.jpg"

    }




    for (var i = 0; i < this.UseArr.length; i++) {
      for (var j = 0; j < this.somedata[this.UseArr[i]]; j++) {
        document.getElementsByClassName(this.UseArr[i])[0].getElementsByTagName("img")[j].src = "/static/timg/animal (108)_0003_图层 155.jpg"
      }
    }  //根据数据反馈星星
  },
  methods: {
    clickchange: function (event) {
      for (var i = 0; i <6 ; i++) {
        event.target.parentElement.parentElement.getElementsByTagName("img")[i].src="/static/timg/animal (108)_0155_图层 3.jpg"
      }   //开始清除这行所有星星
      var c=parseInt(event.target.getAttribute("index"))+1
      var vue =this
      var x=3;
      var timer=0;
      clearInterval(timer)
      timer=setInterval(
          function () {
              x++
            if(x>=155){
                  x=155
              clearInterval(timer)
            }
            for (var i = 0; i <c ; i++) {
              event.target.parentElement.parentElement.getElementsByTagName("img")[i].src=vue.imgurl(x)
            }
          },10
        //过程特效 10ms 播放所有图片
      )
      for (var i = 0; i <c ; i++) {
       event.target.parentElement.parentElement.getElementsByTagName("img")[i].src="/static/timg/animal (108)_0003_图层 155.jpg"
      }
      //根据index值赋予选择星星

        var parentName=event.target.parentElement.parentElement.parentElement.className.split(" ")[1]
        dataa[parentName]=c
        dataa['_id']=this.somedata._id
      dataa['HS_count']=this.somedata.HS_count
      //this.data保存index数据到对应的东西
    },
    imgurl:function(x){
      var Number158 = 158 - x
      var z = 4 - Number158.toString().length
      var Numv = 0
      for (var i = 0; i < z; i++) {
        Number158 = Numv + Number158.toString()
      }
      return "/static/timg/animal (108)_" + Number158 + "_图层 " + x.toString() + ".jpg"
    },
    hover:function (event) {
      event = event.changedTouches ? event.changedTouches[0] : event
      event.target.style.borderRadius="0"
      event.target.style.height=window.screen.height+"px";
      event.target.style.width=window.screen.width+"px";
      event.target.style.background="rgba(147,147,147,0)"
      setTimeout(function () {
        event.target.style.transition="0.5s ease-in"
        event.target.style.position="fixed"
        event.target.style.zIndex="99"
        event.target.style.background="rgba(147,147,147,0.5)"
        this.showstar=true
      },1000)

    },
    hoverend:function (event) {
      event = event.changedTouches ? event.changedTouches[0] : event
      event.target.style.boxShadow="0"
    },
    reload:function () {
     this.$router.go(0)
    },             //刷新功能
    submiter:function () {
        console.log(dataa)
      this.$http.post("/api/submit/",dataa).then(res=>
      {document.getElementsByClassName("btn-okay")[0].innerHTML="评价成功"
        this.send=false
        var vu=this
        clearTimeout(timee)
        timee=setTimeout(function () {
          var star=document.getElementById("star")
          star.style.top=0+"px"
          document.getElementsByClassName("btn-okay")[0].innerHTML="提交"
          vu.send=true
        },500)
        this.$emit("reloding")
     }
      )
    },         //提交功能
    moveage:function (event) {
        if(this.send) {
          document.getElementById("star").style.top = -200 + "px"
          document.getElementById("star").style.boxShadow = "0 2px 5px 1px#ccc"
        }
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#star
    width 100%
    background #f6fafc
    position relative
    top 10px
    transition 0.5s cubic-bezier(0,1.91,1,1.01)
    .center
      margin 0 auto
    .star-ul
        width 100%
        height 40px
        overflow hidden
        border-bottom 1px #ccc solid
       li
          float left
          height 40px
          width 40px
          display inline-block
      img
        height 100%
        width   100%
        display inline-block
      .font
        font-size 14px
        vertical-align top
        font-weight 700
        float left
        width 60px
        height 40px
        display inline-block
        text-align center
        line-height 40px
      .showstar-err
        margin 0 auto
        line-height 50px
        text-align center
        font-size 20px
        width 50px
        height 50px
        border-radius 50%
        border 2px gray solid
        position absolute
        bottom 60px
        left 50px
      .btn-default
        background #FF4081
        color #FCF8E3
      .showstar-ok
        margin 0 auto
        line-height 50px
        text-align center
        font-size 20px
        width 50px
        height 50px
        color white
        border-radius 50%
        border 2px tomato solid
        background tomato
        position absolute
        bottom 60px
        right 50px
      .showstar-start
        text-align center
        border-radius 50%
        font-size 30px
        font-weight 700
        width 60px
        height 60px
        border 2px white solid
        background tomato
        color white
        line-height 60px
        margin 0 auto
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        margin auto
</style>
