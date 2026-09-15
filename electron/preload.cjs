const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("istiqrar", {
  load: () => ipcRenderer.invoke("state:load"),
  save: (data) => ipcRenderer.invoke("state:save", data),
  dataDir: () => ipcRenderer.invoke("state:dir"),
});
