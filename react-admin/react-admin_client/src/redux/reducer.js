import {combineReducers} from "redux"
import storageUtils from '../utils/storageUtils'
import {SET_HEAD_TITLE} from './action-types'

// 用来管理头部的reducer函数
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    default:
      return state
  }
}
const initUser = storageUtils.getUser()
// 用来管理当前登录用户的reducer函数
function user(state = initUser, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

export default combineReducers(
  {
    headTitle,
    user
  }
)