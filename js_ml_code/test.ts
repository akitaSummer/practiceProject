// ['s', 't'] => ['s', 's']/ ['t', 't']

const a = ['s', 't'] as const

type ArrayValues<T> = { [K in keyof T]: Array<T[K]> }[keyof T]

type ResultArray<T> = Exclude<ArrayValues<T>, Function | number>

type testType = ResultArray<string[]>

const test = (strArr: typeof a): ResultArray<typeof a> => {
    return [strArr[0]]
}

test(['s', 't'])