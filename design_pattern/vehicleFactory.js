const vehicleFactory = (subType, superType) => {
    if (typeof vehicleFactory[superType] === 'function') {
        function F() {}
        F.prototype = new vehicleFactory[superType]()
        F.prototype.constructor = subType
        subType.prototype = new F()
    } else {
        throw new Error('未创建抽象类')
    }
}

vehicleFactory.Car = function(type) {
    this.type = 'car'
}

vehicleFactory.prototype = {
    getPrice() {
        return new Error('抽象方法不能用')
    },
    getSpeed() {
        return new Error('抽象方法不能用')
    }
}