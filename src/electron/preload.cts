import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("electron", {
    subscribePlayers: (callback: (users: unknown) => void) => callback({}),
    getUsers: () => console.log('users'),

    quitApp: () => ipcRenderer.send('quit-app'),

    createRoom: (roomName: string) => {
        if (!roomName.trim()) throw new Error('Room name cannot be empty');
        ipcRenderer.send('create-room', roomName);
    },

    onRoomDiscovered: (callback: (room: {name: string, address: string}) => void) => {
        const listener = (_event: unknown, room: {name: string, address: string}) => callback(room);
        ipcRenderer.on('room-discovered', listener);

        return () => ipcRenderer.removeListener('room-discovered', listener);
    }
});
