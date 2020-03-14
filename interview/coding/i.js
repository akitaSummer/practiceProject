function test(arr) {
    const result = []
    const testArr = arr[1].split(' ').map(item => {
        return Number(item)
    })
    const zeroQ = testArr.reduce((pre, item) => {
        return pre * item
    }, 1)
    result.push(mod(zeroQ))
    let oneQ = []
    for (let i = 0; i < testArr.length; i++) {
        const te = [...testArr]
        te[i] = te[i] / (te[i] - 1)
        let teR = testArr.reduce((pre, item) => {
            return pre * item
        }, 1)
        oneQ.push(1 / (teR))
    }
    oneQ = 1 / (oneQ.reduce((pre, item) => {
        return pre + item
    }, 0))
    result.push(mod(oneQ))
    let twoQ = []
    for (let i = 0; i < testArr.length; i++) {
        for (let j = i + 1; j < testArr.length; j++) {
            const te = [...testArr]
            te[i] = te[i] / (te[i] - 1)
            te[j] = te[j] / (te[j] - 1)
            let teR = testArr.reduce((pre, item) => {
                return pre * item
            }, 1)
            twoQ.push(1 / (teR))
        }
    }
    twoQ = 1 / (twoQ.reduce((pre, item) => {
        return pre + item
    }, 0))
    result.push(mod(twoQ))
    console.log(result)
}

function mod(num) {
    if (num === 1) {
        return 1
    }
    return Math.floor((998244353 - 998244353 / num) * mod(998244353 % num) % 998244353) + 1
}
test(['2', '2 2'])