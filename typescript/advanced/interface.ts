interface Alarm {
    alert(): any
}

class Door {}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert')
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert')
    }
}

// 一个类可以实现多个接口

interface Light {
    lightOn(): any
    lightOff(): any
    [propName: string]: any
}

class Car2 implements Alarm, Light {
    alert() {
        console.log('Car alert')
    }
    lightOn() {
        console.log('Car light on')
    }
    lightOff() {
        console.log('Car light off')
    }
}

// 接口也可以继承类
class Point {
    x: number
    y: number
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {
    x: 1,
    y: 2,
    z: 3
}

interface Counter {
    (start: number): string
    interval: number
    reset(): void
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number): string {
        return '' + start
    }
    counter.interval = 123
    counter.reset = function(): void {}
    return counter
}