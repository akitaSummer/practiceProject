import * as speechCommands from '@tensorflow-models/speech-commands'

const MODEL_PATH = 'http://127.0.0.1:8080/speech'

window.onload = async() => {
    const recognizer = speechCommands.create(
        'BROWSER_FFT', // 选择浏览器原生自带傅里叶变换
        null, // 识别的单词
        MODEL_PATH + '/model.json', // 自定义模型url
        MODEL_PATH + '/metadata.json' // 自定义源信息
    )

    await recognizer.ensureModelLoaded()

    const labels = recognizer.wordLabels().slice(2)
    const resultEl = document.querySelector('.result')
    resultEl.innerHTML = labels.map(label => `<div>${label}</div>`).join('')
    recognizer.listen(result => {
        const { scores } = result
        const maxValue = Math.max(...scores)
        const index = scores.indexOf(maxValue) - 2
        resultEl.innerHTML = labels.map((label, i) => `<div style="background: ${i === index && 'green'}">${label}</div>`).join('')
    }, {
        probabilityThreshold: 0.75, // 设置准确度
        overlapFactor: 0.3, // 设置覆盖率
    })
}