<template>
  <el-menu :router='true' mode='horizontal'>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/about">About</el-menu-item>
    <el-menu-item index="/vue">Vue</el-menu-item>
    <el-menu-item index="/react">React</el-menu-item>
  </el-menu>
  <router-view/>
  <div id="vue"></div>
  <div id="react"></div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
