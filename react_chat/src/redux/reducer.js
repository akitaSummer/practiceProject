import {combineReducers} from 'redux'
import {
  GET_USERS_lIST,
  GET_USER_INFO
} from './action-types'

const user = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return action.data
    default:
      return state
  }
}

const userList = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_lIST:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList
})
