import React, { useState } from 'react';

interface GamePageProps {
    onNavigate: (page: string) => void;
}

const GamePage: React.FC<GamePageProps> = ({ onNavigate }) => {
    const [gameCode, setGameCode] = useState('');

    const handleJoinGame = async () => {
        // Здесь происходит вызов серверной функции.
        // Например, можно использовать fetch для POST запроса на сервер:
        try {
            const response = await fetch('/api/join-game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameCode }),
            });
            if (response.ok) {
                // Можно добавить логику обработки успешного ответа сервера.
                console.log('Успешно присоединились к игре');
            } else {
                // Обработка ошибок сервера.
                console.error('Ошибка при присоединении к игре');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    return (
        <div>
            <h1>Игра</h1>
            <div>
                <input
                    type="text"
                    placeholder="Код игры"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                />
                <button onClick={handleJoinGame}>Присоединиться к игре</button>
            </div>
            {/* Кнопка для возврата в главное меню */}
            <button onClick={() => onNavigate('menu')}>Главное меню</button>
        </div>
    );
};

export default GamePage;
