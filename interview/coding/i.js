function computed(str) {
    const line = str.split('\n')
    const people = line[1].split(' ')
    const group = line.slice(3).map(item => {
        return item.split(' ')
    })
    let allPromise = []
    for (let i = 0; i < group.length; i++) {
        const first = group[i][0] - 1
        const last = group[i][1] - 1
        const num = group[i][2]
        const okPeople = people.slice(first, last + 1)
        allPromise[i] = new Promise((resolve, reject) => {
            setTimeout(() => {
                const count = okPeople.reduce((pre, item) => {
                    if (item === num) {
                        return pre + 1
                    } else {
                        return pre
                    }
                }, 0)
                resolve(count)
            }, 0)
        })
    }
    console.log(allPromise)
    Promise.all(allPromise).then((value) => {
        let result = value.join('\n')
        console.log(result)
    })
}

computed(`5
1 2 3 3 5
3
1 2 1
2 4 5
3 5 3`)