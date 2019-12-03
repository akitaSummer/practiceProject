function superType(name) {
    this.name = name
    this.color = ['green', 'blue']
}
superType.prototype.getName = function() {
    console.log(this.name)
}

function subType(name, age) {
    superType.call(this, name)
    this.age = age
}

function object(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

function prototype(child, parent) {
    const prototype = object(parent.prototype)
    child.prototype = prototype
    child.prototype.constructor = child
}
prototype(subType, superType)