// 类型判断
// <类型>值 注:tsx中不可用
// 类型 as 值

// 错误，当ts不能判断变量类型时，之后使用此联合类型中共有的方法
// function getLength(something: string | number): number {
//     return something.length
// }

function getLength(something: string | number): number {
    if ((something as string).length) {
        return (something as string).length
    } else {
        return something.toString().length
    }
}

// 注意：类型断言不是类型转换
// 错误
// function toBoolean(something: string | number): boolean {
//     return something as boolean
// }

