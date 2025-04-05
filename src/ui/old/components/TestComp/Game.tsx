import React, { useState } from 'react';

// Компонента GameTable
const GameTable: React.FC = () => {
    return (
        <div>
            <h2>Игровой стол</h2>
            <p>Здесь будет игровое поле</p>
        </div>
    );
};

// Компонента Shop (модальное окно)
const Shop: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000,
            border: '1px solid black',
        }}>
            <h2>Магазин</h2>
            <p>Здесь можно купить карты</p>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

// Компонента PlayerCards
const PlayerCards: React.FC = () => {
    return (
        <div>
            <h2>Карты игрока</h2>
            <p>Здесь будут карты игрока</p>
        </div>
    );
};

// Компонента Dice (модальное окно)
const Dice: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000,
            border: '1px solid black',
        }}>
            <h2>Бросок кубика</h2>
            <p>Здесь будет результат броска</p>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

// Компонента кнопки "Завершить ход"
const EndTurnButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            Завершить ход
        </button>
    );
};

// Основная компонента Game
const Game: React.FC = () => {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isDiceOpen, setIsDiceOpen] = useState(false);

    const handleOpenShop = () => setIsShopOpen(true);
    const handleCloseShop = () => setIsShopOpen(false);

    const handleOpenDice = () => setIsDiceOpen(true);
    const handleCloseDice = () => setIsDiceOpen(false);

    const handleEndTurn = () => {
        alert('Ход завершен');
    };

    // Проверяем, открыто ли какое-либо модальное окно
    const isModalOpen = isShopOpen || isDiceOpen;

    return (
        <div>
            <h1>Игра</h1>
            {/* Оверлей, если открыто модальное окно */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }} />
            )}
            <GameTable />
            <PlayerCards />
            <button onClick={handleOpenShop} disabled={isModalOpen}>Открыть магазин</button>
            <button onClick={handleOpenDice} disabled={isModalOpen}>Бросить кубик</button>
            <EndTurnButton onClick={handleEndTurn} />
            <Shop isOpen={isShopOpen} onClose={handleCloseShop} />
            <Dice isOpen={isDiceOpen} onClose={handleCloseDice} />
        </div>
    );
};

export default Game;