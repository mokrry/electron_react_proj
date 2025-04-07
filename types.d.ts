// types.d.ts

// Определение типа для данных игрока
export type playerData = {
    id: number;
    nik: string;
};

// Интерфейс для API, предоставляемого preload-скриптом
export interface ElectronAPI {
    subscribePlayers: (callback: (users: playerData[]) => void) => void;
    getUsers: () => void;
    quitApp: () => void;
    createRoom: (roomName: string) => void;
    onRoomDiscovered: (callback: (room: { name: string; address: string }) => void) => () => void;
    updateNickname: (nickname: string) => void;
    getNickname: () => Promise<string>;
}

// Расширение глобального интерфейса Window для добавления свойства electron
declare global {
    interface Window {
        electron: ElectronAPI;
    }
}

export {};
