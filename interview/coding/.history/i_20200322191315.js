function DistanceToHigher(height) {
    let count = 0
    const result = [0]
    for (let i = 1; i < height.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (height[i] < height[j]) {
                count++
            } else if (j === 0) {
                result.push(count)
                count = 0
            } else {
                result.push(count)
                count = 0
                break
            }
        }
        console.log(i, count)
    }
    console.log(result)
}

console.log(DistanceToHigher([175, 173, 174, 163, 182, 177]))