import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import TodoList from './pages/TodoList/TodoList'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: TodoList
}, {
  path: '*',
  component: NotFoundPage
}]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
