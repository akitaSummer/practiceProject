export default {
  selectTodo(state, selected) {
    state.unselect = null
    state.selected = selected
  },
  unselectTodo(state) {
    state.unselect = state.selected
    state.selected = null
  },
  nextTodo(state) {
    if (state.currentIndex < state.todos.length - 1) {
      state.currentIndex ++
    }
  },
  prevTodo(state) {
    if (state.currentIndex > 0) {
      state.currentIndex --
    }
  },
  changeCurrentIndex(state) {
    setInterval(() => {
      if (state.currentIndex < state.todos.length - 1) {
        state.currentIndex ++
      }else if (state.currentIndex == state.todos.length-1) {
        state.currentIndex  = 0
      }
    }, 3000)
  }
}