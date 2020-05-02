import { mount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import store from '../../../../store/store'
import { findTestWrapper } from '../../../../utils/testUtils'
import axios from '../../__mocks__/axios'

beforeEach(() => {
  axios.success = true
  jest.useFakeTimers()
})

test(`
  1. 用户在header输入数据
  2. 用户会点击回车按钮
  3. 列表项应该添加用户输入的内容列表项
`, async () => {
  const wrapper = await mount(TodoList, { store })
  const inputElem = findTestWrapper(wrapper, 'input').at(0)
  const content = 'Dell lee'
  inputElem.setValue(content)
  inputElem.trigger('change')
  inputElem.trigger('keyup.enter')
  await wrapper.vm.$nextTick()
  const listItems = findTestWrapper(wrapper, 'item')
  expect(listItems.length).toBe(3)
  expect(listItems.at(2).text()).toContain(content)
})

test(`
  1. 用户进入页面时，请求远程数据
  2. 用列表展示远程返回数据
`, async () => {
  const wrapper = mount(TodoList, { store })
  await wrapper.vm.$nextTick()
  const listItems = findTestWrapper(wrapper, 'item')
  expect(listItems.length).toBe(2)
})

test(`
  1. 用户进入页面时，请求远程数据
  2. 用列表展示空数据
`, async () => {
  axios.success = false
  const wrapper = mount(TodoList, { store })
  await wrapper.vm.$nextTick()
  const listItems = findTestWrapper(wrapper, 'item')
  expect(listItems.length).toBe(0)
})

test(`
  1. 用户进入页面时，5秒后请求远程数据
  2. 用列表展示远程返回数据
`, async () => {
  const wrapper = mount(TodoList, { store })
  jest.runAllTimers()
  // jest.advanceTimersByTime(6000)
  await wrapper.vm.$nextTick()
  const listItems = findTestWrapper(wrapper, 'item')
  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(listItems.length).toBe(2)
})
