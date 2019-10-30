import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueBus from './plugin/vue-bus'

Vue.config.productionTip = false

Vue.use(VueBus)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
