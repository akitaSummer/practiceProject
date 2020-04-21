import timer from './timer'

jest.useFakeTimers()

test('timer 测试', () => {
    const fn = jest.fn()
    timer(fn)
        // jest.runAllTimers() // 执行所有Timer
        // jest.runOnlypendingTimers() // 执行只在队列中的Timer
    jest.advanceTimersByTime(6000) // 让时间快进
    expect(fn).toHaveBeenCalledTimes(1)
})