const arr = [1, 2, 3, 4, 5, 6, 7]

console.log(arr.splice(2, 2, 'x'))

console.log(arr)

arr.splice(2, 1)
arr.splice(2, 0, 'y')
console.log(arr)