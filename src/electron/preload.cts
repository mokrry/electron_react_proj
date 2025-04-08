import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("electron", {
    // Возвращает Promise<{roomKey, roomName}>
    createRoom: (roomName: string) => {
        if (!roomName.trim()) throw new Error('Room name cannot be empty');
        return ipcRenderer.invoke('create-room', roomName);
    },

    // Возвращает Promise<{success, roomName, playersCount}>
    joinRoom: (roomKey: string) => {
        return ipcRenderer.invoke('join-room', roomKey);
    },

    // Возвращает Promise<Array<{roomKey, roomName, playersCount}>>
    getActiveRooms: () => {
        return ipcRenderer.invoke('get-active-rooms');
    },

    // Возвращает Promise<{success, nickname}>
    updateNickname: (nickname: string) => {
        return ipcRenderer.invoke('update-nickname', nickname);
    },

    // Возвращает Promise<string>
    getNickname: () => {
        return ipcRenderer.invoke('get-nickname');
    },

    quitApp: () => ipcRenderer.send('quit-app')
});
