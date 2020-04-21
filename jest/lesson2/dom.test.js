import { addDivToBody, $ } from './dom'

test('测试 addDivToBody', () => {
    addDivToBody()
    expect($('body').find('div').length).toBe(1)
})