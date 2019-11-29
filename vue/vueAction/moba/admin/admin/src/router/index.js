import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'

Vue.use(VueRouter)

 const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      children: [
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
      ]
    }
  ]
})

export default router
