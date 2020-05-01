import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import TodoList from "../../TodoList";
import { findTestWrapper } from '../../../../utils/testUtils'
import { Provider } from 'react-redux'
import store from "../../../../redux/store";
import axios from "../../__mocks__/axios";

// beforeEach(() => {
//   jest.useFakeTimers()
// })

beforeEach(() =>{
  axios.success = true
})

test(`
  1. 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入的内容项
`, () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
    )
  const inputElem = findTestWrapper(wrapper, 'header-input')
  const content = 'Dell Lee'
  inputElem.simulate('change', {
    target: { value: content }
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toBe(1)
  expect(listItems.text()).toContain(content)
})

test(`
  1. 用户打开页面
  2. 应该展示接口返回的数据
`, async () => {
  let wrapper
  await act(async () => {
    wrapper = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
  })
  wrapper.update()
  const listItem = findTestWrapper(wrapper, 'list-item')
  expect(listItem.length).toBe(1)
})

// test(`
//   1. 用户打开页面
//   2. 等待5秒
//   3. 应该展示接口返回的数据
// `, async () => {
//   let wrapper
//   await act(async () => {
//     wrapper = mount(
//       <Provider store={store}>
//         <TodoList />
//       </Provider>
//     )
//   })
//
//   await act(  async () => {
//     jest.advanceTimersByTime(6000)
//   })
//
//   wrapper.update()
//   const listItem = findTestWrapper(wrapper, 'list-item')
//   expect(listItem.length).toBe(1)
// })

test(`
  1. 用户打开页面
  2. 请求不正常，但能将页面展示
`, async () => {
  axios.success = false
  let wrapper
  await act(async () => {
    wrapper = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
  })
  wrapper.update()
  const listItem = findTestWrapper(wrapper, 'list-item')
  expect(listItem.length).toBe(0)
})
