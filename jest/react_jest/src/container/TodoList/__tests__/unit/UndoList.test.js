import React from 'react'
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
  const listData = ['jest', 'TDD']
  const wrapper = mount(<UndoList list={listData}/>)
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(countElem.text()).toBe('2')
  expect(listItems.length).toBe(2)
})

test('未完成列表当数据存在时，点击按钮，调用删除方法', () => {
  const listData = ['jest', 'TDD']
  const fn = jest.fn()
  const index = 1
  const wrapper = mount(<UndoList list={listData} deleteItem={fn}/>)
  const deleteItems = findTestWrapper(wrapper, 'delete-item')
  expect(deleteItems.length).toBe(2)
  deleteItems.at(1).simulate('click')
  expect(fn).toHaveBeenLastCalledWith(1)
})

test('当调用删除方法时，undoList应当删除按钮', () => {
  const listData = ['jest', 'TDD']
  const fn = jest.fn()
  const index = 1
  const wrapper = mount(<UndoList list={listData} setUndoList={fn}/>)
  const deleteItems = findTestWrapper(wrapper, 'delete-item')
  expect(deleteItems.length).toBe(2)
  deleteItems.at(1).simulate('click')
  expect(fn).toHaveBeenLastCalledWith(['jest'])
})
