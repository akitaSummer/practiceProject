const _new = function() {
    const Constructor = Array.shift.arguments[0]

    const F = function() {}
    F.prototype = Constructor.prototype
    const obj = new F()

    const res = Constructor.apply(obj, arguments)

    return typeof res === 'Object' ? res : obj
}