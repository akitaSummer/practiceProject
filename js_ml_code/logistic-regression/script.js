import * as tf from '@tensorflow/tfjs'
import { Optimizer } from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { getData } from './data'

window.onload = async() => {
    const data = getData(400)

    tfvis.render.scatterplot({
        name: 'logistic-regression-inputs'
    }, {
        values: [ // 使用数组设置输出图样例分组
            data.filter(p => p.label === 1),
            data.filter(p => p.label === 0)
        ]
    })

    const model = tf.sequential()
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [2],
        activation: 'sigmoid' // 设置激活函数
    }))
    model.compile({
        loss: tf.losses.logLoss, // 逻辑回归使用对数损失函数
        optimizer: tf.train.adam(0.1)
    })

    const inputs = tf.tensor(data.map(p => [p.x, p.y]))
    const labels = tf.tensor(data.map(p => p.label))

    await model.fit(inputs, labels, {
        batchSize: 40,
        epochs: 50,
        callbacks: tfvis.show.fitCallbacks({
            name: 'loss'
        }, ['loss'])
    })

    window.predict = (form) => {
        const pred = model.predict(tf.tensor([
            [form.x.value * 1, form.y.value * 1]
        ]))
        document.querySelector('.result').innerHTML = `预测结果为${pred.dataSync()[0]}`
    }
}