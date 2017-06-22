// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from "vue-resource"
import VueSocketio from 'vue-socket.io'
/*Vue.use(VueSocketio, 'http://localhost:8080');*/
Vue.use(VueSocketio, 'http://119.23.61.219:8080');
Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
