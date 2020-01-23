const { remote,ipcRenderer } = require('electron')
const Store = require('electron-store')

const qiniuConfigArr = ['#savedFileLocation', '#accessKey', '#secretKey', "#bucketName"]

const $ = (selector) => {
  const result =  document.querySelectorAll(selector)
  return result.length > 1 ? result : result[0]
}

const settingsStore = new Store({ name: 'settings' })

document.addEventListener('DOMContentLoaded', () => {
  qiniuConfigArr.forEach((item) => {
    const value = settingsStore.get(item) || ''
    $(item).value = value
  })
  $('#select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      title: '选择文件的储存路径',
      properties: ['openDirectory'],
    }).then(({ canceled, filePaths }) => {
      if (!canceled) {
        $('#savedFileLocation').value = filePaths[0]
      }
    })
  })
  $('#btn1').addEventListener('click', (e) => {
    e.preventDefault()
    qiniuConfigArr.forEach(item => {
      settingsStore.set(item, $(item).value)
    })
    ipcRenderer.send('config-is-saved')
    remote.getCurrentWindow().close()
  })
  $('.nav-tabs').addEventListener('click', (e) => {
    e.preventDefault()
    $('.nav-link').forEach(node => {
      node.classList.remove('active')
    })
    e.target.classList.add('active')
    $('.config-area').forEach(element => {
      element.style.display = 'none'
    })
    $(e.target.dataset.tab).style.display = 'block'
  })
})
