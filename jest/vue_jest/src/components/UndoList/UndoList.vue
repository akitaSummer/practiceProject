<template>
  <div class="undolist">
    <div class="title">
      正在进行
      <span class="count" data-testid="count">{{list.length}}</span>
    </div>
    <ul class="list">
      <li v-for="(item, i) in list" :key="i" data-testid="item" class="item" @click="() => { changeStatus(i) }">
        <input class="user-input" type="text" v-if="item.status === 'input'" data-testid="input" v-model="item.value" @blur="handleInputBlur"/>
        <span v-else>{{item.value}}</span>
        <span class="delete" data-testid="delete-button" @click="() => { handleDelete(i) }">-</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    handleDelete (index) {
      this.$emit('delete', index)
    },
    changeStatus (index) {
      this.$emit('status', index)
    },
    handleInputBlur () {
      this.$emit('reset')
    }
  }
}
</script>

<style scoped lang="scss">
  .undolist {
    width: 600px;
    margin: 0 auto;
  }
  .title {
    line-height: 30px;
    font-size: 24px;
    margin: 10px 0;
    font-weight: bold;
  }
  .count {
    margin-top: 5px;
    font-size: 12px;
    float: right;
    display: block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #e6e6e6;
    border-radius: 10px;
    color: #000;
  }
  .item {
    line-height: 32px;
    font-size: 14px;
    background: #fff;
    border-left: 5px solid #629A9A;
    border-radius: 3px;
    margin-bottom: 10px;
    text-indent: 10px;
  }
  .list {
    list-style-type: none;
  }
  .delete {
    display: block;
    float: right;
    text-indent: 0;
    margin-top: 5px;
    font-size: 12px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #e6e6e6;
    border-radius: 10px;
    color: #000;
    cursor: pointer;
  }
  .user-input {
    height: 24px;
    text-indent: 12px;
    width: 460px;
  }
</style>
