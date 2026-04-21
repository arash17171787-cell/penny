const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pennyAPI', {
  // File operations
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  saveFile: (options) => ipcRenderer.invoke('save-file', options),

  // Menu event listeners
  onMenuUpload: (callback) => ipcRenderer.on('menu-upload', callback),
  onMenuExport: (callback) => ipcRenderer.on('menu-export', callback),

  // Platform info
  platform: process.platform
});
