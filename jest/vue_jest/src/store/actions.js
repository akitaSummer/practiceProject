import {
  CHANGE_INPUT_VALUE
} from './mutation-types'

export default {
  changeInputValue ({ commit }, value) {
    commit(CHANGE_INPUT_VALUE, value)
  }
}
