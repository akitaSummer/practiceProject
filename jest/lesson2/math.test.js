const { add, minus } = require('./math')


test('测试加法', () => {
    expect(add(3, 7)).toBe(10)
})

// 单元测试: 模块测试
// 集成测试: 多个模块测试