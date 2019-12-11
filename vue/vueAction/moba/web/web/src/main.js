import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

import router from './router'

import './assets/iconfont/iconfont.css'
import  VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Card from './components/Card/Card'
import ListCard from './components/Card/ListCard/ListCard'

Vue.use(VueAwesomeSwiper)

Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

import './assets/scss/style.scss'
import ListCard from "./components/Card/ListCard/ListCard";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
