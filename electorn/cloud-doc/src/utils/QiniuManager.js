const qiniu = require('qiniu')
const axios = require('axios')
const fs = require('fs')

class QiniuManager {
  constructor(accessKey, secretKey, bucket) {
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    this.bucket = bucket
    this.config = new qiniu.conf.Config();
    // 空间对应的机房
    this.config.zone = qiniu.zone.Zone_z0;
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
  }

  getBucketDomain() {
    const reqURL = `http://api.qiniu.com/v6/domain/list?tbl=${this.bucket}`
    const digest = qiniu.util.generateAccessToken(this.mac, reqURL)
    return new Promise((resolve, reject) => {
      qiniu.rpc.postWithoutForm(reqURL, digest, this._handleCallback(resolve, reject))
    })
  }

  downloadFile(key, downloadPath) {
    return this.generateDownloadLink(key).then(url => {
      const timestamp = new Date().getTime()
      url = `${url}?timestamp=${timestamp}`
      return axios({
        url,
        method: "GET",
        responseType: 'stream',
        header: { 'Cache-Control': 'no-cache' }
      })
    }).then(response => {
      const writer = fs.createWriteStream(downloadPath)
      response.data.pipe(writer)
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', resolve)
      })
    }).catch(err => {
      return new Promise.reject({ err: err.response })
    })
  }

  generateDownloadLink(key) {
    this.publicBucketDomain = this.publicBucketDomain ? Promise.resolve([this.publicBucketDomain]) : this.getBucketDomain()
    return this.publicBucketDomain.then((arr) => {
      if (Array.isArray(arr) && arr.length > 0) {
        const reg = /^https?/
        const url = reg.test(arr[0]) ? arr[0] : `http://${arr[0]}`
        this.publicBucketDomain = url
        return this.bucketManager.publicDownloadUrl(this.publicBucketDomain, key)
      } else {
        throw Error('域名未找到，请查看储存空间是否过期')
      }
    })
  }

  _handleCallback(resolve, reject) {
    return (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody)
      } else {
        reject({
          statusCode: respInfo.statusCode,
          body: respBody
        })
      }
    }
  }

  uploadFile(key, localFilePath) {
    const options = {
      scope: this.bucket + ':' + key,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken=putPolicy.uploadToken(this.mac);
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, key, localFilePath, putExtra, this._handleCallback(resolve, reject))
    })
  }

  deleteFile(key) {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.bucket, key, this._handleCallback(resolve, reject))
    })
  }

  getStat(key) {
    return new Promise((resolve, reject) => {
      this.bucketManager.stat(this.bucket, key, this._handleCallback(resolve, reject))
    })
  }
}

module.exports = QiniuManager
