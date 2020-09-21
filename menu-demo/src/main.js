const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400,
  });

  mainWindow.on("closed", () => {
    console.log("closed");
    mainWindow = null;
  });

  const name = electron.app.getName();
  const template = [
    {
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          click: () => {
            console.log("HIT");
          },
          role: "about", //mac only
        },
        {
          type: "separator",
        },
        {
          label: "Quit",
          click: () => {
            app.quit(); //close app command
          },
          accelerator: "Cmd+Q", //does a terminal command
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
