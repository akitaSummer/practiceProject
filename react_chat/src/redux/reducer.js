import {combineReducers} from 'redux'
import {
  GET_USERS_lIST,
  GET_USER_INFO,
  GET_GROUP_DETAIL,
  CHANGE_IGNORE
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

const group = (state = {}, action) => {
  switch (action.type) {
    case GET_GROUP_DETAIL:
      return action.data
    case CHANGE_IGNORE:
      return {
        ...state,
        isIgnore: !state.isIgnore
      }
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  group
})
