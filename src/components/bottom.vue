<template>
<div id="bottom">
  <div class="jay-move"></div>
  <div class="move" ref="move">
    <div class="red" >  <router-link to="/" exact><span class="glyphicon glyphicon-refresh"></span></router-link></div>
    <div class="yellow"><router-link to="/b"><span  class="glyphicon glyphicon-music"></span></router-link> </div>
    <div class="pink"><router-link to="/c"><span class="glyphicon glyphicon-user"></span></router-link></div>
    <div class="green"><router-link to="/d"><span class="glyphicon glyphicon-heart"></span></router-link></div>
    <div class="bule"><router-link to="/e"><span class="glyphicon glyphicon-flag"></span></router-link> </div>
    <div>

    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  var a=0
  export default{
    data(){
      return {
        X:0,
        X2:0,
        srceen:0,
        index:9
      }
    },
    methods: {
    reload:function () {

    }

    },
    created(){
    },
    mounted(){
      var jay=document.getElementsByClassName("jay-move")[0]
      jay.style.width=document.body.clientWidth/5+"px";
      var move=this.$refs.move.getElementsByTagName("div")
      var  color= ["#e75a52", "#ebb878", "#73adce", "#e76394", "#6bceb0"]
      var colorNumber=0
      var timer=0
     for(var i=0;i<move.length;i++){
          move[i].index=i;
          move[i].onclick=function () {
            a=this.index
            clearInterval(timer)
            timer=setInterval(function () {
                if(colorNumber==a){
                    colorNumber=a
                  jay.style.backgroundColor=color[colorNumber]
                  jay.style.left=colorNumber*document.body.clientWidth/5+"px";
                  clearInterval(timer)
                  return
                }
                if(a-colorNumber>0){colorNumber++}
                else {colorNumber--}
              if(colorNumber<=0){colorNumber=0}
              jay.style.backgroundColor=color[colorNumber]
              jay.style.left=colorNumber*document.body.clientWidth/5+"px";
            },150)
          }
     }              //动效相关
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#bottom
  width 100%
  height 50px
  position fixed
  bottom 0
  background #4ab7ff
  font-size 14px
  z-index 999
  .move
    color #a79eff
    background #5c4f71
    height 100%
    display flex
    text-align center
    line-height 50px
    a
      width 100%
      height 100%
      display inline-block
      color  #a79eff
    .red
      height 100%
      flex 1
      color white
    .yellow
      height 100%
      flex 1
    .pink
      height 100%
      flex 1
    .green
      height 100%
      flex 1
    .bule
      height 100%
      flex 1
  .jay-move
      width 20%
      height 50px
      background #e75a52
      position absolute
      top 0
      left 0
      transition 0.3s  cubic-bezier(0, 3.04, 1, 0.23)
  a.router-link-active {
    color: #FCF8E3;
  }








</style>
