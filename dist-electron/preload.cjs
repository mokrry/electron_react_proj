"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electron", {
    subscribePlayers: (callback) => callback({}),
    getUsers: () => console.log('users'),
    quitApp: () => electron_1.ipcRenderer.send('quit-app'),
    createRoom: (roomName) => {
        if (!roomName.trim())
            throw new Error('Room name cannot be empty');
        electron_1.ipcRenderer.send('create-room', roomName);
    },
    onRoomDiscovered: (callback) => {
        const listener = (_event, room) => callback(room);
        electron_1.ipcRenderer.on('room-discovered', listener);
        return () => electron_1.ipcRenderer.removeListener('room-discovered', listener);
    },
    updateNickname: (nickname) => {
        if (!nickname.trim())
            throw new Error('Nickname cannot be empty');
        electron_1.ipcRenderer.send('update-nickname', nickname);
    },
    getNickname: () => electron_1.ipcRenderer.invoke('get-nickname')
});
