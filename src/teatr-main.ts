import app = require("app");
import BrowserWindow = require('browser-window');

var crashReporter: GitHubElectron.CrashReporter = require("crash-reporter");

crashReporter.start();

var mainWindow: GitHubElectron.BrowserWindow = null;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 1300, height: 700 });
  mainWindow.loadUrl('file://' + __dirname + '/web/index.html');
  
  mainWindow.maximize();
  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
