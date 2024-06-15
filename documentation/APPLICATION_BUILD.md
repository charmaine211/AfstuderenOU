# Electron

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
