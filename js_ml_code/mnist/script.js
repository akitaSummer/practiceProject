import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { MnistData } from './data.js'

window.onload = async() => {
    const data = new MnistData()
    await data.load()
    const examples = data.nextTestBatch(20)
    const surface = tfvis.visor().surface({ name: 'mnist-inputs' })
    for (let i = 0; i < 20; i++) {
        const imageTensor = tf.tidy(() => examples.xs.slice([i, 0], [1, 784])).reshape([28, 28, 1])
        const canvas = document.createElement('canvas')
        canvas.width = 28
        canvas.height = 28
        canvas.style = 'margin: 4px'
        await tf.browser.toPixels(imageTensor, canvas)
        surface.drawArea.append(canvas)
    }

    const model = tf.sequential()
    model.add(tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 5, // 设置卷积核大小
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling' // 设置卷积核初始方法
    }))
    model.add(tf.layers.maxPool2d({ // 设置池化层
        poolSize: [2, 2],
        strides: [2, 2]
    }))
    model.add(tf.layers.conv2d({
        kernelSize: 5, // 设置卷积核大小
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
    }))
    model.add(tf.layers.maxPool2d({
        poolSize: [2, 2],
        strides: [2, 2]
    }))
    model.add(tf.layers.flatten()) // 多维摊平
    model.add(tf.layers.dense({
        units: 10,
        activation: 'softmax',
        kernelInitializer: 'varianceScaling'
    }))
    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.adam(),
        metrics: 'accuracy'
    })
    const [trainXs, trainYs] = tf.tidy(() => {
        const d = data.nextTestBatch(1000)
        return [
            d.xs.reshape([1000, 28, 28, 1]),
            d.labels
        ]
    })
    const [testXs, testYs] = tf.tidy(() => {
        const d = data.nextTestBatch(200)
        return [
            d.xs.reshape([200, 28, 28, 1]),
            d.labels
        ]
    })

    await model.fit(trainXs, trainYs, {
        validationData: [testXs, testYs],
        epochs: 50,
        callbacks: tfvis.show.fitCallbacks({ name: 'result' }, ['loss', 'val_loss', 'acc', 'val_acc'], { callbacks: ['onEpochEnd'] })
    })

    const canvas = document.querySelector('canvas')

    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = 'rgb(255, 255, 255)'
            ctx.fillRect(e.offsetX, e.offsetY, 25, 25)
        }
    })

    window.clear = () => {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgb(0, 0, 0)'
        ctx.fillRect(0, 0, 300, 300)
    }

    clear()

    window.predict = () => {
        const input = tf.tidy(() => tf.image.resizeBilinear(
            tf.browser.fromPixels(canvas), [28, 28], true
        ).slice([0, 0, 0], [28, 28, 1]).toFloat().div(255).reshape([1, 28, 28, 1]))
        const pred = model.predict(input).argMax(1)
        document.querySelector('.result').innerHTML = `预测结果为${pred.dataSync()[0]}`
    }
}