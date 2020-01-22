const { app, Menu, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
const AppWindow = require('./src/AppWindow')
const path = require('path')

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
    settingsWindow.on('closed', () => {
      settingsWindow = null
    })
  })
})
