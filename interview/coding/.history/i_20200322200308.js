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
    const tels = content[0].split(',').map(item => item.slice(3))
    const big8 = []
    const big7 = []
    const big6 = []
    const big5 = []
    const big4 = []
    const big3 = []
    const small8 = []
    const small7 = []
    const small6 = []
    const small5 = []
    const small4 = []
    const small3 = []
    for (let i = 0; i < tels.length; i++) {
        const tel = tels[i].split('')
        let flag = -1
        for (let j = 0; j < tel.length; j++) {
            if (j === 0) {
                flag = tel[j]
            } else if (j === 7 && flag === tel[j]) {
                big8.push(tels[i])
            } else if (flag !== tel[j]) {
                break
            }
        }
        for (let j = 0; j < tel.length - 7; j++) {
            for (let h = j; h < j + 7; h++) {
                if (h === j) {
                    flag = tel[h]
                } else if (h === j + 6 && flag === tel[h]) {
                    console.log(flag, tel[h])
                    big7.push(tels[i])
                } else if (flag !== tel[h]) {
                    break
                }
            }
        }
        for (let j = 0; j < tel.length - 6; j++) {
            for (let h = j; h < j + 6; h++) {
                if (h === j) {
                    flag = tel[j]
                } else if (h === j + 5 && flag === tel[j]) {
                    big6.push(tels[i])
                } else if (flag !== tel[j]) {
                    break
                }
            }
        }
        for (let j = 0; j < tel.length - 5; j++) {
            for (let h = j; h < j + 5; h++) {
                if (h === j) {
                    flag = tel[j]
                } else if (h === j + 4 && flag === tel[j]) {
                    big5.push(tels[i])
                } else if (flag !== tel[j]) {
                    break
                }
            }
        }
        for (let j = 0; j < tel.length - 4; j++) {
            for (let h = j; h < j + 4; h++) {
                if (h === j) {
                    flag = tel[j]
                } else if (h === j + 3 && flag === tel[j]) {
                    big4.push(tels[i])
                } else if (flag !== tel[j]) {
                    break
                }
            }
        }
        for (let j = 0; j < tel.length - 3; j++) {
            for (let h = j; h < j + 3; h++) {
                if (h === j) {
                    flag = tel[j]
                } else if (h === j + 2 && flag === tel[j]) {
                    big3.push(tels[i])
                    break
                } else if (flag !== tel[j]) {
                    break
                }
            }
        }
    }
    console.log(big7)
}

console.log(test('15112347234,15176313245,15176313346,15176313325,15166667234,15188847234\n'))