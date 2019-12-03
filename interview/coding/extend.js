// 原型链继承
function Parent_1() {
    this.name = 'parent'
    this.children = ['A', 'B', 'C']
}
Parent_1.prototype.getName = function () {
    console.log(this.name)
}
function Child_1() {

}
Child_1.prototype = new Parent_1()
Child_1.prototype.constructor = Child_1

// 构造函数继承
function Parent_2(age) {
    this.name = 'parent'
    this.age = age
    this.getName = function() {
        return this.name
    }
    this.getAge = function() {
        return this.age
    }
}
function Child_2(age) {
    Parent_1.call(this, age)
}

// 组合继承
function Parent_3(name) {
    this.name = name
    this.age = 18
}
Parent_3.prototype.getName = function() {
    console.log(this.name)
}
function Child_3(name) {
    Parent_3.call(this, name)
}
Child_3.prototype = new Parent_3()
Child_3.prototype.constructor = Child_3

// 原型式继承
function createObj(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

// 寄生式继承
function subobject(ogj) {
    const sub = createObj(obj)
    sub.name = 'sub'
    return sub
}

// 寄生组合式继承
function object(obj) {
    function F() {}
    F.prototype = obj.prototype
    return new F()
}
function prototype(child, parent) {
    const prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
