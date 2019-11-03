<template>
  <div class="todo-list" :class="{'todo-list_selected': selected}">
    <ul :style="{width: `${todos.length * 100}%`}">
      <li v-for="todo in todos" :key="todo.name" :style="{transform: `translate3d(-${currentIndex * 100}%, 0, 0)`}">
        <todo :todo="todo" :selected="selected && selected.todo === todo" @select="selectTodo"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import Todo from './Todo.vue'
  export default {
    name: "TodoList",
    components: {
      Todo
    },
    computed: {
      ...mapState(['todos', 'currentIndex', 'selected'])
    },
    methods: {
      ...mapMutations(['selectTodo', 'nextTodo', 'prevTodo', 'changeCurrentIndex'])
    },
    created() {
      this.changeCurrentIndex()
    }
  }
</script>

<style scoped lang="scss">
  .todo-list {
    padding: 0 32px;
    height: 400px;
    transition: all 0.5s ease;
    > ul,
    > ul > li {
      display: flex;
      height: 100%;
    }
    > ul > li {
      flex: 1;
      transition: transform 0.5s ease;
    }
    .todo {
      border-radius: 8px;
      background: white;
    }
  }
  .todo-list_selected {
    transform: scaleX(1.25);
  }
</style>