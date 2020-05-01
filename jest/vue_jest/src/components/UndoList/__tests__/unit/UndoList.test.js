import { shallowMount } from '@vue/test-utils'
import { findTestWrapper } from '../../../../utils/testUtils'
import UndoList from '../../UndoList'

test('UndoList参数为[]，count值应为0，且列表无内容', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: { list: [] }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItem = findTestWrapper(wrapper, 'item')
  expect(countElem.at(0).text()).toBe('0')
  expect(listItem.length).toBe(0)
})

test('UndoList参数为[1, 2, 3]，count值应为3，且列表有内容, 且存在删除按钮', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }]
    }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItem = findTestWrapper(wrapper, 'item')
  const deleteButtons = findTestWrapper(wrapper, 'delete-button')
  expect(countElem.at(0).text()).toBe('3')
  expect(listItem.length).toBe(3)
  expect(deleteButtons.length).toBe(3)
})

test('删除按钮被点击时，向外触发删除事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }]
    }
  })
  const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
  deleteButton.trigger('click')
  expect(wrapper.emitted().delete).toBeTruthy()
  expect(wrapper.emitted().delete[0][0]).toBe(1)
})

test('列表项被点击，触发status事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }]
    }
  })
  const itemButton = findTestWrapper(wrapper, 'item').at(1)
  itemButton.trigger('click')
  expect(wrapper.emitted().status).toBeTruthy()
  expect(wrapper.emitted().status[0][0]).toBe(1)
})

test('显示一个input框', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }]
    }
  })
  const input = findTestWrapper(wrapper, 'input')
  expect(input.length).toBe(1)
  expect(input.at(0).element.value).toBe('2')
})

test('input框失去焦点时，向外触发reset事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }]
    }
  })
  const input = findTestWrapper(wrapper, 'input').at(0)
  input.trigger('blur')
  expect(wrapper.emitted().reset).toBeTruthy()
})
