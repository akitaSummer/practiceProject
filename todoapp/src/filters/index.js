import Vue from 'vue'
// 自定义过滤器
Vue.filter('dateString', (val) => {
  return val.toDateString().replace(/(\s\d{4})$/, ', $1')
})