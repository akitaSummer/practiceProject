import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('dateString', (value, formatStr) => {
  return format(value, formatStr || 'yyyy-MM-dd HH:mm:ss')
})
