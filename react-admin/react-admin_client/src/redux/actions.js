import {INCREMENT, DECREMENT} from './action-type'

export const action = {
  increment(data) {
    return {type: INCREMENT, data}
  },
  decrement(data) {
    return {type: DECREMENT, data}
  }
}