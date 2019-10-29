import {DECREASE, INCREMENT} from './mutation-type'
export default {
  increment({commit}) {
    commit(INCREMENT)
  },
  decrease({commit}) {
    commit(DECREASE)
  },
  async asyncIncrement({commit}) {
    await setTimeout(() => {
      commit(INCREMENT)
    })
  }
}