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
    console.log(content)
    const nums = content[0].map(item => Number(item))
    let te = [null, nums[0]]
    const result = []
    for (let i = 1; i < nums.length; i++) {
        if (i === 1) {
            if (te[1] > nums[i]) {
                result.push(i)
                te = [num[i], nums[0]]
            } else {
                te = [num[0], nums[i]]
            }
        } else {
            if (te[1] > nums[i] && te[0] <= nums[i]) {
                result.push(i)
                te = [num[i], te[1]]
            } else if (te[1] <= nums[i]) {
                te = [te[1], num[i]]
            } else {
                continue
            }
        }
    }
    console.log(result)
}

console.log(test('1 22 22 33 22 12 45 44 5\n'))