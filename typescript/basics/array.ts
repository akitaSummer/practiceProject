let fibonacci1: number[] = [1, 1, 2, 3, 5]

let fibonacci2: Array<number> = [1, 1, 2, 3, 5]

interface NumberArray {
    [index: number]: number
}

let fibonacci3: NumberArray = [1, 1, 2, 3, 5]

function sum1(): void {
    let args: {
        length: number
        callee: Function
        [index: number]: number
    } = arguments
}

interface IArguments {
    length: number,
    callee: Function,
    [index: number]: number
}

function sum2(): void {
    let arg = arguments
}

let list: any[] = ['123', 123, true]