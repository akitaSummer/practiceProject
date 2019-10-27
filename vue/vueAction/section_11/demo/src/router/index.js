import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index'
import About from '../components/about'
import User from '../components/user'

Vue.use(VueRouter)

// const User = () => import(/* webpackChunkName: "group-foo" */'../components/user')


const router = new VueRouter({
  routes: [
    {
      path: '/index',
      meta: {
        title: '首页'
      },
      component: Index
    },
    {
      path: '/about',
      meta: {
        title: '关于'
      },
      component: About
    },
    {
      path: '/user/:id',
      meta: {
        title: '个人主页'
      },
      component: User
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to: 即将进入目标的路由对象
  // from: 当前导航即将离开的路由对象
  // next: 调用该方法后, 才能进入下一个钩子
  window.document.title = to.meta.title
  next()
})

export default router