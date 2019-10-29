<template>
  <div>
    <h1>首页</h1>
    <router-link to="/about">跳转到about</router-link>
    {{count}}
    <button @click="handleIncrement">+1</button>
    <button @click="handleDecrease">-1</button>
    <button @click="handleAsyncIncrement">async +1</button>
    {{list}}
    {{listCount}}
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: "index",
    computed: {
      ...mapState(['count']),
      ...mapGetters(['filteredList', 'listCount'])
    },
    methods: {
      handleIncrement() {
        this.$store.dispatch('increment')
      },
      handleDecrease() {
        this.$store.dispatch('decrease')
      },
      handleAsyncIncrement() {
        this.$store.dispatch('asyncIncrement')
      }
    }
  }
</script>

<style scoped>

</style>