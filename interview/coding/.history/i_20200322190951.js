function DistanceToHigher(height) {
    const result = [0]
    let count = 0
    for (let i = 1; i < height.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (height[i] < height[j]) {
                count++
            } else {
                result.push(count)
                count = 0
                break
            }
        }
    }
    console.log(result)
}

console.log(test([175, 173, 174, 163, 182, 177]))