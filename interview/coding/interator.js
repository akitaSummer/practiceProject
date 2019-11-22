// 深度遍历
function interator_1(node) {
    console.log(node)
    if (node.children.length) {
        for (let i = 0; i < node.children.length; i++) {
            interator_1(node.children[i])
        }
    }
}

// 广度遍历
function interator_2(node) {
    const arr = []
    arr.push(node)
    while (arr.length > 0) {
        node = arr.shift()
        console.log(node)
        if (node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                arr.push(node.children.length[i])
            }
        }
    }
}