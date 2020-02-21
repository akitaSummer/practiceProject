console.log('hello')

let str: string = 'hello'

function getData(): any {}

// vscode自动编译
// 第一步: cmd --> tsc --init 生成tsconfig.json文件, 将文件中的"outer": "./js"生效
// 第二部: Terminal 下的 Run Task 选择 tsc.watch

// typescript中的数据类型
// boolean
// string
// number
// array
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
// symbol
// null
// undefined
// let num: number
// console.log(num) // 报错

let num: number | undefined
console.log(num)

// 元组类型 tuple
let arr3: [string, number] = ['1', 2]
// 枚举类型 enum 只能用string和number且且定义一个类型后，剩余类型均为相同类型
enum Flag {
    success,
    err = 3,
}

let enum1: Flag = Flag.err
// 任意类型 any 
let any: any = 1234
any = 'str'

const oBox: any = document.getElementById('box')
oBox.style.color = 'red'
// void
function run(): void {
    console.log('run')
}
// never

let a: never

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}


// 函数
// 1. 函数的定义
function run1(): string {
    return '123'
}

let fun2 = function(): number {
    return 123
}

function getInfo1(name: string, age: number): string {
    return name + age
}
// 2. 可选参数
// es5中形参和实参可以不一样，在ts中必须一样，否则需要配置可选参数
function getInfo2(name: string, age?: number): string {
    if (age) {
        return name + age
    } else {
        return name
    }
}
getInfo2('tom') // age没有?会报错
// 注意：可选参数必须配置到参数的最后
// 3. 默认参数
function getInfo3(name: string, age: number = 20): string {
    return name + age
}
// 4. 剩余参数
function sum(a: number, ...result: number[]): number {
    result.push(a)
    return result.reduce((pre: number, i: number): number => {
        return pre + i
    }, 0)
}
// 5. 函数重载
// java中方法的重载：重载是指两个或者两个以上的同名函数，但是他们的参数不一样，这时会出现函数重载的现象
// typescript中的重载：通过为同一个函数提供多个函数类型定义来实现多种不同的功能
function getInfo4(name: string): string 
function getInfo4(age: number): number
function getInfo4(str: any): any {
    if (typeof str === 'string') {
        return str
    } else {
        return str
    }
}
console.log(getInfo4('tom'))
console.log(getInfo4(24))
// console.log(getInfo4(true)) //  错误

function getInfo5(name: string): string
function getInfo5(name: string, age: number): string
function getInfo5(name: any, age?: any): any {
    if (age) {
        return name + age
    } else {
        return name
    }
}

// 6. 箭头函数


// 1. 类的创建

class Person{

    name: string

    constructor(name: string) {
        this.name = name
    }

    run(): void {
        console.log(this.name)
    }

    getName(): string {
        return this.name
    }

    setName(name: string): void {
        this.name = name
    }
}

// 2. 类的继承
class Student extends Person {
    constructor(name: string) {
        super(name)
    }

    work(): void {
        console.log('work')
    }
}

// 3. 修饰符
// public 公有: 类，子类和外部都可以访问，不加修饰符为公有
// private 私有：类可以访问，子类和外部不可以访问
// protected 保护: 类和子类都可以访问，外部不可以访问

class Teacher extends Person {

    private age: number = 25

    protected sex: string

    constructor(name: string, sex: string) {
        super(name)
        this.sex = sex
    }

    work(): void {
        console.log('work')
    }
}

class Person1 {
    static sex: string = 'man'
    static print(): void { // 静态方法不能调用实例的属性
        console.log(Person1.sex)
    }
}

// 多态：父类定义一个方法不去实现，让继承他的子类趋势线，每一个子类都有不同的实现

interface Animal {
    eat(): void
}

class Dog implements Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    eat(): void {
        console.log('wang')
    }
}

// abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包括具体实现并且不许在派生类中实现
abstract class Animal1 {
    abstract eat: () => any
}

class Cat extends Animal1 {
    // 抽象类的子类必须实现抽象方法
    eat = function(): void {
        console.log('miao')
    }
}

// 接口：定义了某一批类所需要遵守的规范，接口不关心内部状态数据，也不关心类里方法的具体实现，只规定必须提供某些方法
// 1. 属性接口

interface FullName {
    firstName: string
    secondName: string
}

function printName(name: FullName) {
    console.log(name.firstName + name.secondName)
}

// printName({
//     age: 20, // 报错
//     firstName: '张',
//     sencondName: '三'
// })

let obj = {
    age: 20,
    firstName: '张',
    secondName: '三'
}
printName(obj)

// 2.可选属性
interface FullName2 {
    firstName: string,
    secondName: string,
    age?: number
}

interface Config{
    type: string,
    url: string,
    data?: string,
    dataType: string
}

function ajax(config: Config) {
    const xhr = new XMLHttpRequest()
    xhr.open(config.type, config.url, true)
    xhr.send(config.data)
    xhr.onreadystatechange = function(): void {
        if (xhr.readyState === 4 && xhr.status == 200) {
            console.log('success')
            if (config.dataType === 'json') {
                JSON.parse(xhr.responseText)
            } else {
                console.log(xhr.responseText)
            }
        }
    }
}

// 3.函数类型接口
// 对方法传入的参数以及返回值进行约束

// 加密函数接口类型
interface encrypt {
    (key: string, value: string): string
}

const md5: encrypt = function(key: string, value: string): string {
    return key + value
}

// 4. 可索引接口: 数组，对象的约束
interface UserArr {
    [index: number]: string
}

let arr: UserArr = ['aaa', 'bbb']

interface UserObj {
    [index: string]: string
}

let obj4: UserObj = {name: '20'}

// 5. 类类型接口：对类的约束
interface Animal4 {
    name: string
    eat(str: string): void
}

class Dog1 implements Animal4 {
    name: string
    constructor(name: string) {
        this.name = name
    }
    eat() {
        console.log('eat')
    }
}

// 接口扩展：接口可以继承接口
interface Person4 extends Animal4 {
    work(): void;
}

class Web1 implements Person4 {
    public name: string
    constructor(name: string) {
        this.name = name
    }
    eat() {
        console.log('eat')
    }
    work() {
        console.log('code')
    }
}

// 泛型：解决类，方法，接口的复用性，以及对不特定数据类型的支持

function getData2<T>(value: T): T {
    return value
}

getData2<number>(1234)

class MinClass<T> {
    public list: T[] = []
    add(number: T) {
        this.list.push(number)
    }
}

let m1: MinClass<number> = new MinClass<number>()

interface ConfigFn<T> {
    (value1: T, value2: T): T
}

let getDate3: ConfigFn<number> = function (value1: number, value2: number): number {
    return value1 + value2
}

interface DBI<T> {
    add(info: T): boolean
    update(info: T, id: number): boolean
    delate(id: number): boolean
    get(id: number): any[]
}

class MysqlDB<T> implements DBI<T> {
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delate(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }
}

class MsSqlDB<T> implements DBI<T> {
    add(info: T): boolean {
        throw new Error("Method not implemented.")
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delate(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }
}

class User{
    username: string | undefined
    password: string | undefined
}

const u = new User()
u.username = '张三'
u.password = '1234'

const oMysql: MysqlDB<User> = new MysqlDB<User>()
oMysql.add(u)

import getData6 from './modules/db'

getData6()

namespace A {
    export const dog = 'wang'
}

console.log(A.dog)

// 装饰器：一种特殊类型的声明，能附加到类声明，方法，属性或参数上，可以使修改类的行为
// 1. 类装饰器

// 普通装饰器
function logClass(params: any) {
    console.log(params)
    // params 当前类
    params.prototype.apiUrl = 'xxx'
    params.prototype.run = function() {}
}

@logClass
class HttpClient {
    constructor() {}
}

// 装饰器工厂（可传参）
function logClass2(params: string) {
    return function(target: any) {
        console.log(target)
    }
}

@logClass2('hello')
class HttpClient2 {
    constructor() {}
}

// 重构构造函数
function logClass3(target: any) {
    return class extends target {
        apiUrl: any = 'hello'
    }
}

@logClass3
class HttpClient3 {
    public apiUrl: string | undefined
    constructor() {}
}

// 2. 属性装饰器
function logClass4(params: any) {
    return function(target: any, attr: any) {
        // target: 对象
        // attr: 属性名称
        target[attr] = params
    }
}

class HttpClient4 {
    @logClass4('hello')
    public url: any | undefined
    constructor() {}
}

// 3. 方法装饰器
function logMethod(params: any) {
    return function(target: any, methodName: any, desc: any) {
        // target: 类的构造函数
        // methodName: 成员的名字
        // desc：成员属性描述
        target.run = function() {}
        // 修改装饰器的方法
        // 1. 保存当前方法
        let oMethod = desc.value
        desc.value = function(...arg: any[]) {
            arg = arg.map((value) => {
                return String(value)
            })
            oMethod.apply(this, arg)
        }
    }
}

class HttpClient5 {
    constructor() {}
    @logMethod('hello')
    getData() {}
}
// 4. 方法参数装饰器
// 参数装饰器表达式会在运行时当做函数被调用，可以使用参数装饰器为类的原型添加一些元素数据
function logParams(params: any) {
    return function(target: any, methodName: any, paramsIndex: any) {
        // target: 当前原型对象
        // methodName: 函数名称
        // paramsIndex: 参数下标
    }
}

class HttpClient6 {
    constructor() {}
    getData(@logParams('uuid') uuid: any) {}
}

// 执行顺序：属性装饰器，方法装饰器，方法参数装饰器，类装饰器