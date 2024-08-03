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
    icon: path.join(__dirname, 'client/assets/brain-background.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'public/preload.js'),
    }
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, 'public/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:3000';

  console.log(`Loading app: ${appUrl}`);

  win.loadURL(appURL).catch((err) => {
    console.error('Failed to load app:', err);
  });

  // Open the DevTools if needed
  win.webContents.openDevTools();
}

function startFlaskApp() {
  const flaskPath = path.join(__dirname, 'resources', 'app');
  flaskProcess = execFile(flaskPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Flask app: ${error.message}`);
      return;
    }
    console.log(`Flask app output: ${stdout}`);
  });
}

app.whenReady().then(() => {
  startFlaskApp();
  createWindow();

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