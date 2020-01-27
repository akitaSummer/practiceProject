import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home/Home'
import Msite from "../pages/Home/Msite/Msite";
import Search from "../pages/Home/Search/Search";
import Profile from "../pages/Home/Profile/Profile";
import Order from "../pages/Home/Order/Order";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/msite',
          name: 'msite',
          component: Msite
        },
        {
          path: '/home/search',
          name: 'search',
          component: Search
        },
        {
          path: '/home/order',
          name: 'order',
          component: Order
        },
        {
          path: '/home/profile',
          name: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/',
      redirect: '/home/msite'
    }
  ]
})

export default router
