// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
// 错误
// interface Person {
//     name: string
//     age?: number
//     [propName: string]: string
// }

interface Person {
    readonly id: number // 只读属性: 只能在创建的时候被赋值
    name: string
    age?: number
    [propName: string]: string | number
}

let tom: Person = {
    id: 5748694,
    name: 'tom',
    age: 25,
    gender: 'male'
}