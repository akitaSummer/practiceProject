function createArray<T>(length: number, value: T): Array<T> {
    let result = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length) // 错误
//     return arg
// }

interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length) // 错误
    return arg
}

interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>
}

let createArray2: CreateArrayFunc = function<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number> ()

let createArray3: CreateArrayFunc = function<T = string>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}