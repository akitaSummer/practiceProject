import Vue from 'vue'
import App from './App.vue'

import router from './router'

import './assets/iconfont/iconfont.css'
import  VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

import './assets/scss/style.scss'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
