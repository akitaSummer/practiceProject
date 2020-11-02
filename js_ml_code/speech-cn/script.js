import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import * as speechCommands from '@tensorflow-models/speech-commands'

const MODEL_PATH = 'http://127.0.0.1:8080/speech'
let transferRecognizer

window.onload = async() => {
    const recognizer = speechCommands.create(
        'BROWSER_FFT', // 选择浏览器原生自带傅里叶变换
        null, // 识别的单词
        MODEL_PATH + '/model.json', // 自定义模型url
        MODEL_PATH + '/metadata.json' // 自定义源信息
    )

    await recognizer.ensureModelLoaded()
    transferRecognizer = recognizer.createTransfer('test')
}

window.collect = async(btn) => {
    btn.disabled = true;
    const label = btn.innerText
    await transferRecognizer.collectExample( // 收集声音
        label === '背景噪音' ? '_background_noise_' : label
    )
    btn.disabled = false
    document.querySelector('.count').innerHTML = JSON.stringify(transferRecognizer.countExamples(), null, 2)
}

window.train = async() => {
    await transferRecognizer.train({
        epochs: 30,
        callback: tfvis.show.fitCallbacks({ name: 'result' }, ['loss', 'acc'], { callbacks: ['onEpochEnd'] })
    })
}

window.toggle = async(checked) => {
    if (checked) {
        await transferRecognizer.listen(result => {
            const { scores } = result
            const labels = transferRecognizer.wordLabels()
            const index = scores.indexOf(Math.max(...scores))

        }, {
            overlapFactor: 0, // 识别评论
            probabilityThreshold: 0.5
        })
    } else {
        transferRecognizer.stopListening()
    }
}

window.save = () => {
    const arrayBuffer = transferRecognizer.serializeExamples()
    const blob = new Blob([arrayBuffer])
    const link = document.createElement('a')
    link.herf = window.URL.createObjectURL(blob)
    link.download = 'data.bin'
    link.click()
}