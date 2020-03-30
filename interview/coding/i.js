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
    const nums = content[0].split(',').map(item => Number(item))
    let s1 = 0
    let s2 = 0
    let s3 = 0
    for (let i = 0; i < 4; i++) {
        s1 += nums[i]
    }
    for (let i = 3; i < 7; i++) {
        s2 += nums[i]
    }
    for (let i = 6; i < 9; i++) {
        s3 += nums[i]
    }
    s3 += nums[0]
    if ((s1 === s2) && (s2 === s3) && (s3 === s1)) {
        return 'yes'
    } else {
        return 'no'
    }
}

// console.log(test('3,4,8,5,2,6,9,7,1\n'))

let input = ''

while (line = readline()) {
    input += line + '\n'
}
print(test(input))