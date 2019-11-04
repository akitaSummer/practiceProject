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
  deleteTask(state, {task}) {
    task.deleted = true
  },
  toggleEditing(state) {
    if(state.editing && state.editing.text) {
      state.selected.todo.tasks.unshift({
        title: state.editing.text,
        date: new Date(),
        done: false,
        deleted: false
      })
    }
    state.editing = state.editing ? null : {text: ''}
  }
}