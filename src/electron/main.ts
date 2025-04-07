import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import dgram from 'dgram';

// Конфигурация UDP
const UDP_CONFIG = {
    PORT: 41234,
    ADDRESS: '255.255.255.255',
    INTERVAL: 5000
};

const server = dgram.createSocket('udp4');
let mainWindow: BrowserWindow | null = null;
let broadcastInterval: NodeJS.Timeout | null = null;

// IPC-обработчики
// Завершение приложения
ipcMain.on('quit-app', () => {
    server.on('error', (error: Error) => {
        console.error('Socket error:', error);
    });

    try {
        server.close(() => {
            app.quit();
        });
    } catch (err) {
        console.error('Error closing server:', err);
        app.quit();
    }
});


// Создание комнаты с именем
ipcMain.on('create-room', (_, roomName) => {
    startBroadcasting(roomName);
});

// UDP Функции
// Рассылка JSON-сообщений о комнатах в сеть каждые 5 секунд
function startBroadcasting(roomName: string) {
    const message = JSON.stringify({
        type: 'machi-koro-room',
        name: roomName,
        timestamp: Date.now()
    });

    if (broadcastInterval) clearInterval(broadcastInterval);

    broadcastInterval = setInterval(() => {
        server.send(message, UDP_CONFIG.PORT, UDP_CONFIG.ADDRESS, (err) =>  {
            if (err) console.error('Broadcast error:', err);
        });
    }, UDP_CONFIG.INTERVAL);
}

// Обнаружение комнат (принимает UDP-сообщения от др. игроков; при получении сообщения типа 'machi-koro-room' отправляет
//                                       данные во фронтенд.Дополняет сообщение IP-адресом отправителя (rinfo.address).)
function startDiscovery() {
    server.on('message', (msg, rinfo) => {
        try {
            const data = JSON.parse(msg.toString());
            if (data.type === 'machi-koro-room' && mainWindow) {
                mainWindow.webContents.send('room-discovered', {
                    ...data,
                    // IP отправителя
                    address: rinfo.address
                });
            }
        } catch (e) {
            console.error('Parse error:', e);
        }
    });

    server.bind(UDP_CONFIG.PORT, () => {
        server.setBroadcast(true);
        console.log(`Discovery listening on ${UDP_CONFIG.PORT}`);
    });
}

// Инициализация
app.on("ready", () => {
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

    startDiscovery();
});

ipcMain.on('update-nickname', (_event, nickname: string) => {
    console.log('A request to change the nickname was received:', nickname);
    // Здесь можно сохранить новый ник, например, в файл настроек или базу данных
});

// Обработчик запроса ника
ipcMain.handle('get-nickname', () => {
    // Здесь можно реализовать логику получения ника из базы данных, файла или другого хранилища.
    // В данном примере возвращается тестовый ник.
    console.log('The request for a nickname has been received');
    return "TestNickname";
});

