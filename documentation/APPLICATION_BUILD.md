# Build App

These instructions are for building the app on a macOS environment. Different operating systems may require different steps. Unfortunately, I am unable to test other environments.

## Flask

To build our Flask backend for Electron purposes we need to create an executable file in our virtual environment:

1. **Install PyInstaller**

Install PyInstaller using pip (or pip3, depending on your system) if it is not already installed:

```bash
pip install pyinstaller
```

2. **Create Required Directories**
   Set up the necessary directories:

- `server/ultralytics`: Install the Ultralytics library here to avoid potential issues.
- `client/resources`: Place the executable file here for use with Electron.

3. **Install the Ultralytics library in `server/ultralytics`**

4. **Create the `server/app.spec` file**

Add the following content to `server/app.spec`:

`````python
# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['app.py'],
    binaries=[],
    datas=[
        ('common', 'common'),
        ('collectDataset', 'collectDataset'),
        ('models', 'models'),
        ('predict', 'predict'),
        ('tests', 'tests'),
        ('train', 'train'),
        ('venv', 'venv'),
        ('ultralytics', 'ultralytics'),
        ('globals.py', '.'),
    ],
    hiddenimports=[
        'flask',
        'flask_cors',
        'omegaconf',
        'ultralytics',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name=app,
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
```

5. **Create the executable inside the virtual environment**

```bash
pyinstaller app.spec
```

6. **Move the Executable**

After the build completes, move the file from `server/dist` to `client/resources/`.

7. **Update `client/main.js`**

Modify `client/main.js` to ensure Electron uses the executable:

```javascript
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { execFile } = require("child_process");
const url = require("url");
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
      preload: app.isPackaged
        ? path.join(__dirname, "./build/preload.js")
        : path.join(__dirname, "./preload.js"),
    },
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";

  console.log(`Loading app: ${appURL}`);

  setTimeout(() => {
    win.loadURL(appURL).catch((err) => {
      console.error("Failed to load app:", err);
    });
  }, 2000);

  // Open the DevTools if needed
  win.webContents.openDevTools();
}

function startFlaskApp() {
  const flaskPath = app.isPackaged
    ? path.join(__dirname, "./build/resources", python_app)
    : path.join(__dirname, "resources", python_app);
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

  app.on("activate", () => {
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
app.on("window-all-closed", () => {
  if (flaskProcess) {
    killPython();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  if (flaskProcess) {
    killPython();
  }
});
```

8. **Test the Application**

Run the frontend to test the application. The backend executable will start automatically via Electron, so there is no need to run it separately.

## Electron

The application will be build to publish on Github. This is the easiest way to distribute the application:

source: https://medium.com/@yagoubi.aek.2/build-you-app-using-electron-js-python-electron-builder-dcdd9c2d9ba0

Packaging the app
go to package.json inside the build tag add this :
"files": ["main.exe" , "index.js" , "preload.js" , "index.html"],

Electron-python
Know we need just to run this command :
npm run build
and you will find your setup installer in the ‘dist’ folder

source: https://medium.com/red-buffer/electron-builder-packaging-electron-nodejs-application-along-with-flask-app-for-windows-fc26f5a29870

In the previous article, we discussed how to integrate an electron app frontend with a Flask backend but it did not cover how to package the Electron app. So this piece elucidates how an Electron app can be packaged for Windows using Electron Builder. There are a few other libraries that are used to package the Electron app as well, like electron-packager, but electron builder is a more preferred choice here for building the Electron app because it has a wide range of options, which is very useful for a complex application.
If you are here, there’s a high chance you already have your project ready to be packaged. If this isn’t the case, you need to first create the Electron app. The basic guide to creating a simple quickstart Electron application is given in the Electronjs docs. You can also go to my previous article which covers the pre-requisites for this article.
We know that the project structure for a basic Electron app is as:
my-electron-app/
├── package.json
├── main.js
├── renderer.js
└── index.html
For building an installable electron app with electron builder, your main concern is with package.json.
Installing Electron Builder
To install electron builder, the docs recommend using yarn instead of npm. The package can be installed using the following command:
yarn add electron-builder — dev
Adding Build Configurations in package.json
The electron builder docs cover all aspects and features, so I’ll be more specific to our use case.
You need to specify the standard fields for the app like name, description, product name, version, author in package.json. This gets covered when the project is initiated with package.json.
App ID, Directories, and Specifications for Windows
This is the most important step and needs to be implemented properly. In package.json, you need to specify the app ID, the output and build resource directories and, most importantly, the OS you are going for. In our case, it’s Windows, and let’s say we want the NSIS file as our build file. We will add the following in the file:
"build": {
"appId": "electron-test-app",
 "directories": {
"buildResources": "resources",
"output": "release"
},
"win": {
"publisherName": "xyz.net",
"target": [
{
"target": "nsis",
"arch": [
"x64"
]
}
]
},
You can change these specifications according to your requirements by going through the docs. You can go for an MSI file as well or go for both.
Specifying Files and Resources
The build needs to be told which files or source codes will be required by the app to run smoothly. All the required resources need to be specified within the build as:
"build": {
 ...
"files": [
"./resources/icon.*",
"./src/",
"./css/",
"./contents/",
"./node_modules/**/*",
"./package.json"
],
For Static Files That Need to be Directly Used from the App Directory
Some of the resource files are required to be copied as app resources for usage. It could be an excel sheet for instance. Electron builder has great options for this. You can use:
extraResources: copies the files (keeping their exact name) to the app’s resource directory
extraFiles: copies the files directly into the app’s content directory
The files can be specified in the build as shown below:
"build": {
 ...
"extraFiles": [
{
"from": "./cache/",
"to": "cache/",
"filter": [
"**/*"
]
},
extraResources is also very similar to extraFiles. It’s just a matter of what the requirement is for the app.
Notes Worth Mentioning Regarding Directories
While using electron builder, I encountered some issues that I feel needed to be mentioned. There might be better solutions but I’ll specify what I did or preferred particularly.
Empty directories will not get copied to the required locations. You could add a keep.txt file in the directory to copy the folders without any issues.
You might want to avoid creating folders programmatically from the app since that causes errors and problems. The best thing in my experience was to just copy such folders to the required place using extraFiles or extraResources.
Running the Application After Installation
It’s the developers choice whether to run the application right after installation or not. In my experience, the application has a lot of components and libraries installed and will have some issues when it will run the first time, but no issues when it runs again. So I went on to avoid running the application right after installation. For setting this option, you need to add the following line in the build-in package.json:
"build": {
 ...
"nsis": {
"runAfterFinish": false
},
Packaging the App Alongwith the Flask App
The flask app use case is in relation to my previous article about Integrating Python Flask Backend with Electron (Nodejs) Frontend. This part will cover packaging another executable app with your main application. We have a simple flask executable for this. You can just skip the next step if you are not working with another executable app within your main app.
Specifying Flask App Resource
We need to set the resource directory for our flask app right where the app would access it from its route directory. This is just the same step we discussed before. We need to use extraFiles or extraResources for our task here. It can be done as below:
"extraFiles": [
{
"from": "./backend/dist/app",
"to": "backend/dist/app/",
"filter": [
"**/*"
]
},
Flask app created by Pyinstaller is in the dist folder and backend is just the directory of the backend python code.
The important thing is to maintain the project structure for the application by specifying the resources in their exact locations w.r.t. the app’s route directory. Make sure the path to the new directory, copied with extraFiles or extraResources, is being correctly accessed in the app code, to avoid issues.
Creating the Build
You can either directly run the command from your terminal or set a specific key for your command in the script. The command to build the app for Windows 64-bit is:
electron-builder build --win --x64
You can add the following in scripts to just set the key for this command and run it when you want to package the app:
"scripts": {
"package": "electron-builder build --win --x64"
},
Run yarn package in your terminal and the app will get built. For just the unpacked version, run yarn package --dir.
There are many options to go for with electron builder for different use cases. The package documentation can be consulted for that. Electron builder also has Auto Update options that can be explored as well so that the user keeps getting the updated version.

source: https://blog.devgenius.io/how-to-build-and-publish-an-electron-app-with-react-tutorial-971e1d9d27ce?gi=6c8bed11dc4b

Problems:

build/index.html

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/brain-solid.png" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="manifest.json" />
    <title>Driver Gaze Detection</title>
    <script defer="defer" src="./static/js/main.4c729be7.js"></script>
    <link href="./static/css/main.919af4af.css" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```
`````
