import {INCREMENT, DECREASE} from './mutation-type'

export default {
  [INCREMENT](state, n = 1) {
    state.count += n
  },
  [DECREASE](state) {
    state.count--
  }
}