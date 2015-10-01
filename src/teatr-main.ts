import app = require("app");
import BrowserWindow = require('browser-window');

var crashReporter: GitHubElectron.CrashReporter = require("crash-reporter");

crashReporter.start();

var mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

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
