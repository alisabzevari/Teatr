(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "app", 'browser-window'], function (require, exports) {
    var app = require("app");
    var BrowserWindow = require('browser-window');
    var crashReporter = require("crash-reporter");
    crashReporter.start();
    var mainWindow = null;
    app.on("window-all-closed", function () {
        if (process.platform != "darwin") {
            app.quit();
        }
    });
    app.on("ready", function () {
        mainWindow = new BrowserWindow({ width: 800, height: 600 });
        mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
        // Open the DevTools.
        mainWindow.openDevTools();
        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    });
});
