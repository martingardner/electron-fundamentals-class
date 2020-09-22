const electron = require("electron");

const { app, Tray, Menu, clipboard } = electron;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");

const STACK_SIZE = 5;

let mainWindow;

function addToStack(item, stack) {
  return [item].concat(
    stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack
  );
}

function checkClipboardForChange(clipboard, onChange) {
  let latest;
  let cache = clipboard.readText();

  setInterval(() => {
    latest = clipboard.readText();
    if (latest !== cache) {
      cache = latest;
      onChange(cache);
    }
  }, 1000);
}

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400,
  });

  mainWindow.on("closed", () => {
    console.log("closed");
    mainWindow = null;
  });

  const tray = new Tray(path.join("src", "lazy-tig.jpg"));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "<Empty>",
        enabled: false,
      },
    ])
  );

  let stack = [];
  checkClipboardForChange(clipboard, (text) => {
    stack = addToStack(text, stack);
  });
});
