function sort(a) {
    const a = [...a]
    for (let i = 1; i < a.length; i++) {
        const card = a[i]
        let j = i
        while (j > 0 && card < [j - 1]) {
            a[j] = a[j - 1]
            j--
        }
        a[j] = card
    }
    return a
}