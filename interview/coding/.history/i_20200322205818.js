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
    content[0] = content[0].split(' ')
    const es = content.slice(1, content.length - 1).map(item => item.split(' ')).sort((a, b) => Number(a) - Number(b))
    let small = []
    let big = []
    for (let i = 0; i < es.length; i++) {
        small.push(es[i][0])
        big.push(es[i][es[i].length - 1])
    }
    small = small.sort((a, b) => Number(a) - Number(b))
    big = big.sort((a, b) => Number(a) - Number(b))
    console.log(small, big)
}

console.log(test('2 2 2 1\n2 1\n3 1\n'))