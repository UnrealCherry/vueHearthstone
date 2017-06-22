<template>
  <div id="app">
    <keep-alive><router-view class="vheader"  :somedata="this.someData" @reloding="reloding"></router-view></keep-alive>
    <keep-alive> <bottom class="bottom"></bottom></keep-alive>
  </div>
</template>

<script>
import header from "./components/header.vue";
import bottom from "./components/bottom.vue"
import star from "./components/star.vue"
  export default {
  name: 'app',
    data(){
      return {
        someData: {},
      }
    },
    components:{
      "vheader":header,
      "bottom":bottom,
      "star":star
    },
    created(){
      var random = Math.round(Math.random()*1188)
      this.$http.get("/api?HS_ID="+random).then(
          response=>{
              this.someData =response.body;     //发送随机数访问服务器
          }
      )
    },
    methods:{
        reloding:function () {
          var random = Math.round(Math.random()*1188)
          this.$http.get("/api?HS_ID="+random).then(
            response=>{
              this.someData =response.body;//发送随机数访问服务器
            }
          )
        }
    },
    updated(){
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .vheader
      height 100%
      width 100%


</style>
