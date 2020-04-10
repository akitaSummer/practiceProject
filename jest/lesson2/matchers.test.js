test('测试匹配', () => {
        // toBe 匹配器 matchers
        expect(10).toBe(10)
    })
    // toBeNull
    // toBeUndefined

// Boolean
// toBeDefined 定义过
// toBeTruthy 为真
// toBeFalsy 为假 0也可以
// expect(a).not.toBeTruthy() 等同于 expect(a).toBeTruthy()

// Number
// toBeGreaterThan 比x大
// toBeLessThan 比x小
// toBeLessThanOrEqul

test('toBeCloseTo', () => {
    const firstNumber = 0.1
    const secondNumber = 0.2
        // expect(firstNumber + secondNumber).toBe(0.3)
        // 计算浮点数
    expect(firstNumber + secondNumber).toBeCloseTo(0.3)
})

// String
test('toMatch', () => {
    const str = 'https://www.dell-lee.com'
    expect(str).toMatch(/dell-lee/)
})

// Array, Set
test('toContain', () => {
    const arr = ['dell', 'lee', 'imooc']
    expect(arr).toContain('dell')
})

// 异常
const throwNewErrorFunc = () => {
    throw new Error('this is a new error')
}

test('toThrow', () => {
    expect(throwNewErrorFunc).toThrow('this is a new error')
})

test('测试对象内容相等', () => {
    // toEqual 匹配器 
    const a = { one: 1 }
    expect(a).toEqual({ one: 1 })
})