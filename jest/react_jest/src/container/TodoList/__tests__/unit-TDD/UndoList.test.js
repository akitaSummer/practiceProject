import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import UndoList from "../../components/UndoList/UndoList";
import { findTestWrapper } from '../../../../utils/testUtils'

test('未完成列表当数据为空时，count数目为0', () => {
  const wrapper = mount(<UndoList list={[]}/>)
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(countElem.text()).toBe('0')
  expect(listItems.length).toBe(0)
})

test('未完成列表当数据存在时，count数目为数据数目', () => {
  const listData = [{ status: 'div', value: 'jest'}, { status: 'div', value: 'TDD'}]
  const wrapper = mount(<UndoList list={listData}/>)
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(countElem.text()).toBe('2')
  expect(listItems.length).toBe(2)
})

test('未完成列表当数据存在时，点击按钮，调用删除方法', () => {
  const listData = [{ status: 'div', value: 'jest'}, { status: 'div', value: 'TDD'}]
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const index = 1
  const wrapper = mount(<UndoList list={listData} setUndoList={fn1} changeStatus={fn2}/>)
  const deleteItems = findTestWrapper(wrapper, 'delete-item')
  expect(deleteItems.length).toBe(2)
  deleteItems.at(1).simulate('click')
  expect(fn1).toHaveBeenLastCalledWith([{ status: 'div', value: 'jest'}])
})

test('当某一项被点击时，触发changeStatus函数', () => {
  const listData = [{ status: 'div', value: 'jest'}, { status: 'div', value: 'TDD'}]
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const index = 1
  const wrapper = mount(<UndoList list={listData} setUndoList={fn1} changeStatus={fn2}/>)
  const listItems = findTestWrapper(wrapper, 'list-item')
  listItems.at(1).simulate('click')
  expect(fn2).toHaveBeenLastCalledWith(index)
})

test('当某一项状态是input时，展示输入框', () => {
  const listData = [{ status: 'input', value: 'jest'}, { status: 'div', value: 'TDD'}]
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const wrapper = mount(<UndoList list={listData} setUndoList={fn1} changeStatus={fn2}/>)
  const inputItems = findTestWrapper(wrapper, 'input')
  expect(inputItems.length).toBe(1)
})

test('当某一项状态是input时，失去焦点，触发handleBlur方法', () => {
  const listData = [{ status: 'input', value: 'jest'}, { status: 'div', value: 'TDD'}]
  const fn = jest.fn()
  const index = 0
  const wrapper = mount(<UndoList handleBlur={fn} list={listData}/>)
  const inputItem = findTestWrapper(wrapper, 'input')
  inputItem.simulate('blur')
  expect(fn).toHaveBeenLastCalledWith(index)
})

test('当某一项输入框变更时，触发valueChange方法', () => {
  const listData = [{ status: 'input', value: 'jest'}, { status: 'div', value: 'TDD'}]
  const fn = jest.fn()
  const wrapper = mount(<UndoList list={listData} setUndoList={fn}/>)
  const inputItem = findTestWrapper(wrapper, 'input')
  act(() => {
    inputItem.at(0).simulate('change', {
      target: { value: 'react' }
    })
  })
  expect(fn).toHaveBeenCalled()
})
