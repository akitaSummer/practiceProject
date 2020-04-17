const xs = [1, 2, 3, 4, 5]

// 纯的
xs.slice(0, 3) // => [1, 2, 3]
xs.slice(0, 3) // => [1, 2, 3]
xs.slice(0, 3) // => [1, 2, 3]


// 不纯的
xs.splice(0, 3) // => [1, 2, 3]
xs.splice(0, 3) // => [4, 5]
xs.splice(0, 3) // => []

function memoize(func) {
    const cache = {}
    return function() {
        const arg_str = JSON.stringify(arguments)
        cache[arg_str] = cache[arg_str] || func.apply(f, argument)
        return cache[arg_str]
    }
}

const squareNumber = memoize(function(x) { return x * x })

squareNumber(4) // 16

squareNumber(4) // 缓存中的16

// 延迟方法转化不纯函数

// const pureHttpCall = memoize(function(url, params) {
//     return function () { return $.getJSON(url, params) }
// })

// 强迫注入
// 命令型编程中的方法和过程深深地根植与他们的环境，而纯函数与环境无关，可以在任何地方运行
// 不纯
// const signUp = function (attrs) {
//     const user = save(attrs)
// }

// const save = function (attrs) {
//     const user = Db.save(attrs)
// }

// 纯
// const signUp = function (Db, attrs) {
//     const user = save(Db, attrs)
// }

// const save = function (Db, attrs) {
//     const user = Db.save(attrs)
// }