import {INCREMENT, DECREMENT} from './action-type'

export const incrementRedux = (data) => {
  return {type: INCREMENT, data}
}
export const decrementRedux = (data) => {
  return {type: DECREMENT, data}
}

export const incrementAsyncRedux = (data) => {
  return dispatch =>
    // 执行异步
  setTimeout(() => dispatch(incrementRedux(data)), 1000) // 分发同步
}
