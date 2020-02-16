function sum1(x: number, y: number): number {
    return x + y
}

// ts的类型定义中，使用 => 来表示函数的定义
let sum2: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y
}

// 也可通过这样，但sum3是通过赋值时推断出类型
let sum3 = function (x: number, y: number): number {
    return x + y
}

// 接口定义函数
let sum4: {
    (x: number, y: number): number
} = function(x: number, y: number) {
    return x + y
}

interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function(source: string, subString: string) {
    return source.search(subString) !== -1
}

// 可选参数必须位于必选参数之后
// 剩余参数必须位于最后，剩余参数是一个数组
function buildName(firstName: string = 'tom', lastName?: string, ...item: string[]): string {
    if (lastName) {
        return firstName + '' + lastName
    } else {
        return firstName
    }
}

// 重载
function reverse(x: string): string
function reverse(x: number): number
function reverse(x: string | number): string | number {
    if (typeof x === 'string') {
        return x.split('').reverse().join('')
    } else {
        return Number(x.toString().split('').reverse().join(''))
    }
}