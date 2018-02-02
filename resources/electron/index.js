const { app, BrowserWindow, globalShortcut, Tray, Menu, shell } = require('electron');
const path = require('path');
const url = require('url');

let win, trayApp;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'web/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  buildTrayIcon();
  buildAppMenu();

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    win.webContents.toggleDevTools();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function buildTrayIcon() {
  let trayIconPath = path.join(__dirname, 'web/assets/tray-icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      role: 'quit'
    }
  ]);

  trayApp = new Tray(trayIconPath);
  trayApp.setToolTip('ngEurope Sample');
  trayApp.setContextMenu(contextMenu);
}

function buildAppMenu() {
  const template = [
    {
      role: 'window',
      submenu: [
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift(
      {
        label: 'Application',
        submenu: [
          {
            label: 'About Application',
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            role: 'quit',
            accelerator: 'Cmd+Q'
          }
        ]
      }
    );
  }

  template.push({
    label: 'Help',
    submenu: [
      {
        label: 'Browse Web Site...',
        click: () => {
          shell.openExternal('http://www.thinktecture.com');
        }
      }
    ]
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
