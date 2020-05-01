import { shallowMount } from '@vue/test-utils'
import { findTestWrapper } from '../../../../utils/testUtils'
import Header from '../../Header'

test('Header包含input框', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  expect(input.exists()).toBe(true)
})

test('input框发生变化，数据跟随改变', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('dell lee')
  const inputValue = wrapper.vm.inputValue
  expect(inputValue).toBe('dell lee')
})

test('input框无内容，输入回车无反应', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeFalsy()
})

test('input框有内容，输入回车触发事件, 同时清空inputValue', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('dell lee')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeTruthy()
  expect(wrapper.vm.inputValue).toBe('')
})

test('样式改变，做提示', () => {
  const wrapper = shallowMount(Header)
  expect(wrapper).toMatchSnapshot()
})
