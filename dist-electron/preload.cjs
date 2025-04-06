"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electron", {
    subscribePlayers: (callback) => callback({}),
    getUsers: () => console.log('users'),
    quitApp: () => electron_1.ipcRenderer.send('quit-app')
});
