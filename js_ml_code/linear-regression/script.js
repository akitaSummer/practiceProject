import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = async() => {
    const xs = [1, 2, 3, 4]
    const ys = [1, 3, 5, 7]

    tfvis.render.scatterplot({ name: 'linear-regression-inputs' }, {
        values: xs.map((x, i) => {
            return {
                x,
                y: ys[i]
            }
        })
    }, {
        xAxisDomain: [0, 5],
        yAxisDomain: [0, 8]
    })

    const model = tf.sequential()
    model.add(tf.layers.dense({
        units: 1, // 设置神经元
        inputShape: [1] // 设置输入层
    }))
    model.compile({
        //设置损失函数
        loss: tf.losses.meanSquaredError, // 使用均方误差，适用于线性
        // 设置优化器
        optimizer: tf.train.sgd(0.1) // 随机梯度下降
    })

    const inputs = tf.tensor(xs)
    const labels = tf.tensor(ys)
    await model.fit(inputs, labels, {
        batchSize: 4, // 输入数据
        epochs: 100, // 整体迭代次数，
        callbacks: tfvis.show.fitCallbacks({
            name: 'padding'
        }, ['loss'])
    })

    const testInputs = [5, 29, 394, 545]

    const output = model.predict(tf.tensor(testInputs))
        // 使用dataSync获取结果，返回为数组
    const outputArr = output.dataSync()
    tfvis.render.scatterplot({ name: 'linear-regression-result' }, {
        values: testInputs.map((x, i) => {
            return {
                x,
                y: outputArr[i]
            }
        })
    }, {
        xAxisDomain: [0, 600],
        yAxisDomain: [0, 1300]
    })
}