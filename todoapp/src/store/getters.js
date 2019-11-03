export default {
  currentTodo(state) { // 正在执行的项目列表
    return state.todos[state.currentIndex]
  },
  todayTasks(state) { // 今日未做的项目列表
    const tasks = []
    state.todos.forEach(todo => {
      todo.tasks.forEach(task => {
        if (task.date <= state.tomorrow && !task.done && !task.deleted) {
          tasks.push(task)
        }
      })
    })
    return tasks
  }
}