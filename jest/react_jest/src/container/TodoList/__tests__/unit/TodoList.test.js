import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from "../../TodoList";

Enzyme.configure({ adapter: new Adapter() })

test('TodoList 初始化列表为空', () => {
  const wrapper = shallow(<TodoList />)
})

test('TodoList 应当传递给 Header 一个增加 undoList 的方法', () => {
  const wrapper = mount(<TodoList />)
  const Header = wrapper.find('Header')
  console.log(Header.prop('addUndoItem'))
  expect(Header.prop('addUndoItem')).toBe(wrapper.instance().setUndoList)
})
