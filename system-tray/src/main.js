const electron = require("electron");

const { app, Tray, Menu } = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 400,
    window: 400,
  });

  mainWindow.on("closed", () => {
    console.log("closed");
    mainWindow = null;
  });

  const tray = new Tray(path.join("src", "lazy-tig.jpg"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Context",
      click: () => {
        console.log("context");
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("this is context");
});
