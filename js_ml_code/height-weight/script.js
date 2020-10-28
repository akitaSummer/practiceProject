import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = async() => {
    const heights = [150, 160, 170]
    const weights = [40, 50, 60]

    tfvis.render.scatterplot({ name: 'height-weight-input' }, {
        values: heights.map((x, i) => ({ x, y: weights[i] }))
    }, {
        xAxisDomain: [140, 180],
        yAxisDomain: [30, 70]
    })

    // 归一化
    const inputs = tf.tensor(heights).sub(150).div(20)
    const labels = tf.tensor(weights).sub(40).div(20)

    const model = tf.sequential()
    model.add(tf.layers.dense({
        units: 1, // 设置神经元
        inputShape: [1] // 设置输入层
    }))
    model.compile({
        //设置损失函数
        loss: tf.losses.meanSquaredError, // 使用均方误差
        // 设置优化器
        optimizer: tf.train.sgd(0.1) // 随机梯度下降
    })

    await model.fit(inputs, labels, {
        batchSize: 3, // 输入数据
        epochs: 200, // 整体迭代次数，
        callbacks: tfvis.show.fitCallbacks({
            name: 'padding'
        }, ['loss'])
    })

    const testInputs = [140, 180, 190]

    const output = model.predict(tf.tensor(testInputs).sub(150).div(20))
        // 反归一化
    const outputArr = output.mul(20).add(40).dataSync()
    tfvis.render.scatterplot({ name: 'height-weight-result' }, {
        values: testInputs.map((x, i) => {
            return {
                x,
                y: outputArr[i]
            }
        })
    }, {
        xAxisDomain: [130, 200],
        yAxisDomain: [0, 100]
    })
}