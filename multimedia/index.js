const {app, BrowserWindow, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
let mainWindow;
let secondWindow;
app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'view/primera_pantalla/index.html'),
        protocol: 'file',
        slashes: true
    }));
    mainWindow.on("closed", () => {app.quit();})

    secondWindow = new BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    secondWindow.setPosition(0,-1000);
    secondWindow.setFullScreen(true);
    secondWindow.loadURL(url.format({
        pathname: path.join(__dirname,'view/segunda_pantalla/index.html'),
        protocol: 'file',
        slashes: true
    }));
    secondWindow.on("closed", () => {app.quit();})

    ipcMain.on('pagina', (e, pagina) => {
        secondWindow.webContents.send('pagina',pagina);
    })
    ipcMain.on('valores', (e, valores) => {
        secondWindow.webContents.send('valores',valores);
    })
    ipcMain.on('resultado', (e, resultado) => {
        secondWindow.webContents.send('resultado',resultado);
    })
})