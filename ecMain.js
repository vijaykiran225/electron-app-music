let { app, BrowserWindow } = require("electron");
let path = require("path");
let mainW;

app.on("ready", () => {
    mainW = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainW.loadURL(`file://${path.join(__dirname, "./index.html")}`);
});
