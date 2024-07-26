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

`server/ultralytics`: Install the Ultralytics library here to avoid potential issues.
`client/resources`: Place the executable file here for use with Electron.

3. **Create the `server/app.spec` file**

Add the following content to `server/app.spec`:

```python
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
    name='app',
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
)```

4. **Create the executable**

```bash
pyinstaller app.spec
```

5. **Move the Executable**

After the build completes, move the file from `server/dist` to `client/resources/`.

6. **Update `client/main.js`**

Modify `client/main.js` to ensure Electron uses the executable:

```javascript
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

  win.loadURL(appURL);

  // Open the DevTools if needed
  // win.webContents.openDevTools();
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

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (flaskProcess) {
    flaskProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

exec('taskkill /f /t /im app', (err, stdout, stderr) => {
  if (err) {
   console.log(err)
  return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
 });

app.on('will-quit', () => {
  if (flaskProcess) {
    flaskProcess.kill();
  }
});
```

7. **Test the Application**

Run the frontend to test the application. The backend executable will start automatically via Electron, so there is no need to run it separately.

## Electron

The application will be build to publish on Github. This is the easiest way to distribute the application:





source: https://medium.com/red-buffer/integrating-python-flask-backend-with-electron-nodejs-frontend-8ac621d13f72

Creating a Basic Electron App
For creating a basic Electron quick-start app, you can go to electron JS doc for guidance.
For now, let’s focus on the main.js code given in the docs that creates the app browser window. Here’s the piece of code from the link above that we are going to refer to for our article:
const { app, BrowserWindow } = require(‘electron’)
function createWindow () {
 const win = new BrowserWindow({
 width: 800,
 height: 600,
 webPreferences: {
 nodeIntegration: true
 }
 })
win.loadFile(‘index.html’)
}
app.whenReady().then(createWindow)
app.on(‘window-all-closed’, () => {
 if (process.platform !== ‘darwin’) {
 app.quit()
 }
})
app.on(‘activate’, () => {
 if (BrowserWindow.getAllWindows().length === 0) {
 createWindow()
 }
})
The code creates an application window for our Electron app. This is where we are to integrate our Flask application with Electron.
Creating a Basic Flask App
Here is a simple Flask app code we are going to use for the backend application.
from flask import Flask
app = Flask(__name__)


@app.route('/test')
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run()
The default port would be 127.0.0.1:80, but you can change the port by modifying the last line as:
app.run(host=’127.0.0.1', port=5000)
Now for our problem, we are going to use the Child process. For those who already know about the Child process, skip the definition below.
Child Process
A Child process is the creation of a Parent process, which can be defined as the main process that creates a Child or subprocesses to perform certain operations. Each process can have many Child processes but only one Parent. A child process inherits most of its Parent’s attributes.
There are multiple ways to create a Child process but for our case, we are going to stick with the following two methods:
spawn
execFile
spawn: Running Flask App As a Source Code (app.py)
In case the developer wants to test the electron/Flask app without creating the Flask executable, they can use the spawn method. This can be done by writing the following code inside the create window function:
var python = require('child_process').spawn('py', ['./backend/app.py']);
  python.stdout.on('data', function (data) {
    console.log("data: ", data.toString('utf8'));
  });
  python.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`); // when error
  });
This is only for temporary use until the backend app is finalized. When the backend code is ready in accordance with the requirements, you need to make an executable file for the Flask app which the Electron application starts in its main process every time the Electron app is started.
execFile: Running Flask App Executable in Electron (app.exe)
To create the Flask app executable, you need pyinstaller. This can simply be installed by pip install pyinstaller. After installing pyinstaller, you need to go to the command line and type pyinstaller -F app.py.
Note the -F is used here to build the app in only one file. You can choose not to do this. The executable app will be in the ‘dist’ folder in the backend code root directory.
let backend;
backend = path.join(process.cwd(), 'resources/backend/dist/app.exe')
var execfile = require(‘child_process’).execFile;
execfile(
 backend,
 {
  windowsHide: true,
 },
 (err, stdout, stderr) => {
  if (err) {
  console.log(err);
  }
  if (stdout) {
  console.log(stdout);
  }
  if (stderr) {
  console.log(stderr);
  }
 }
)
Killing app.exe When Electron App Quits
You have successfully integrated the Flask app with Electron, you start the application, run your task and close the application, but oh wait… the Flask app is still running in the background. It never closed. This problem occurred when I had thought everything was now working well. There is not much specific information available for this purpose. I tried npm’s tree-kill for killing the Child process, but it didn’t work for me. The best solution I found was to create another Child process that is given the command to kill the running app. Following is the piece of code you need to put inside the app.on(‘window-all-closed’) function before the app.quit() line:
const { exec } = require(‘child_process’);
exec(‘taskkill /f /t /im app.exe’, (err, stdout, stderr) => {
 if (err) {
  console.log(err)
 return;
 }
 console.log(`stdout: ${stdout}`);
 console.log(`stderr: ${stderr}`);
});
The code above worked well for me since it killed all the background processes when I quit my app.
Communicating Between Backend and Frontend
The best way to communicate between frontend and backend is to send requests to the Flask server endpoint from your UI with the click of a button or a user input. For this, you can use one of the more frequently used http methods. I usually prefer Axios for this. You need to use the following code in your Renderer.js while sending requests to the Flask server.
test = 'Hello'
async function makePostRequest(test) {
 axios.post(‘http://127.0.0.1:5000/test', test)
 .then(function (response) {
  console.log(“It says: “, response.data);
 })
 .catch(function (error) {
  console.log(error);
 });
}
You will find the response from the Flask server in your app log. You can perform further operations inside the .then() code.
When the frontend is ready, you can build the installable electron application efficiently by using an electron-builder. Go to the docs in the given link, make the necessary changes in your package.json file and run the build command in your terminal to build your application.
Avoid Route Directory Mistake
Note that since the Flask app executable is going to be opened in the Electron app environment, the paths inside the flask app code need to be referenced in accordance with the Electron app root directory. The mistake of mentioning file paths relative to the Flask environment, which will be alien to the Electron environment, can be made. So if your Flask app loads a file, you need to specify the path according to Electron and not according to your Flask environment.


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

