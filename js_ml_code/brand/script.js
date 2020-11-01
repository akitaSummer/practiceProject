import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { getInputs } from './data'
import { img2x, file2img } from './utils'

const MOBILENET_MODEL_PATH = 'http://127.0.0.1:8080/mobilenet/web_model/model.json';
const NUM_CCLASSES = 3
const BRAND_CLASSES = ['android', 'apple', 'window']

window.onload = async() => {
    const { inputs, labels } = await getInputs()
    const surface = tfvis.visor().surface({ name: 'brand-inputs', styles: { height: 250 } })
    inputs.forEach(imgEl => {
        surface.drawArea.appendChild(imgEl)
    })
    const mobilenet = await tf.loadLayersModel(MOBILENET_MODEL_PATH)
        // 截断模型
    mobilenet.summary()
    const layer = mobilenet.getLayer('conv_pw_13_relu')
    const truncatedMobilenet = tf.model({
        inputs: mobilenet.inputs, // 设置输入
        outputs: layer.output // 设置输出
    })
    const model = tf.sequential()
    model.add(tf.layers.flatten({
        inputShape: layer.outputShape.slice(1)
    }))
    model.add(tf.layers.dense({
        units: 10,
        activation: 'relu'
    }))
    model.add(tf.layers.dense({
        units: NUM_CCLASSES,
        activation: 'softmax'
    }))
    model.compile({
            loss: 'categoricalCrossentropy',
            optimizer: tf.train.adam()
        })
        // 先将数据输入给截断模型
    const { xs, ys } = tf.tidy(() => {
        const xs = tf.concat(inputs.map(imgEl => truncatedMobilenet.predict(img2x(imgEl))))
        const ys = tf.tensor(labels)
        return { xs, ys }
    })
    await model.fit(xs, ys, {
        epochs: 20,
        callbacks: tfvis.show.fitCallbacks({ name: 'result' }, ['loss'], { callbacks: ['onEpochEnd'] })
    })

    window.predict = async(file) => {
        const img = await file2img(file);
        document.body.appendChild(img);
        const pred = tf.tidy(() => {
            const entry = img2x(img)
            const input = truncatedMobilenet.predict(entry)
            return model.predict(input)
        })
        const index = pred.argMax(1).dataSync()[0]
        document.querySelector('.result').innerHTML = `预测结果为${BRAND_CLASSES[index]}`
    };
}