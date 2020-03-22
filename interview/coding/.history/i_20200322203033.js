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
}

console.log(test('14612244221,14612544221,14612644221\n'))