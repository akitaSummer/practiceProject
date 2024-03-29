import Vue from 'vue'
import Fly from 'flyio/dist/npm/wx'
import App from './app.vue'
import store from './store/store'

// 设置vue的提示关闭
Vue.config.productionTip = false

// 声明当前组件的类型
App.mpType = 'app' // 应用

// 将store对象放置Vue原型上
Vue.prototype.$store = store

const fly = new Fly
Vue.prototype.$fly = fly

// 生成应用的实例
const app = new Vue(App)

// 挂载整个应用
app.$mount()
