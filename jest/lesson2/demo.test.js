import { runCallback, createObject, getData } from './demo'
import axios from 'axios'
jest.mock('axios')

test('测试runCallback', () => {
    // const func = jest.fn(() => {
    //     return 'hello'
    // })
    // expect(runCallback(func)).toBe('hello')
    const func = jest.fn() // mock函数，捕获函数是否被调用, this和调用顺序
    runCallback(func)
    expect(func).toBeCalled()
    console.log(func.mock)
        // {
        //     calls: [ [] ], // 被调用的情况（传入的参数）
        //     instances: [ undefined ], // 实例的指向（mock函数this的指向）
        //     invocationCallOrder: [ 1 ], // 被调用的次数
        //     results: [ { type: 'return', value: undefined } ] // 结果
        // }
})

test('测试runCallback2', () => {
    const func = jest.fn()
    runCallback(func)
    runCallback(func)
    expect(func.mock.calls.length).toBe(2)
})

test('测试runCallback3', () => {
    const func = jest.fn()
    runCallback(func)
    runCallback(func)
    expect(func.mock.calls[0]).toEqual([])
        // expect(func).toBeCalledWith('abc')
})

test('测试runCallback4', () => {
    const func = jest.fn()
        // func.mockReturnValue('dell')
        // func.mockmockReturnValueOnce('Dell').mockReturnValueOnce('Lee')
        // func.mockImplementation(() => {
        //     return 'dell'
        // })
        // func.mockImplementationOnce(() => {
        //     return 'dell'
        // })
        // func.mockReturnThis()
    func.mockReturnValueOnce('Dell')
    func.mockReturnValueOnce('Lee')
    runCallback(func)
    runCallback(func)
    expect(func.mock.results[0].value).toBe('Dell')
})

test('测试 createObject', () => {
    const func = jest.fn()
    createObject(func)
    expect(func.mock.instances[0]).toEqual({})
})

test('测试getData', async() => {
    // 改变函数的内部实现
    // axios.get.mockResolvedValue({ data: 'hello' })
    axios.get.mockResolvedValueOnce({ data: 'hello1' })
    axios.get.mockResolvedValueOnce({ data: 'hello2' })
    await getData().then((data) => {
        expect(data).toBe('hello1')
    })
    await getData().then((data) => {
        expect(data).toBe('hello2')
    })
})