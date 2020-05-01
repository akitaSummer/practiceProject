import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from "../../components/Header/Header";

Enzyme.configure({ adapter: new Adapter() })

describe('Header组件', () => {
  test('渲染样式正常', () => {
    const wrapper = shallow(<Header/>)
    expect(wrapper).toMatchSnapshot()
  })
})

test('Header 包含一个input框', () => {
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find('[data-test="input"]')
  expect(inputElem.length).toBe(1)
})

test('Header input框, 初始化为空', () => {
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find('[data-test="input"]')
  expect(inputElem.prop('value')).toEqual('')
})

test('Header input框, 当用户输入时，会跟随变化', () => {
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find('[data-test="input"]')
  act(() => {
    inputElem.simulate('change', {
      target: {
        value: 'Jest'
      }
    })
  })
  const newInputElem = wrapper.find('[data-test="input"]')
  expect(newInputElem.prop('value')).toBe('Jest')
})

test('Header 组件 input 框输入回车时，如果 input 无内容，无操作', () => {
  const fn = jest.fn()
  const wrapper = mount(<Header/>)
  const inputElem = wrapper.find('[data-test="input"]')
  act(() => {
    wrapper.setProps({'addUndoItem': fn})
  });
  wrapper.update();
  inputElem.simulate('change', {
    target: {
      value: ''
    }
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  expect(fn).not.toHaveBeenCalled()
})

test('Header 组件 input 框输入回车时，如果 input 有内容，函数被调用', () => {
  const fn = jest.fn()
  const wrapper = mount(<Header addUndoItem={fn}/>)
  wrapper.invoke('addUndoItem')(fn)
  const inputElem = wrapper.find('[data-test="input"]')
  inputElem.simulate('change', {
    target: {
      value: 'Jest'
    }
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  expect(fn).toHaveBeenCalled()
  const newInputElem = wrapper.find('[data-test="input"]')
  expect(newInputElem.prop('value')).toBe('')
})

