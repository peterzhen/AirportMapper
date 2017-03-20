const electron = require('electron');
const { app, BrowserWindow } = electron;

const createWindow = () => {
  const window = new BrowserWindow({
    height: 600,
    width: 1000
  });
  window.loadURL(`file://${__dirname}/index.html`);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => app.quit());
