const { app, Menu, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
const AppWindow = require('./src/AppWindow')
const path = require('path')
const Store = require('electron-store')
const QiniuManager = require('./src/utils/QiniuManager')
const qiniuConfigArr = ['#accessKey', '#secretKey', "#bucketName"]
const settingsStore = new Store({ name: 'settings' })

const qiniuIsConfiged = qiniuConfigArr.every(item => !!settingsStore.get(item))
const createManager = () => {
  const accessKey = settingsStore.get('#accessKey')
  const secretKey = settingsStore.get('#secretKey')
  const bucketName = settingsStore.get('#bucketName')
  return new QiniuManager(accessKey, secretKey, bucketName)
}

app.on('ready', () => {
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  let mainWindow = new AppWindow({
    width: 1400,
    height: 1400,
    webPreferences: {
      nodeIntegration: true
    }
  }, urlLocation)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
  ipcMain.on('open-settings-window', () => {
    const settingsFileLocation = `file://${path.join(__dirname, './settings/settings.html')}`
    let settingsWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, settingsFileLocation)
    // settingsWindow.removeMenu()
    settingsWindow.on('closed', () => {
      settingsWindow = null
    })
  })
  ipcMain.on('config-is-saved', () => {
    let qiniuMenu = process.platform === 'darwin' ? menu.items[3]: menu.items[2]
    const switchItems = (toggle) => {
      [1, 2, 3].forEach(number => {
        qiniuMenu.submenu.items[number].enabled = toggle
      })
    }
    if (qiniuIsConfiged) {
      switchItems(true)
    } else {
      switchItems(false)
    }
  })
  ipcMain.on('upload-file', (event, data) => {
    const manager = createManager()
    manager.uploadFile(data.key, data.path).then(data => {
      console.log('上传成功', data)
    }).catch(() => {
      dialog.showErrorBox('同步失败', '请检查七牛云参数是否正确')
    })
  })
})
