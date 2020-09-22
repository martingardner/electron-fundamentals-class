const electron = require("electron");
const countdown = require("./countdown");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/countdown.html`);

  mainWindow.on("closed", () => {
    console.log("closed");
    mainWindow = null;
  });
});

ipc.on("countdown-start", () => {
  countdown((count) => {
    mainWindow.webContents.send("countdown", count);
  });
});
