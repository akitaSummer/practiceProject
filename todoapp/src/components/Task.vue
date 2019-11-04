<template>
  <transition name="fade">
    <div class="task" v-if="!task.deleted">
      <input type="checkbox" :id="id" v-model="task.done">
      <label :for="id">{{task.title}}</label>
      <transition name="fade">
        <span class="task_delete" v-show="task.done" @click="deleteTask({task})">
          <i class="fa fa-trash"></i>
        </span>
      </transition>
    </div>
  </transition>
</template>

<script>
  import {mapMutations} from 'vuex'
  let GID = 1
  export default {
    name: "Task",
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        id: `task-${GID++}`
      }
    },
    methods: {
      ...mapMutations(['deleteTask'])
    }
  }
</script>

<style scoped lang="scss">
.task {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  input {
    display: none;
    &:checked + label::after {
      display: inline-block;
    }
  }
  label {
    flex: 1;
    line-height: 20px;

    &::before,
    &::after{
      content: '';
      display: inline-block;
      margin-right: 20px;
      margin-top: 1px;
      width: 14px;
      height: 14px;
      vertical-align: top;
    }
    &::before {
      border: 1px solid #ccc;
      border-radius: 2px;
      background-color: white;
    }
    &::after {
      content: '\f00c';
      position: relative;
      display: none;
      z-index: 10;
      margin-right: -16px;
      width: 10px;
      height: 10px;
      padding: 3px;
      border-radius: 2px;
      font: normal normal normal 10px/1 FontAwesome;
      color: white;
      background-color: #ccc;
      float: left;
    }
  }
}
  .task_delete {
    padding: 0 10px;
    color: #ccc;
    font-size: 16px;
  }
  .fade-leave-to,
  .fade-enter {
    opactiy: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opactiy: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease;
  }
</style>