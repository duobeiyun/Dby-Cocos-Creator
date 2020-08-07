// Basic init
const electron = require('electron')
const {app, BrowserWindow} = electron

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
    const displayWorkAreaSize = electron.screen.getAllDisplays()[0].workArea

    mainWindow = new BrowserWindow({
        width: displayWorkAreaSize.width,
        height: displayWorkAreaSize.height,
        webPreferences:{
            nodeIntegration: true
        }
    })

    mainWindow.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/web-desktop/index.html`)
})
