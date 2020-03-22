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
    const tels = content[0].split(',').map(item => item.slice(3, ))
    console.log(tels)

}

console.log(test('15112347234,15176313245,15176313346,15176313325,15166667234,15188847234\n'))