import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '../views/Login'

Vue.use(VueRouter)


export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  }]
})
