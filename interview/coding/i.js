Promise.myAll = function(arr) {
    return new Promise((resolve, reject) => {
        try {
            const result = []
            arr.forEach(item => {
                item.then((res) => {
                    result.push(res)
                    if (result.length === arr.length) {
                        resolve(result)
                    }
                })
            })
        } catch (err) {
            reject(err)
        }

    })
}

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 500)
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 300)
})

Promise.myAll([promise1, promise2]).then(item => console.log(item))