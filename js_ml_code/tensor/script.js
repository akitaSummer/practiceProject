import * as tf from '@tensorflow/tfjs'

// 0纬
const t0 = tf.tensor(1) // 参数决定纬度
t0.print()
console.log(t0)

// 1纬
const t1 = tf.tensor([1, 2]) // 或使用tf.tensor1d
t1.print()
console.log(t1)

// 2纬
const t2 = tf.tensor([
        [1],
        [2]
    ]) // 一纬为[[], []]有两个， 二维为1, 2各为一个
t2.print()
console.log(t2)

// 3纬
const t3 = tf.tensor([
    [
        [1]
    ]
])
t3.print()
console.log(t3)

// 传统for循环
const input = [1, 2, 3, 4]
const w = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [4, 5, 6, 7]
]
const output = [0, 0, 0, 0]

for (let i = 0; i < w.length; i++) {
    for (let j = 0; j < input.length; j++) {
        output[i] += input[j] * w[i][j]
    }
}

console.log(output)

// tensor的for循环
tf.tensor(w).dot(tf.tensor(input)).print()