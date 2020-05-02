import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList'
// import Header from '../../../components/Header/Header'
import UndoList from '../../../../components/UndoList/UndoList'

describe('TodoList组件', () => {
  it('初始化时, undoList为空', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.vm.undoList
    expect(undoList).toEqual([])
  })

  it('执行addItem时，增加一个内容', () => {
    const wrapper = shallowMount(TodoList)
    // wrapper.vm.addUndoItem('dell lee')
    // const header = wrapper.find(Header)
    // header.vm.$emit('add', 'dell lee')
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }]
    })
    wrapper.vm.addUndoItem(4)
    const undoList = wrapper.vm.$data.undoList
    expect(undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 2 },
      { status: 'div', value: 3 },
      { status: 'div', value: 4 }])
  })

  test('调用UndoList, 传递list参数', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.find(UndoList)
    const list = undoList.props('list')
    expect(list).toBeTruthy()
  })

  test('调用handleDeleteItem方法时, UndoList列表内容会减少一个', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }]
    })
    wrapper.vm.handleItemDelete(1)
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 3 }])
  })

  test('调用changeStatus方法时, UndoList列表内容会减少一个', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }]
    })
    wrapper.vm.changeStatus(1)
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'input', value: 2 },
      { status: 'div', value: 3 }])
  })

  test('调用resetStatus方法时, UndoList列表格式全为div', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }]
    })
    wrapper.vm.resetStatus()
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 2 },
      { status: 'div', value: 3 }])
  })
})
