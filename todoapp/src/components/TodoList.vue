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
      ...mapMutations(['selectTodo', 'nextTodo', 'prevTodo'])
    },
    mounted() {
      let touch = {}
      this.$el.addEventListener('touchstart', event => {
        touch.startX = event.touches[0].clientX
        touch.endX = 0
      })
      this.$el.addEventListener('touchmove', event => {
        touch.endX = event.touches[0].clientX
      })
      this.$el.addEventListener('touchend', () => {
        if(!touch.endX || Math.abs(touch.endX - touch.startX) < 10) {
          return
        }
        if (touch.endX < touch.startX) {
          this.nextTodo()
        } else {
          this.prevTodo()
        }
      })
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