<template>
  <div class="header">
    <div class="header-content">
      TodoList
      <input
        class="header-input"
        type="text"
        data-testid="input"
        :value="inputValue"
        @input="e => changeValue(e.target.value)"
        @keyup.enter="addTodoItem"
        placeholder="TodoList"
      >
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Header',
  methods: {
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.changeInputValue('')
      }
    },
    ...mapActions(['changeInputValue']),
    changeValue (value) {
      this.changeInputValue(value)
    }
  },
  computed: {
    ...mapState(['inputValue'])
  }
}
</script>

<style scoped lang="scss">
  .header {
    line-height: 60px;
    background: #333;
  }
  .header-content {
    width: 600px;
    margin: 0 auto;
    color: #fff;
    font-size: 24px;
  }
  .header-input {
    float: right;
    width: 360px;
    line-height: 24px;
    outline: none;
    margin-top: 16px;
    color: #333;
    text-indent: 10px;
  }
</style>
