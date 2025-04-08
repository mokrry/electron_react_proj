import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import fs from 'fs';
import { randomUUID } from 'crypto';

const USER_DATA_PATH = path.join(app.getPath('userData'), 'user_preferences.json');
const PLAYER_IDS_PATH = path.join(app.getPath('userData'), 'player_ids.json');

// Хранилище комнат
const activeRooms = new Map<string, {
    hostId: string;
    roomName: string;
    players: string[];
}>();

// Хранилище ID игроков
let playerIds: Record<string, string> = {};

// Загрузка сохранённых ID игроков
function loadPlayerIds() {
    try {
        if (fs.existsSync(PLAYER_IDS_PATH)) {
            playerIds = JSON.parse(fs.readFileSync(PLAYER_IDS_PATH, 'utf-8'));
        }
    } catch (error) {
        console.error('Error loading player IDs:', error);
    }
}

// Сохранение ID игроков
function savePlayerIds() {
    try {
        fs.writeFileSync(PLAYER_IDS_PATH, JSON.stringify(playerIds), 'utf-8');
    } catch (error) {
        console.error('Error saving player IDs:', error);
    }
}

// Генерация ID игрока
function generatePlayerId(): string {
    return `plr_${randomUUID().replace(/-/g, '').substring(0, 12)}`;
}

// Получение ID игрока (создаёт новый, если нужно)
function getPlayerId(senderId: string): string {
    if (!playerIds[senderId]) {
        playerIds[senderId] = generatePlayerId();
        savePlayerIds();
    }
    return playerIds[senderId];
}

// Генерация ключа комнаты в формате ABC-123
function generateRoomKey(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let key = '';
    for (let i = 0; i < 6; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
        if (i === 2) key += '-';
    }
    return key;
}

// Работа с комнатами
ipcMain.handle('create-room', (event, roomName: string) => {
    const roomKey = generateRoomKey();
    const playerId = getPlayerId(event.sender.id.toString());

    activeRooms.set(roomKey, {
        hostId: playerId,
        roomName,
        players: [playerId]
    });

    // Автоудаление комнаты через 4 часа
    setTimeout(() => activeRooms.delete(roomKey), 4 * 60 * 60 * 1000);
    return { roomKey, roomName };
});

ipcMain.handle('join-room', (event, roomKey: string) => {
    const room = activeRooms.get(roomKey);
    if (!room) return { success: false, error: 'Комната не найдена' };

    const playerId = getPlayerId(event.sender.id.toString());

    if (!room.players.includes(playerId)) {
        room.players.push(playerId);
    }

    return {
        success: true,
        roomName: room.roomName,
        playersCount: room.players.length
    };
});

ipcMain.handle('get-active-rooms', () => {
    return Array.from(activeRooms.entries()).map(([roomKey, room]) => ({
        roomKey,
        roomName: room.roomName,
        playersCount: room.players.length
    }));
});

// Завершение приложения
ipcMain.on('quit-app', () => {
    activeRooms.clear();
    app.quit();
});


let mainWindow: BrowserWindow | null = null;

app.on("ready", () => {
    loadPlayerIds();

    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
            contextIsolation: true,
            sandbox: true
        }
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
});


// Работа с никами

interface UserPreferences {
    nickname: string;
}

const userPreferences: UserPreferences = loadPreferences();

function loadPreferences(): UserPreferences {
    try {
        if (fs.existsSync(USER_DATA_PATH)) {
            return JSON.parse(fs.readFileSync(USER_DATA_PATH, 'utf-8'));
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
    return { nickname: 'Player' + Math.floor(Math.random() * 1000) };
}

function savePreferences() {
    try {
        fs.writeFileSync(USER_DATA_PATH, JSON.stringify(userPreferences), 'utf-8');
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
}

const MAX_NICKNAME_LENGTH = 20;

//  Обновление ника с проверкой длины
ipcMain.handle('update-nickname', (_event, nickname: string) => {
    if (nickname.trim().length > 0 && nickname.trim().length <= MAX_NICKNAME_LENGTH) {
        userPreferences.nickname = nickname.trim();
        savePreferences();
        return { success: true, nickname: nickname };
    }
    return {
        success: false,
        error: `Nickname length must be from 1 to ${MAX_NICKNAME_LENGTH} characters`
    }
});

ipcMain.handle('get-nickname', () => {
    return userPreferences.nickname;
});
