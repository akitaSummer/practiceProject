import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_REATINGS,
  RECEIVE_INFO,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT
} from './mutation-types'

import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  [RECEIVE_REATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, { food }) {
    if (!state.shopCart[food]) {
      Vue.set(state.shopCart, food, 1)
    } else {
      state.shopCart[food]++
    }
  },
  [DECREMENT_FOOD_COUNT](state, { food }) {
    if (state.shopCart[food] === 0) {
      delete state.shopCart[food]
    } else {
      state.shopCart[food]--
    }
  }
}

