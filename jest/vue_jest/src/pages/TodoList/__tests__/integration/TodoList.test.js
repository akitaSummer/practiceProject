import { mount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import store from '../../../../store/store'
import { findTestWrapper } from '../../../../utils/testUtils'

test(`
  1.
  2. 用户会点击回车按钮
  3. 列表项应该添加用户输入的内容列表项
`, async () => {
  const wrapper = mount(TodoList, { store })
  const inputElem = findTestWrapper(wrapper, 'input').at(0)
  const content = 'Dell lee'
  inputElem.setValue(content)
  inputElem.trigger('change')
  await inputElem.trigger('keyup.enter')
  const listItems = findTestWrapper(wrapper, 'item')
  expect(listItems.length).toBe(1)
  expect(listItems.at(0).text()).toContain(content)
})
