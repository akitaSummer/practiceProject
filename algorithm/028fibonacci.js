function fibonacci(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) return ac2
    return fibonacci(n - 1, ac2, ac1 + ac2)
}