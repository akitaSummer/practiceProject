// 异常
const throwNewErrorFunc = () => {
    throw new Error('this is a new error')
}

test('toThrow', () => {
    expect(throwNewErrorFunc).toThrow('this is a new error')
})

// f 只会测试失败的测试用例
// o 只会测试和改变的文件相关的测试 必须使用git来管理代码，jest通过git来判断改变的文件
// package.json中将jest --watch也是o模式
// p 根据正则表达式来运行测试用例文件
// t 根据正则表达式来运行测试用例
// q 退出对代码的监控