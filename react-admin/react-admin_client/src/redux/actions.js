import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER} from './action-types'
import {reqLogin} from "../api"
import storageUtils from "../utils/storageUtils"

// 设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})
// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 显示错误信息的同步action
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})
// 退出登录的同步action
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  // 返回action对象
  return {type: RESET_USER}
}

// 登录的异步action
export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      const user = result.data
      // 保存在local中
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      dispatch(showErrorMsg(msg))
    }
  }
}