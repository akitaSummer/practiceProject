import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'
import ItemEdit from '../views/ItemEdit'
import ItemList from '../views/ItemList'
import HeroEdit from '../views/HeroEdit'
import HeroList from '../views/HeroList'
import ArticlesEdit from '../views/ArticlesEdit'
import ArticlesList from '../views/ArticlesList'
import AdsEdit from '../views/AdsEdit'
import AdsList from '../views/AdsList'

Vue.use(VueRouter)

 const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/list', component: CategoryList },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/items/create', component: ItemEdit },
        { path: '/items/list', component: ItemList },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/heros/create', component: HeroEdit },
        { path: '/heros/list', component: HeroList },
        { path: '/heros/edit/:id', component: HeroEdit, props: true },
        { path: '/articles/create', component: ArticlesEdit },
        { path: '/articles/list', component: ArticlesList },
        { path: '/articles/edit/:id', component: ArticlesEdit, props: true },
        { path: '/ads/create', component: adsEdit },
        { path: '/ads/list', component: adsList },
        { path: '/ads/edit/:id', component: adsEdit, props: true },
      ]
    }
  ]
})

export default router
