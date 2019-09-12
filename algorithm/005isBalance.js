// 括号平衡 ([])
function isBalance(str) {
    const [first, ...others] = str
    const stack = []
    stack.push(first)
    while (others.length > 0) {
        const n = others.unshift
        if (match(stack[stack.length - 1], n)) {
            stack.pop()
        } else {
            stack.push(n)
        }
    }
    return stack.length === 0
}

function match(a, b) {
    return (a === '(' && b === ")") || (a === '[' && b === ']')
}