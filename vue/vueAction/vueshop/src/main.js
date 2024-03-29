import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAwesomeSwiper from "vue-awesome-swiper/src";
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import './filters'

// Vue.config.productionTip = false

import './mock/mockServer'

Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.min.css'

Vue.component(Button.name, Button)

Vue.prototype.$ajax = axios

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
