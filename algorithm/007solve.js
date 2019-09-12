function solve(arr, N) {
    const s = new Set([arr.shift() % N])
    while (arr.length > 0) {
        const ak = arr.pop()
        s.add(ak % N)
        s.forEach(t => s.add((t + ak) % N))
    }
    return s.has(0)
}