"use strict";
const electron = require("electron");
const path = require("path");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1e3,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js")
    }
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});
