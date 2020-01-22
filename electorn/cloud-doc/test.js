const QiniuManger = require('./src/utils/QiniuManager')
const path = require('path')

const accessKey = 'aU74dpet_GMv4sqE4HZWwmqI6Cod8VtHti5-4bQc';
const secretKey = 'kpcNntr5r54AfpnRNRjKDE2TrmojwtYeQRLiPMf_';
const localFile = "C:\\Users\\HASEE\\Documents\\1234.md"
const key = '123.md'
const manager = new QiniuManger(accessKey, secretKey, 'akita-cloud-doc')
const downFilePath = path.join(__dirname, key)

// manager.uploadFile(key, localFile).then( data => {
//   console.log(data)
//   return manager.deleteFile(key)
// }).then(data => {
//   console.log(data)
// })
// manager.deleteFile(key)
// manager.generateDownloadLink(key).then((url) => {
//   console.log(url)
//   return manager.generateDownloadLink(key)
// }).then(url => console.log(url))

manager.downloadFile(key, downFilePath)
