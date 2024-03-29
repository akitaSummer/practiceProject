import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 生命使用vuex
Vue.use(Vuex)

export default new Vuex.Store( {
  state,
  actions,
  getters,
  mutations
})
