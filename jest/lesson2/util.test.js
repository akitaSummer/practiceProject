import Util from './util'
let util = null

beforeAll(() => {
    util = new Util()
})

test('测试a方法', () => {
    expect(util.a(1)).toBe()
})