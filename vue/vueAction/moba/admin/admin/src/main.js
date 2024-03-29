import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './ajax'
import ElementUI from 'element-ui'

import './assets/css/style.css'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.default.baseUrl + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
