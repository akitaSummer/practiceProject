import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getIrisData, IRIS_CLASSES } from './data';

window.onload = async() => {
    // 训练集的特征 训练集的标签 测试集的特征 测试集的标签
    const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

    const model = tf.sequential()
    model.add(tf.layers.dense({
        units: 10,
        inputShape: [xTrain.shape[1]],
        activation: 'sigmoid'
    }))
    model.add(tf.layers.dense({
        units: 3, // 输出层结果应该为三个种类的各自概率
        activation: 'softmax' // 多分类使用softmax方法
    }))
    model.compile({
        loss: 'categoricalCrossentropy', // 使用交叉熵混合函数
        optimizer: tf.train.adam(0.1),
        metrics: ['accuracy'] // 设置其他度量，设置准确度accuracy
    })

    await model.fit(xTrain, yTrain, {
        epochs: 100,
        validationData: [xTest, yTest], // 使用验证器
        callbacks: tfvis.show.fitCallbacks({ name: 'result' }, ['loss', 'val_loss', 'acc', 'val_acc'], // 设置度量，val_loss验证集损失度，acc准确度，val_acc验证集准确度
            { callbacks: ['onEpochEnd'] }
        )
    })

    window.predict = async(form) => {
        const pred = await model.predict(tf.tensor([
            [form.a.value * 1, form.b.value * 1, form.c.value * 1, form.d.value * 1]
        ]))
        document.querySelector('.result').innerHTML = `预测结果为${IRIS_CLASSES[pred.argMax(1).dataSync(0)]}`
    }
};