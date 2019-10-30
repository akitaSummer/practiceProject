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
    <p>随机增加</p>
    <Counter :number="number"></Counter>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import Counter from './counter'
  export default {
    name: "index",
    components: {
      Counter
    },
    computed: {
      ...mapState(['count']),
      ...mapGetters(['filteredList', 'listCount'])
    },
    data() {
      return {
        number: 0
      }
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
      },
      handleAddRandom(num) {
        this.number += num
      }
    },
    created() {
      this.$bus.on('add', this.handleAddRandom)
    },
    beforeDestroy() {
      this.$bus.off('add', this.handleAddRandom)
    }
  }
</script>

<style scoped>

</style>