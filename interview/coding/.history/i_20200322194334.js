function DistanceToHigher(height) {
    let count = 0
    const result = [0]
    for (let i = 1; i < height.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (height[j] > height[i]) {
                result.push(i - j)
                break
            }
            if (j === 0) {
                result.push(0)
            }
        }
    }
    return result
}

console.log(DistanceToHigher([175, 179, 174, 163, 176, 177]))


function test(str) {
    const content = str.split('\n')
    const num = Number(content[0])

    function fib(n, a1 = 1, a2 = 1) {
        if (n <= 2) {
            return a2
        } else {
            return fib(n - 1, a2, a2 + a1)
        }
    }
    return fib(num + 1)
}

console.log(test('1 22 54 123\n'))