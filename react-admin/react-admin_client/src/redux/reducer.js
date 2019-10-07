import {INCREMENT,DECREMENT} from './action-type'
import {combineReducers} from "redux";

function count(state=0, action) {
  switch(action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

export default combineReducers(
  {
    count
  }
)