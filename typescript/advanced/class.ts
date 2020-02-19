// public 可以被继承，外部访问到
// protected 可以继承，不能被外部访问到
// private 不可以被继承，不可以被外部访问到
class Animal {
    private name: string
    protected constructor(name: string) { // 构造函数修饰符为protected时，该类只允许被继承
        this.name = name
    }
}

// let a = nea Animal('jack') // 错误

// readonly 表示属性只能被读取
class Animal2 {
    readonly name: string
    constructor(name: string) {
        this.name = name
    }
}

// abstract 抽象类
// 抽象类不允许被实例化
abstract class Animal3 {
    name: string
    constructor(name: string) {
        this.name = name
    }
    // 抽象类中的抽象方法必须被子类实现
    abstract sayHi()
}

let a: Animal2 = new Animal2('Jack')