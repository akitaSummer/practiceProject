let isDone: boolean = false // 正确

// let createdByNewBoolean: boolean = new Boolean(1) // 错误
// new Boolean() 实际返回的是一个对象

let createdByNewBoolean: Boolean = new Boolean(1) // 正确

let createdByBoolean: boolean = Boolean(1) // 正确
// 直接调用Boolean会返回一个boolean类型

let decLiteral: number = 6
let hexLiteral: number = 0xd00d // 十六进制会被编译成十六进制
let binaryLiteral: number = 0b1010 // 二进制会被编译成十进制
let octalLiteral: number = 0o744 // 八进制会被编译成十进制
let notANumber: number = NaN
let infinityNumber: number = Infinity

let myName: string = 'Tom'
let myAge: number = 25
let sentence: string = `Hello, my name is ${myName}, I'll be ${myAge + 1}years old next month.`

// js中没有空值(void)的概念，在ts中，可使用void表示没有任何返回值的函数
function alertName(): void {
    alert('hello')
}

// void类型变量只能被赋值为undefined和null，没有什么意义
let unsable: void = null

let u: undefined = undefined
let n: null = null
// undefined和null类型的的变量可以赋值给任意变量， 因为两者为所有类型的子类型
let num: number = u // 正确
num = n // 正确

// 但是void类型不能赋值给任意变量
// num = unsable // 错误