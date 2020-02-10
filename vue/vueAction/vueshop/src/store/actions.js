import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api/index'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_REATINGS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT
} from './mutation-types'

export default {
  async getAddress({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, { address: result.data })
  },
  async getCategorys({ commit }) {
    const result = await reqFoodCategorys()
    commit(RECEIVE_CATEGORYS, { categorys: result.data })
  },
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops({ latitude, longitude })
    commit(RECEIVE_SHOPS, { shops: result.data })
  },
  recordUserInfo({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, userInfo)
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, { userInfo: result.data })
    }
  },
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.data === 0) {
      commit(RESET_USER_INFO)
    }
  },
  async getShopInfo({ commit }, callback) {
    const result= await reqShopInfo()
    if (result.data.code === 0) {
      const info = result.data.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
      callback && callback()
    }
  },
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.data.code === 0) {
      commit(RECEIVE_REATINGS, { ratings: result.data.data })
      callback && callback()
    }
  },
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.data.code === 0) {
      commit(RECEIVE_GOODS, { goods: result.data.data })
      callback && callback()
    }
  },
  updateFoodCount ({ commit }, { food, isAdd }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  }
}
