const { app, BrowserWindow } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const url = require('url');

let flaskProcess;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged ? path.join(__dirname, './build/preload.js') : path.join(__dirname, './public/preload.js'),
    }
  });

  // const ASSETS_PATH = app.isPackaged ?
  //   path.join(process.resourcesPath, 'assets') : "../../assets";

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:3000';

  console.log(`Loading app: ${appURL}`);

  setTimeout(() => {
    win.loadURL(appURL).catch((err) => {
      console.error('Failed to load app:', err);
    });
  
  }, 2000);

  // Open the DevTools if needed
  win.webContents.openDevTools();
}

function startFlaskApp() {
  // const flaskPath = app.isPackaged ? path.join(__dirname, './build/resources/app') : path.join(__dirname, 'resources', 'app');
  const flaskPath = path.join(__dirname, './resources/app');
  flaskProcess = execFile(flaskPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Flask app: ${error.message}`);
      return;
    }
    console.log(`Flask app output: ${stdout}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  startFlaskApp();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

function killPython() {
  const kill = require("tree-kill");
  kill(flaskProcess.pid);
}

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (flaskProcess) {
    killPython()
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (flaskProcess) {
    killPython();
  }
});

// export default ASSETS_PATH;