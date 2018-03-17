import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import initDatabase from './Database';

const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const APP_NAME = 'Simple Inventory Manager';
const DATABASE_FILENAME = 'inventory.db';

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  app.setName(APP_NAME);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../../index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // The BrowserWindow is hidden until the React component App is mounted.
  // The App component's componentDidMount handler uses ipcRenderer to
  // let the main thread know that it can show the BrowserWindow.
  ipcMain.once('show' , () => {
    mainWindow && mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  try {
    await initDatabase(path.join(app.getPath('userData'), DATABASE_FILENAME));
  } catch(err) {
    return dialog.showMessageBox({
      type: 'error',
      message: `An error occurred when initializing the database:\n${err}`
    }, () => {
      app.quit();
    });
  }

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
