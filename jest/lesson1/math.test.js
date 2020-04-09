const { add, minus } = require('./math')

// const result = add(3, 7)
// const expected = 10

// if (result !== expected) {
//     throw Error(`3 + 7 应该等于${expected}，而不是${result}`)
// }

function expect(result) {
    return {
        toBe(actual) {
            if (result !== actual) {
                throw new Error(`预期值和实际值不相等，预期${actual}，结果却是${result}`)
            }
        }
    }
}

function test(desc, fn) {
    try {
        fn()
        console.log(`${desc}通过测试`)
    } catch (e) {
        console.log(`${desc}没有通过测试, ${e}`)
    }
}

test('测试加法', () => {
    expect(add(3, 7)).toBe(10)
})