<template>
  <div class="todo" :class="{todo_selected: selected}">
    <div class="todo_head" @click="handleClick">
      <div class="todo_icon" :style="{color}">
        <i :class="['fa', `fa-${todo.icon}`]"></i>
      </div>
      <div class="todo_menu">
        <i class="fa fa-ellipsis-v"></i>
      </div>
    </div>
    <div class="todo_body">
      <p class="todo_tip">{{todo.tasks.length}} Task</p>
      <h3 class="todo_title">{{todo.name}}</h3>
      <div class="todo_progress">
        <span class="todo_progress_line">
          <div :style="{ width: progress, backgroundImage: progressColor }"></div>
        </span>
        <span class="todo_progress_num">{{progress}}</span>
      </div>
      <div class="todo_tasks">
        <h4 class="todo_subtitle" v-if="todayTasks.length">Today</h4>
        <ul>
          <li v-for="task in todayTasks" :key="task.id">
            <task :task="task"></task>
          </li>
        </ul>
        <h4 class="todo_subtitle" v-if="tomorrowTasks.length">Tomorrow</h4>
        <ul>
          <li v-for="task in todayTasks" :key="task.id">
            <task :task="task"></task>
          </li>
        </ul><h4 class="todo_subtitle" v-if="outdatedTasks.length">Outdated</h4>
        <ul>
          <li v-for="task in todayTasks" :key="task.id">
            <task :task="task"></task>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Task from './Task'
  export default {
    name: "Todo",
    props: {
      todo: {
        type: Object,
        required: true
      },
      selected: {
        type:Boolean
      }
    },
    components: {
      Task
    },
    computed: {
      ...mapState(['today', 'tomorrow']),
      color() {
        return this.todo.colors[0]
      },
      progress() {
        const totalCount = this.todo.tasks.filter(task => !task.deleted).length
        const doneCount = this.todo.tasks.filter(task => !task.deleted && task.done).length
        return `${Math.round(doneCount/totalCount * 100)}%`
      },
      progressColor() {
        const colorBottom = `color-stop(30%, ${this.todo.colors[0]})`
        const colorTop = `to(${this.todo.colors[1]})`
        return `-webkit-gradient(linear, left bottom, right bottom, ${colorBottom}, ${colorTop})`
      },
      todayTasks() {
        return this.todo.tasks.filter(task => {
          return task.date >= this.today && task.date < this.tomorrow
        })
      },
      tomorrowTasks() {
        return this.todo.tasks.filter(task => {
          return task.date >= this.tomorrow
        })
      },
      outdatedTasks() {
        return this.todo.tasks.filter(task => {
          return task.date < this.today
        })
      }
    },
    methods: {
      handleClick() {
        const appRect = document.querySelector('#app').getBoundingClientRect()
        const elRect = this.$el.getBoundingClientRect()
        const todo = this.todo
        const rect = {}

        rect.top = elRect.top - appRect.top
        rect.left = elRect.left - appRect.left
        rect.width = elRect.width
        rect.height = elRect.height
        rect.appWidth = appRect.width
        rect.appHeight = appRect.height

        this.$emit('select', {rect, todo})

      }
    }
  }
</script>

<style scoped lang="scss">
.todo {
  flex: 1;
  margin:0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
}
  .todo_selected {
    visibility: hidden;
  }
  .todo_head{
    display: flex;
    padding: 20px;
    height:44px;
    justify-content: space-between;
    align-item: flex-start;
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  .todo_body {
    padding: 0 20px;
    transform: translate3d(0, 189px, 0);
    will-change: transform;
  }
  .todo_icon {
    display: flex;
    width: 44px;
    height: 44px;
    border: 1px solid #eee;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
  }
  .todo_menu {
    color: #eee;
  }
  .todo_tips {
    opacity: 0.6;
    font-size: 13px;
    font-weight: 600;
  }
  .todo_title {
    margin-top: 6px;
    font-size: 32px;
  }
  .todo_progress {
    display: flex;
    align-items: center;
    margin-top:30px;
  }
  .todo_progress_line {
    margin_right: 10px;
    flex: 1;
    height: 3px;
    background-color: #eee;
    div {
      dispaly: block;
      height: 100%;
      transition: all 0.3s ease;
    }
  }
  .todo_progress_num {
    font-size: 12px;
  }
  .todo_tasks {
    opacity: 0;
    transform: scale3d(1, 0, 1);
  }
  .todo_subtitle {
    margin-top: 32px;
    mrigin-botton: 8px;
    color: #999;
  }
</style>