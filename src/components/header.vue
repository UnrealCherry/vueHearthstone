<template>
  <div>
<div id="header"  v-if="this.somedata" @touchstart="relative">
  <div class="header-pic" >
    <img  :src="this.somedata.HS_PIC" />
  </div>
    <div class="font-pot">
    <p class="title">{{this.somedata.HS_NAME}}</p>
      <p class="content">
        {{this.somedata.HS_STORY}}</p>
    </div>
  </div>
  <star class="star" :somedata="this.somedata"  v-if="!showstar" @reloding="reloding"></star>
  </div>
</template>

<script type="text/ecmascript-6">
  import bottom from "./bottom.vue"
  import star from "./star.vue"
  var timer=0
export default{
    props:{
        somedata:{
            type:Object
        },
},
  data(){
        return{
           url:"http://file.digitaling.com/eImg/uimages/20151109/1447041644145134.gif",
            X:0,
          Y:0,
          judge:false,
          showstar:false
        }
  },
  components:{
        'bottom':bottom,
        "star":star
  },
mounted(){
/*  var height=parseInt(window.getComputedStyle(document.getElementById("header")).height)
    +parseInt(window.getComputedStyle(document.getElementById("bottom")).height)
  document.getElementsByClassName("star")[0].style.height=document.body.clientHeight-height+"px"*/
    var newImg = new Image()
    newImg.src = this.somedata.HS_PIC
    newImg.onerror = () => {    // 图片加载错误时的替换图片
      newImg.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496528402910&di=82ac266aefae75990f85500d8d8563ab&imgtype=0&src=http%3A%2F%2Ffile03.16sucai.com%2F2016%2F03%2F2016b3smv0fusdt.jpg'
    }
    newImg.onload = () => {                                 // 图片加载成功后把地址给原来的img
      this.url = this.somedata.HS_PIC
    }
  },
  methods:{
   /*   Ondown:function (event) {
        event = event.changedTouches ? event.changedTouches[0] : event
        this.Y=event.clientY
        this.X=event.clientX
        this.judge=true
      },
      Onmove:function (event) {
        event = event.changedTouches ? event.changedTouches[0] : event
        if(this.judge) {

          var header = document.getElementById("header")
           var height=parseInt(window.getComputedStyle(header).height)
          var left=parseInt(window.getComputedStyle(header).left)
          var top=parseInt(window.getComputedStyle(header).top)
          var width=parseInt(window.getComputedStyle(header).width)
            var X=(event.clientX-this.X)/5+left+"px"
            var Y=(event.clientY-this.Y)/5+top+"px"
          clearTimeout(timer)
          console.log(-width/2)
          if(Math.abs(parseInt(X))<width/5){
              header.style.left=X
            X=0+"px"
          }
          if(parseInt(X)<-width/5){
                header.style.left= X
              X=-1000+"px";
            this.$router.go(0)
          }
          if(parseInt(X)>width/5){
            header.style.left= X
            X=1000+"px";
            location.reload();
          }
          if(parseInt(Y)<0||parseInt(Y)>height/100){
            header.style.top= Y
            Y=0+"px"}
            timer=setTimeout(function(){
                header.style.left= X
                header.style.top= Y
            },200)

        }
      },
      Onend:function () {
        this.judge=false
      },*/
     Onshow:function () {
          if(!this.showstar){
       this.showstar=true}
       else {
              this.showstar=false
            setTimeout(function(){
                console.log(1)
              document.getElementById("star").style.transition="0.5s"
                document.getElementById("star").style.position="fixed"
              document.getElementById("star").style.top="0"
            },1)
          }
     },
    relative:function () {
      document.getElementById("star").style.top="0px"
      document.getElementById("star").style.boxShadow="0"
    },
    reloding:function () {

         this.$emit("reloding")

    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#header
    width 100%
    height 100%
    font-size 0
    overflow hidden
    transition 0.1s
    position relative
    left 0
    top 0
    .span-left
      width 5%
      font-size 20px
      display inline-block
      position absolute
      left 5px
      top 150px
      color palevioletred
    .span-right
      width 5%
      font-size 20px
      display inline-block
      position absolute
      right 5px
      top 150px
      color palevioletred
    .header-pic
      width 300px
      height 270px
      margin 0 auto
      overflow hidden
    .header-pic img
        width 190px
        height 100%
        margin 0 auto
        display block
    .font-pot
      padding 10px
      .title
          text-align center
          font-size 25px
      .content
          text-align center
          font-size 14px

</style>
