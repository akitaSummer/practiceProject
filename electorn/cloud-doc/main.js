const { app, Menu, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
const AppWindow = require('./src/AppWindow')
const path = require('path')
const Store = require('electron-store')
const QiniuManager = require('./src/utils/QiniuManager')
const qiniuConfigArr = ['#accessKey', '#secretKey', "#bucketName"]
const settingsStore = new Store({ name: 'settings' })
const fileStore = new Store({ name: 'Files Data' })

const qiniuIsConfiged = qiniuConfigArr.every(item => !!settingsStore.get(item))
const createManager = () => {
  const accessKey = settingsStore.get('#accessKey')
  const secretKey = settingsStore.get('#secretKey')
  const bucketName = settingsStore.get('#bucketName')
  return new QiniuManager(accessKey, secretKey, bucketName)
}

app.on('ready', () => {
  const urlLocation = isDev ? 'http://localhost:3000' : `path://${path.join(__dirname, './index.html')}`
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
      mainWindow.webContents.send('active-file-uploaded')
    }).catch(() => {
      dialog.showErrorBox('同步失败', '请检查七牛云参数是否正确')
    })
  })

  ipcMain.on('download-file', (event, data) => {
    const manager = createManager()
    const filesObj = fileStore.get('files')
    const { key, path, id } = data
    manager.getStat(data.key).then((resp) => {
      const serverUpdatedTime = Math.round(resp.putTime / 10000)
      const localUpdatedTime = filesObj[id].updatedAt
      if (serverUpdatedTime > localUpdatedTime || !localUpdatedTime) {
        manager.downloadFile(key, path).then(() => {
          mainWindow.webContents.send('file-downloaded', { status: 'no-file' , id })
        })
      } else {
        mainWindow.webContents.send('file-downloaded', { status: 'no-new-file' , id })
      }
    }, (err) => {
      if (err.statusCode === 612) {
        mainWindow.webContents.send('file-downloaded', { status: 'no-file', id })
      }
    })
  })
  ipcMain.on('upload-all-to-qiniu', () => {
    mainWindow.webContents.send('loading-status', true)
    const filesObj = fileStore.get('files') || {}
    const manager = createManager()
    const uploadPromiseArr = Object.keys(filesObj).map(key => {
      const file = filesObj[key]
      return manager.uploadFile(`${file.title}.md`, file.path)
    })
    Promise.all(uploadPromiseArr).then(result => {
      dialog.showMessageBox({
        type: 'info',
        title: `成功上传了${result.length}个文件`,
        message: `成功上传了${result.length}个文件`
      })
      mainWindow.webContents.send('files-uploaded')
    }).catch(() => {
      dialog.showErrorBox('同步失败', '请检查七牛云参数是否正确')
    }).finally(() => {
      mainWindow.webContents.send('loading-status', false)
    })
  })
})
