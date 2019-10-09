import {combineReducers} from "redux"
import storageUtils from '../utils/storageUtils'
import {SET_HEAD_TITLE,RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER} from './action-types'

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
    case RECEIVE_USER:
      return action.data
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      // 不要修改原本的数据
      return {...state, errorMsg}
    case RESET_USER:
      return {}
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