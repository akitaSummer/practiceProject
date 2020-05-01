import {
  CHANGE_INPUT_VALUE
} from './mutation-types'

export default {
  [CHANGE_INPUT_VALUE] (state, payload) {
    state.inputValue = payload
  }
}
