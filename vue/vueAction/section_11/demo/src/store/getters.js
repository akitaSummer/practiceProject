export default {
  filteredList: state => {
    return state.list.filter(item => item < 10)
  },
  listCount: (state, getters) => {
    return getters.filteredList.length
  }
}