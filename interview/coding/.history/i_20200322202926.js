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
    const tels = content[0].split(',')
    const telsUse = content[0].split(',').map(item => item.slice(3))
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
    for (let i = 0; i < telsUse.length; i++) {
        const tel = telsUse[i].split('')
        let flag = -1
        let isPush = false
        for (let j = 0; j < tel.length; j++) {
            if (j === 0) {
                flag = tel[j]
            } else if (j === 7 && flag === tel[j]) {
                big8.push(tels[i])
                isPush = true
                break
            } else if (flag !== tel[j]) {
                break
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 7; j++) {
            for (let h = j; h < j + 7; h++) {
                if (h === j) {
                    flag = tel[h]
                } else if (h === j + 6 && flag === tel[h]) {
                    big7.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== tel[h]) {
                    break
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 6; j++) {
            for (let h = j; h < j + 6; h++) {
                if (h === j) {
                    flag = tel[h]
                } else if (h === j + 5 && flag === tel[h]) {
                    big6.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== tel[h]) {
                    break
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 5; j++) {
            for (let h = j; h < j + 5; h++) {
                if (h === j) {
                    flag = tel[h]
                } else if (h === j + 4 && flag === tel[h]) {
                    big5.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== tel[h]) {
                    break
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 4; j++) {
            for (let h = j; h < j + 4; h++) {
                if (h === j) {
                    flag = tel[h]
                } else if (h === j + 3 && flag === tel[h]) {
                    big4.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== tel[h]) {
                    break
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 3; j++) {
            for (let h = j; h < j + 3; h++) {
                if (h === j) {
                    flag = tel[h]
                } else if (h === j + 2 && flag === tel[h]) {
                    big3.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== tel[h]) {
                    break
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length; j++) {
            if (j === 0) {
                flag = Number(tel[j]) + 1
            } else if (j === 7 && flag === tel[j]) {
                small8.push(tels[i])
                isPush = true
                break
            } else if (flag !== Number(tel[j])) {
                break
            } else {
                flag++
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 7; j++) {
            for (let h = j; h < j + 7; h++) {
                if (h === j) {
                    flag = Number(tel[h]) + 1
                } else if (h === j + 6 && flag === Number(tel[h])) {
                    small7.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag++
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 6; j++) {
            for (let h = j; h < j + 6; h++) {
                if (h === j) {
                    flag = Number(tel[h]) + 1
                } else if (h === j + 5 && flag === Number(tel[h])) {
                    small6.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag++
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 5; j++) {
            for (let h = j; h < j + 5; h++) {
                if (h === j) {
                    flag = Number(tel[h]) + 1
                } else if (h === j + 4 && flag === Number(tel[h])) {
                    small5.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag++
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 4; j++) {
            for (let h = j; h < j + 4; h++) {
                if (h === j) {
                    flag = Number(tel[h]) + 1
                } else if (h === j + 3 && flag === Number(tel[h])) {
                    small4.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag++
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 3; j++) {
            for (let h = j; h < j + 3; h++) {
                if (h === j) {
                    flag = Number(tel[h]) + 1
                } else if (h === j + 2 && flag === Number(tel[h])) {
                    small3.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag++
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length; j++) {
            if (j === 0) {
                flag = Number(tel[j]) - 1
            } else if (j === 7 && flag === tel[j]) {
                small8.push(tels[i])
                isPush = true
                break
            } else if (flag !== Number(tel[j])) {
                break
            } else {
                flag--
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 7; j++) {
            for (let h = j; h < j + 7; h++) {
                if (h === j) {
                    flag = Number(tel[h]) - 1
                } else if (h === j + 6 && flag === Number(tel[h])) {
                    small7.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag--
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 6; j++) {
            for (let h = j; h < j + 6; h++) {
                if (h === j) {
                    flag = Number(tel[h]) - 1
                } else if (h === j + 5 && flag === Number(tel[h])) {
                    small6.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag--
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 5; j++) {
            for (let h = j; h < j + 5; h++) {
                if (h === j) {
                    flag = Number(tel[h]) - 1
                } else if (h === j + 4 && flag === Number(tel[h])) {
                    small5.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag--
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 4; j++) {
            for (let h = j; h < j + 4; h++) {
                if (h === j) {
                    flag = Number(tel[h]) - 1
                } else if (h === j + 3 && flag === Number(tel[h])) {
                    small4.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag--
                }
            }
        }
        if (isPush) { continue }
        for (let j = 0; j < tel.length - 3; j++) {
            for (let h = j; h < j + 3; h++) {
                if (h === j) {
                    flag = Number(tel[h]) - 1
                } else if (h === j + 2 && flag === Number(tel[h])) {
                    small3.push(tels[i])
                    isPush = true
                    break
                } else if (flag !== Number(tel[h])) {
                    break
                } else {
                    flag--
                }
            }
        }
        if (isPush) { continue }
    }
    const result = big8.concat(small8, big7, small7, big6, small6, big5, small5, big4, small4, big3, small3)
    return result.length === 0 ? null : result.join(',')
}

console.log(test('15112347234,\n'))