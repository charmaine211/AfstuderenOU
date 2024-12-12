const { app, BrowserWindow } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const url = require('url');
const kill = require('tree-kill');
const os = require('os');

let flaskProcess;


const platform_apps = {
  WINDOWS: 'app_win',
  MAC: 'app_mac_linux',
  LINUX: 'app_mac_linux',
  SUN: '', // Not available yet
  OPENBSD: '', // Not available yet
  ANDROID: '', // Not available yet
  AIX: '', // Not available yet
};

const platformsNames = {
  win32: platform_apps.WINDOWS,
  darwin: platform_apps.MAC,
  linux: platform_apps.LINUX,
  sunos: platform_apps.SUN,
  openbsd: platform_apps.OPENBSD,
  android: platform_apps.ANDROID,
  aix: platform_apps.AIX,
};

const python_app = platformsNames[os.platform()];

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
  const flaskPath = path.join(__dirname, './resources', python_app);
  console.log(`Starting Flask app from: ${flaskPath}`);
  flaskProcess = execFile(flaskPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`starting Flask app: ${error.message}`);
      return;
    }
    console.log(`Flask app output: ${stdout}`);
    if (stderr) {
      console.error(`Flask app error output: ${stderr}`);
    }
  });

  flaskProcess.on('exit', (code) => {
    console.log(`Flask app exited with code ${code}`);
  });

  flaskProcess.on('error', (err) => {
    console.error(`Flask app error: ${err}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  if (app.isPackaged){
    startFlaskApp();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

function killPython() {
  if (flaskProcess) {
    kill(flaskProcess.pid, 'SIGTERM', (err) => {
      if (err) {
        console.error(`Failed to kill Flask app: ${err}`);
      } else {
        console.log('Flask app terminated successfully');
      }
    });
  }
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