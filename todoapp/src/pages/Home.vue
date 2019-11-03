<template>
  <div class="home">
    <app-bar title="TODO" left="bars" right="search"></app-bar>
    <avatar></avatar>
    <grandient></grandient>
    <todo-list></todo-list>
  </div>
</template>

<script>
  import AppBar from '../components/AppBar'
  import Avatar from '../components/Avatar'
  import Grandient from '../components/Gradient'
  import TodoList from '../components/TodoList'
  export default {
    name: "Home",
    components: {
      AppBar,
      Avatar,
      Grandient,
      TodoList
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