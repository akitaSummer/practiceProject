function cartesian_product(...Matrix) {
    if (Matrix.length === 0) return []
    if (Matrix.length === 1) return Matrix[0]
    return Matrix.reduce((a, b) => {
        const product = []
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                product.push(
                    Array.isArray(a[i]) ? [...a[i], b[j]] : [a[i], b[j]]
                )
            }
        }
        return product
    })
}