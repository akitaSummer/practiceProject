import React from 'react'
import { shallow, mount } from 'enzyme'
import TodoList from "../../TodoList";
import { findTestWrapper } from '../../../../utils/testUtils'

// test('TodoList 初始化列表为空', () => {
//   const wrapper = shallow(<TodoList />)
//   expect(wrapper.state('undoList')).toEqual([])
// })

// test('TodoList 应当传递给 Header 一个增加 undoList 的方法', () => {
//   const wrapper = mount(<TodoList />)
//   const Header = wrapper.find('Header')
//   let undoList
//   expect(Header.prop('addUndoItem')).toBe(wrapper.instance().setUndoList)
// })

// test('当Header回车时，undoList应该新增内容', () => {
//   const wrapper = shallow(<TodoList />)
//   const Header = wrapper.find('Header')
//   const addFunc = Header.prop('addUndoItem')
//   addFunc(['Jest'])
//   const length = findTestWrapper(wrapper, 'undoList').text()
//   expect(length).toBe('1')
// })
