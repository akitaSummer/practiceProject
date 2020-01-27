import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from "vue-awesome-swiper/src";
import router from './router'

// Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.min.css'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
