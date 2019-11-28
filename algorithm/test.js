function computed(str) {
    const num = str.split('\n')
    const T = Number.parseInt(num[0])
    const result = []
    let count = 1
    for (let i = 1; i <= T; i++) {
        result[i - 1] = 0
        for (let j = count + 1; j < count + Number.parseInt(num[count]) + 1; j++) {
            console.log(count)
            let num1 = num[j].split(' ')
            result[i - 1] += (num1[2] - num1[0] + 1) * (num1[3] - num1[1] + 1)
            console.log(result)
        }
        count += Number.parseInt(num[count]) + 1
    }
    let string = ''
    for (let i = 0; i < result.length; i++) {
        if (i < result.length - 1) {
            string += result[i] + '\n'
        } else {
            string += result[i]
        }
    }
    return string
}

console.log(computed(`3
2
1 1 2 3
2 2 3 3
2
1 1 3 3
1 1 3 3
2
1 3 2 3
1 3 2 3`))