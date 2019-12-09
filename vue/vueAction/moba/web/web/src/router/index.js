import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home }
      ]
    }
  ]
})

export default router
