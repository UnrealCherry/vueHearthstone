import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import  header from "../components/header.vue"
import  chatroom from "../components/chatroom.vue"
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {path:"/",component:header},
    {path:"/b",component:chatroom}
  ]
})
