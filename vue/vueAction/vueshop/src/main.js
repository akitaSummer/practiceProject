import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAwesomeSwiper from "vue-awesome-swiper/src";
import router from './router'
import store from './store'

// Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.min.css'

Vue.prototype.$ajax = axios

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
