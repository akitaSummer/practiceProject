import {INCREMENT, DECREMENT} from './action-type'

export const incrementRedux = (data) => {
  return {type: INCREMENT, data}
}
export const decrementRedux = (data) => {
  return {type: DECREMENT, data}
}
