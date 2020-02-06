import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home/Home'
import Msite from "../pages/Home/Msite/Msite";
import Search from "../pages/Home/Search/Search";
import Profile from "../pages/Home/Profile/Profile";
import Order from "../pages/Home/Order/Order";
import Login from "@/pages/Login/Login";
import Shop from "@/pages/Shop/Shop";
import ShopGoods from "@/pages/Shop/ShopGoods/ShopGoods";
import ShopInfo from "@/pages/Shop/ShopInfo/ShopInfo";
import ShopRatings from "@/pages/Shop/ShopRatings/ShopRatings";

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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          name: 'shopgoods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          name: 'shopinfo',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          name: 'shopratings',
          component: ShopRatings
        },
        {
          path: '/shop',
          redirect: '/shop/goods'
        }
      ]
    },
  ]
})

export default router
