import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("electron", {
    subscribePlayers: (callback: (users: any) => void) => callback({}),
    getUsers: () => console.log('users'),
    quitApp: () => ipcRenderer.send('quit-app')
});
