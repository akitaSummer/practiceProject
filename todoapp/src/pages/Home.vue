<template>
  <div class="home">
    <app-bar title="TODO" left="bars" right="search"></app-bar>
    <avatar></avatar>
    <grandient></grandient>
    <todo-list></todo-list>
    <todo-detail></todo-detail>
    <todo-editing></todo-editing>
    <floating-button></floating-button>
  </div>
</template>

<script>
  import AppBar from '../components/AppBar'
  import Avatar from '../components/Avatar'
  import Grandient from '../components/Gradient'
  import TodoList from '../components/TodoList'
  import TodoDetail from '../components/TodoDetail'
  import TodoEditing from '../components/TodoEditing'
  import FloatingButton from '../components/FloatingButton'
  export default {
    name: "Home",
    components: {
      AppBar,
      Avatar,
      Grandient,
      TodoList,
      TodoDetail,
      TodoEditing,
      FloatingButton
    }
  }
</script>

<style lang="scss">
  .home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: black;
  }
</style>