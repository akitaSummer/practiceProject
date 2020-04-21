jest.mock('./util')
    // jest会自动将util类的构造函数和方法编程jest.fn()
    // 你可以在__mocks__中重写util类的mock方法
    // 或者直接在第二个参数中传入方法
    // jest.mock('./util', () => {
    //     const Util = jest.fn()
    //     Util.prototype.a = jest.fn()
    //     Util.prototype.b = jest.fn()
    //     return Util
    // })
import Util from './util'
import demoFunction from './class_mock'

test('测试demoFunction', () => {
    demoFunction()
    expect(Util).toHaveBeenCalled()
})