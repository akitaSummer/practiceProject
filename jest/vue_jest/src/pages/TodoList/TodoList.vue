<template>
  <div class="hello">
    <Header @add='addUndoItem'/>
    <UndoList :list='undoList' @delete="handleItemDelete" @status="changeStatus" @reset="resetStatus"/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import UndoList from '../../components/UndoList/UndoList'
export default {
  name: 'TodoList',
  components: {
    Header,
    UndoList
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({ status: 'div', value: inputValue })
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      this.undoList = this.undoList.map((item, i) => {
        if (i === index) {
          return { status: 'input', value: item.value }
        } else {
          return item
        }
      })
    },
    resetStatus () {
      this.undoList = this.undoList.map((item, i) => {
        return { status: 'div', value: item.value }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
