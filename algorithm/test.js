function createTask(ms) {
    return () => {
        console.log('start', ms);
        return new Promise(r => setTimeout(() => {
            console.log('end', ms);
            r(ms);
        }, ms));
    }
}
const tasks = Array(3).fill(null).map((_, i) => createTask(i * 1000));

async function limitRunTask(arr, num) {
    const all = []
    const result = []
    while (arr.length > 0) {
        const children = arr.splice(0, num)
        all.push(children)
    }

    const res = await new Promise(resolve2 => {
        async function limitPromise(all) {
            if (all.length <= 0) {
                const res = await Promise.all(result)
                resolve2(res)
                return
            } else {
                new Promise(async resolve => {
                    const tasks = all.shift()
                    const res = await Promise.all(tasks.map(task => task()))
                    result.push(res)
                    resolve()
                }).then(() => limitPromise(all))
            }
        }
        limitPromise(all)
    })

    return res


}
limitRunTask(tasks, 1).then(console.log)