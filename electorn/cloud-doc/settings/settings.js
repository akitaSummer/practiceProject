const { remote } = require('electron')
const Store = require('electron-store')

const $ = (id) => {
  return document.getElementById(id)
}

const settingsStore = new Store({ name: 'settings' })

document.addEventListener('DOMContentLoaded', () => {
  let saveLocation = settingsStore.get('saveLocation') || ''
  $('saved-file-location').value = saveLocation
  $('select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      title: '选择文件的储存路径',
      properties: ['openDirectory'],
    }).then(({ canceled, filePaths }) => {
      if (!canceled) {
        $('saved-file-location').value = filePaths[0]
        saveLocation = filePaths[0]
      }
    })
  })
  $('btn1').addEventListener('click', (e) => {
    console.log(10)
    settingsStore.set('saveLocation', saveLocation)
    remote.getCurrentWindow().close()
  })
})
